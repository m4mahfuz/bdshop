<template>
  <div class="container max-w-lg mx-auto rounded-lg px-6 py-10">
    <div class="flex justify-between">
        <div class="text-xl text-gray-800 font-bold">
            Invoice # {{order.id}}
            <p><img id="barcode"/></p>
        </div>
        <div class="grow flex flex-col items-end">
            <img class="w-12" src="~/assets/img/logo.png" alt="">
            <p class="text-gray-800 font-semibold pt-1">Bengal Shop</p>
            <p class="text-gray-600 font-light">Dhanmondi, Dhaka</p>
            <p class="text-gray-400 pt-2 font-light">{{order.today}}</p>            
        </div>
    </div>
    <div class="my-4 flex justify-between items-end">
        <div>
            <p class="uppercase font-semibold mb-2">Bill & Ship to</p>
            <address v-if="order.shipping_address" class="text-sm text-gray-400">
                {{order.shipping_address.name}}<br>
                {{order.shipping_address.address_line}}<br>
                {{order.shipping_address.city}}<br>
                {{order.shipping_address.phone}}<br>
            </address>   
        </div>
        <div class="text-sm font-medium uppercase">Payment Method: {{order.payment_method}}</div>
    </div>
    
    <div class="my-4 overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-blue-50">
                <tr class="border-b-2">
                    <th scope="col" class="py-2 pl-4">
                      #
                    </th>                    
                    <th scope="col" class="py-2 px-6">
                        Product
                    </th>
                    <th scope="col" class="py-2 px-4">
                      Qty
                    </th>
                    <th scope="col" class="py-2 px-6">
                        Total
                    </th>                                        
                </tr>
            </thead>
            <tbody>
                <tr 
                  v-for="(product, index) in products"
                  :key="product.id"  
                  class="bg-white border-b"
                >                    
                    <td class="py-2 pl-4">
                      {{ index+1 }}
                    </td>                    
                    <td class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap">
                        <div>{{product.pivot.name}}</div>
                        <p class="text-xs font-light text-gray-500">{{product.unit_quantity}} {{product.unit}}</p>
                        <p v-if="product.pivot.discounted_price !==null">
                          <span class="text-orange-500 text-xs">
                            Price: <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.discounted_price)}}
                          </span>
                          <del class="text-gray-300 text-xs">
                            <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.price)}}
                          </del>
                        </p>
                        <p v-else class="text-xs font-extralight">
                            <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.price)}}
                        </p>
                        <!-- <p class="text-xs font-light text-gray-600">Qty: {{product.pivot.quantity}}</p> -->
                    </td>
                    <td class="py-2 px-6">
                        {{product.pivot.quantity}}                        
                    </td>
                    <td class="py-2 px-6">
                        <p v-if="product.pivot.discounted_price !==null">
                          <HelperTkSymbol /> {{totalPriceOf(product.pivot.discounted_price, product.pivot.quantity)}}
                        </p>
                        <p v-else> 
                          <HelperTkSymbol /> {{totalPriceOf(product.pivot.price, product.pivot.quantity)}}
                        </p>
                    </td>
                </tr> 
                <tr class="font-medium uppercase border-t-2">
                    <td colspan="3"><span class="px-6 float-right ">Subtotal</span></td>
                    <td class="px-6"><HelperTkSymbol/> {{order.total}}</td>
                </tr>               
                <tr class="uppercase">
                    <td colspan="3"><span class="px-6 float-right ">Shipping Charge</span></td>
                    <td class="px-6"><HelperTkSymbol/> {{order.shipping_charge}}</td>
                </tr>               
                <tr class="uppercase">
                    <td colspan="3"><span class="px-6 float-right ">Coupon discount (-)</span></td>
                    <td v-if="order.coupon" class="px-6"><HelperTkSymbol/> {{order.coupon.discounted_amount}}</td>
                </tr>               
                <tr class="font-semibold uppercase">
                    <td colspan="3"><span class="pb-4 px-6 float-right ">Net Total</span></td>
                    <td class="pb-4 px-6"><HelperTkSymbol/> {{order.net_total}}</td>
                </tr>               
            </tbody>
        </table>        
    </div>
    <div class="my-4 flex justify-between items-start gap-4 border-t">
        <p class="grow text-xs text-gray-500 py-2">*This invoice is generated electronically.</p>
        <img :src="orderQrCode" alt="">
    </div>
  </div>
</template>

<script>
    import { mapState, mapActions, mapGetters} from "vuex";
    import JsBarcode from "jsbarcode";
    import QRCode from 'qrcode';

    export default {
        layout: 'blank',
        data() {
            return {
                order: {},
                orderQrCode: '',
                loader: false,
            }
        },
        async mounted() {
            this.loader = true
            this.order = JSON.parse(localStorage.getItem('orderToView'));
            this.setBarCode(this.order.id);
            this.setQrCode();
            await this.getOrderProducts(this.$route.params.order)                        
            this.loader = false
        },
        
        computed: {    
            ...mapState('orders', ['products']),           
        },
        methods: {
            ...mapActions('orders', ['getOrderProducts']),
            setBarCode(code) {
                JsBarcode("#barcode", `${code}`, {
                    format: "code39",
                    height: 50
                });
            },
            setQrCode() {
                const URL = window.location.href;
                QRCode.toDataURL(`${URL}`)
                .then(url => {
                    this.orderQrCode = url;
                })
                .catch(err => {
                    console.error(err)
                })
            },
            totalPriceOf(price, quantity) {
                return (price * quantity);
            },                
        }
    }
</script>