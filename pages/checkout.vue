<template>
  <div class="lg:container py-5 lg:pr-3">
      <div class="lg:flex gap-5">
        <div class="basis-2/3">
			<!-- cart -->
            <h3 class="text-2xl font-semibold mb-4 border-b border-green-100 pb-2">
                <span class="border-b-4 border-green-400 pb-1 pr-1">Cart Items</span> 
            </h3>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" class="px-2 py-2">#</th>
                    <th scope="col" class="px-2 py-2">Image</th>
                    <th scope="col" class="pl-2 pr-20 py-2 text-left">Name</th>
                    <th scope="col" class="px-4 py-2">Price</th>
                    <!-- <th scope="col" class="px-4 py-2">Discounted Price</th> -->
                    <th scope="col" class="px-2 py-2">Qty</th>
                    <th scope="col" class="px-2 py-2">Total</th>
                    <th scope="col" class="px-2 py-2">                      
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(product, index) in cart" :key="product.id"
                    class="odd:bg-white even:bg-gray-50 hover:bg-green-50"
                  >
                  <!-- <tr> -->
                    <td class="text-center border-b">{{index+1}}</td>
                    <td class="border-b p-2">
                      <img :src="url(product.image)" :alt="product.name">
                    </td>
                    <td class="border-b p-2">
                      <span class="font-medium">{{ product.name }}</span>
                      <p>{{product.unit_quantity}} {{ product.unit }}</p>
                    </td>

                    <td v-if="product.price !==null" class="border-b p-2">
                        <div class="text-orange-500 px-2">
                          <HelperTkSymbol /> {{product.price}}
                        </div>
                        <del class="text-gray-300 px-2">
                          <HelperTkSymbol /> {{product.original_price}}
                        </del>
                      </td>
                    <td v-else class="border-b p-2">
                      <HelperTkSymbol /> {{product.original_price}}
                    </td>                    
                    <td class="border-b px-3">
                      {{product.quantity}}
                    </td>                    
                    <td class="border-b p-2 font-medium"><HelperTkSymbol /> {{totalPriceOf(product)}}</td>
                    <td class="border-b p-2">
                      <button @click.prevent="removeFromCart(product)" class=" transition delay-300 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>                
                </tbody>
              </table>
            </div>
          <!-- shpping address -->
          <h3 class="text-xl font-semibold mt-8 mb-4 border-b border-purple-100 pb-2">
              <span class="border-b-4 border-purple-400 pb-1 pr-1">Shipping Address</span> 
          </h3>
          <div class="px-4 py-4 mx-auto bg-slate-100 rounded">
            <div 
                v-for="address in addresses" 
                :key="address.id" 
                class="form-check mb-2"            
            >
              <input 
                class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="radio" 
                :id="idOf(address, 'address')"
                :value="address"
                v-model="shippingAddress"
              >
              <label class="form-check-label flex items-center text-gray-800 w-64" :for="idOf(address, 'address')">
                {{address.title}}           
                <button @click.prevent="toggleActive(address.id)" type="button" class="ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5" v-if="!show(address.id)">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5" v-if="show(address.id)">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>

                </button>            
              </label>
              <div 
                class="border border-slate-200 rounded p-2 mx-6 my-2 text-xs w-64"
                v-if="show(address.id)"
              >
                <p class="font-semibold"> {{address.name}} </p>
                <p class="my-1"> {{address.address_line}} </p>
                <p class="my-1"> {{address.city}} {{address.postal_code}} </p>
                <p>Mobile: {{address.phone}} </p>
              </div>
            </div>				
          </div>
      
          <!-- shipping method -->
          <h3 class="text-xl font-semibold mt-8 mb-4 border-b border-teal-100 pb-2">
              <span class="border-b-4 border-teal-400 pb-1 pr-1">Shipping Method</span> 
          </h3>
          <div class="px-4 py-4 mx-auto bg-slate-100 rounded">
            <div 
                v-for="shippingType in shippingTypes" 
                :key="idOf(shippingType, 'shipping')" 
                class="form-check mb-2"            
            >
              <input 
                class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="radio" 
                :id="idOf(shippingType, 'shipping')"
                :value="shippingType"
                v-model="shippingTypePicked"
              >
              <label class="form-check-label flex items-center text-gray-800 w-64" :for="idOf(shippingType, 'shipping')">
                {{shippingType.name}}                       
              </label>          
              <span class="ml-6 text-xs text-gray-500"> {{shippingAddress.city}} city within {{shippingType.delivery_time_min}} to {{shippingType.delivery_time_max}} {{shippingType.delivery_time_unit}} 
                <span v-if="shippingChargeBy(shippingType) === 0" class="ml-1">FREE of charges.</span>
                <span v-else class="ml-1">
                  <HelperTkSymbol /> {{shippingChargeBy(shippingType)}}
                </span>
              </span>
            </div>				
          </div>          
          <!-- payment method -->
          <h3 class="text-xl font-semibold mt-8 mb-4 border-b border-red-100 pb-2">
              <span class="border-b-4 border-red-400 pb-1 pr-1">Payment Method</span> 
          </h3>
          <div class="px-4 py-4 mx-auto bg-slate-100 rounded">
            <div class="form-check mb-2">
              <input 
                class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="radio"                 
                id="payment-cod"
                value="1"
                v-model="paymentMethod"
              >
              <label class="form-check-label flex items-center text-gray-800 w-64" for="payment-cod">COD 
                <span class="text-gray-600 text-xs ml-1">[Cash on delivery]</span>
              </label>                        
            </div>
            <div class="form-check mb-2">
              <input 
                class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                type="radio"                 
                id="payment-prepaid"
                value="2"
                v-model="paymentMethod"
              >
              <label class="form-check-label flex items-center text-gray-800 w-64" for="payment-prepaid">Prepaid
              </label>
              <div class="ml-1 md:ml-6 mt-2 flex items-center justify-start gap-1">
                <img class="w-6 h-5 md:w-10 md:h-6 object-fit" src="~/assets/img/payment/gateways/visa.png" alt="">
                <img class="w-6 h-5 md:w-10 md:h-6 object-fit" src="~/assets/img/payment/gateways/master.png" alt="">
                <img class="w-6 h-5 md:w-10 md:h-6 object-fit" src="~/assets/img/payment/gateways/americans.png" alt="">
                <img class="w-6 h-5 md:w-10 md:h-6 object-fit" src="~/assets/img/payment/gateways/bkash.png" alt="">
                <img class="w-6 h-5 md:w-10 md:h-6 object-fit" src="~/assets/img/payment/gateways/nogod.png" alt="">
                <img class="w-6 h-5 md:w-10 md:h-6 object-fit" src="~/assets/img/payment/gateways/rocket.png" alt="">
              </div>                        
            </div>            				
          </div>
        </div>
        <div class="mt-6 lg:mt-0 basis-1/3">
          <h3 class="text-2xl font-semibold mb-4 border-b border-orange-100 pb-2">
            <span class="border-b-4 border-orange-400 pb-1">Order Summary</span> 
          </h3>
          <div class="bg-slate-100 rounded-lg px-4 pt-4 pb-6">
            <div class="flex justify-between py-2">
              <span class="text-xs">Subtotal</span>
              <span class="text-xs"><HelperTkSymbol text="text-sm" /> {{subTotal}}</span>
            </div>
            <div class="flex justify-between py-3">
              <span class="text-xs"><small class="font-semibold">{{shippingTypePicked.name}}</small> Shipping                
              </span>
              <span v-if="shippingCharge===0" class="text-xs text-blue-600 uppercase">free</span>
              <span v-else class="text-xs"><HelperTkSymbol text="text-sm" /> {{shippingCharge}} </span>
            </div>
            
            <div v-if="!validDiscount" class="md:flex justify-between gap-4 my-2">
              <input 
                v-model="coupon.code" 
                type="text" 
                class="text-xs outline-none border rounded h-10 w-full md:w-60 px-2"
                :class="[has('code') ? 'border-pink-600 text-pink-600' : 'border-gray-200']"
                placeholder="Enter code here" 
              >              
              <button @click.prevent="applyCoupon" class="mt-2 md:mt-0 w-full md:w-auto md:px-6 py-1 bg-sky-200 text-gray-900 rounded px-6 uppercase" :disabled="coupon.code ===''">Apply</button>
            </div>
            <p 
              class="mb-2 text-pink-600 text-sm" 
              v-if="has('code')"
              v-text="get('code')"
            ></p>
            <div class="flex justify-between py-3">
              <span class="text-xs">Discount</span>
              <span class="text-xs">- <HelperTkSymbol text="text-sm" /> {{discount}}</span>
            </div>
            <div v-if="validDiscount" class="my-2">
              <span class="text-sm text-purple-700">*Coupon Applied</span> 
              <button @click.prevent="removeCoupon" type="button" class="border border-red-600 hover:bg-red-400 text-red-500 hover:text-white text-xs ml-2 px-1 rounded" :disabled="!validDiscount">Remove</button>
            </div>

            <div class="flex justify-between mt-3 pt-1 pb-2 font-semibold text-xl border-t border-gray-300">
              <span>Total</span>
              <span><HelperTkSymbol /> {{total}}</span>
            </div>
            <div class="py-4 w-full">
              <button @click.prevent="placeOrder" class="bg-orange-500 text-white hover:bg-orange-600 hover:text-gray-900 rounded-full w-full px-2 py-2 uppercase disabled:bg-orange-300 disabled:cursor-not-allowed"
              :disabled="isEmptyCart"
              >Place Order</button>
              <NuxtLink to="/cart" class="bg-green-500 text-gray-900 hover:bg-green-600 hover:text-white rounded-full block w-full my-3 px-2 py-2 text-center uppercase">
                Back to Cart
              </NuxtLink>
            </div>
            <p 
              class="mb-2 text-pink-600 text-sm" 
              v-if="has('message')"
              v-text="'**'+get('message')  + ' Try again.'"
            ></p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  middleware: 'auth',
  data() {
    return {
      coupon: {
        code: '',
        amount: null
      },      
      discount: 0,
      shippingAddress: {},
      shippingTypePicked: {},
      paymentMethod: 1,
      addressToShow: ''
    }
  },
  async mounted() {
    await this.getActiveAddresses();
    this.shippingAddress = this.shippingAddressBy(this.$auth.$state.user.default_shipping_address);    
  },
  watch: {
    'coupon.code'(value) {
      if (value === '') {
        this.resetErrors();
      }
    },
    'shippingAddress.city'(value) {
      this.getShippingTypesBy(value);    
    },
    'shippingTypes'(value) {
      if (this.shippingTypes.length > 0) {
      //  this.shippingTypePicked = this.shippingTypes.find(shipping => shipping.type === 1 )    
        this.initialShippingType();
      }
    }
  },
  computed: {
    ...mapState('cart', [
        'cart'
    ]),         
    ...mapGetters('cart', ['isEmptyCart']),
    ...mapState('user', [
      'addresses'
    ]),
    ...mapState('orders', [
      'order'
    ]),
    ...mapState('shipping', [
      'shippingTypes'
    ]),
    ...mapState('errors', [
      'errors',
    ]),
    ...mapGetters('errors', [
      'has',
      'get',
      'any'
    ]),  
    ...mapGetters('orders', ['isEmptyOrder']),
    validDiscount() {
       return (this.discount > 0 && this.coupon.code !=='') ?? false ;
    },
    subTotal() {
      let subToal = 0;
      this.cart.forEach(product => {
        let price = (product.price !== null) ? product.price : product.original_price;
        subToal = subToal + (product.quantity * price);
      });
      
      return subToal;
    },
    shippingCharge() {      
      if (Object.keys(this.shippingTypePicked).length !== 0) {
        return parseInt(this.shippingTypePicked.shipping_charge?.charge ?? 0); 
      }
      return 0;
    },    
    total() {
      return ((this.subTotal + this.shippingCharge) - this.discount)
    }
  },  
  methods: {
    ...mapActions('cart', [
        'addToCart',
        // 'addProductToCart',
        'removeFromCart',
    ]),
    ...mapActions('user', [
      'getActiveAddresses'
    ]),
    ...mapActions('orders', [
      'saveOrder'
    ]),
    ...mapActions('shipping', [
      'getShippingTypesBy'
    ]),
    ...mapActions('errors', [
      'setErrors',      
      'resetErrors'
    ]),
    initialShippingType() {
      this.shippingTypePicked = this.shippingTypes.find(shipping => shipping.type === 1 );    
    },
    shippingTimeUnitBy(type) {
      if (type === 1) {
        return 'days'
      }
      return 'hours'
    },
    shippingChargeBy(shippingType) {
      return shippingType.shipping_charge?.charge ?? 0;
    },
    async placeOrder() {
      let data = {
        'address_id': this.shippingAddress.id,
        'coupon_code': this.validDiscount ? this.coupon.code : null,
        'payment_method': this.paymentMethod,
        'shipping_type': this.shippingTypePicked.type,
        'total_price': this.total
      }

       let response = await this.saveOrder(data);     
      // this.$axios.$post('/orders', data)
      // .then(response => {
        console.log('res', response)
        if (!this.isEmptyOrder) {
          // this.$router.push(`/orders/${this.order.id}`);
          if (this.order.payment_method === 'COD') {
            this.$router.push(`/orders/${this.order.id}/success`);
            return;
          } 
          this.$router.push(`/orders/${this.order.id}/payments`);
        }
      //   // this.discount = response.data.discount_amount;
      // })
      // .catch(error => {
      //   console.log('err', error.response.data)
      //   // this.errors = Object.values(error.response.data.errors).flat();
      //   // this.setErrors(error.response.data.errors);
      // })
    },
    getShippingAddress() {
      return this.addresses.find(address => address.id === this.shippingAddress);
    },
    shippingAddressBy(id) {
     return this.addresses.find(address => address.id === id);
    },
    show(address) {
      return (this.addressToShow === address) ? true : false;
    },
    toggleActive(activeSelection) {
      // console.log('as', activeSelection);
        if (this.addressToShow === activeSelection) 
        {
          this.addressToShow = '';
          return;
        }
        this.addressToShow = activeSelection;
        return;
    },
    idOf(address, prefix) {
      return `${prefix}-${address.id}`;
    },
    applyCoupon() {
      this.coupon.amount = this.subTotal;
      this.$axios.$post('/products/coupon', this.coupon)
      .then(response => {
        // console.log('res', response)
        this.discount = response.data.discount_amount;
      })
      .catch(error => {
        // console.log('err', error.response.data)
        // this.errors = Object.values(error.response.data.errors).flat();
        this.setErrors(error.response.data.errors);
      })
    },
    totalPriceOf(product) {
      let price = product.price ?? product.original_price;
            
      return (price * product.quantity);
    },    
    isEnough(quantity) {
      return (quantity > 1) ? true : false;
    },
    cartOperaton(action, product) {      
      this.addToCart(
        {
          product: product,
          action: action,
          quantity: 1 //this.quantity
        }
      )
    },
    removeCoupon() {
       this.discount = 0;
       this.coupon.code = '';
    },
    url(image) {        
        let path = `/storage/images/products/small/${image}`;
        if (typeof image === 'object' && image !== null) {
            let path = `/storage/images/products/small/${image.name}`;
        }  
        return `${this.$config.baseURL}${path}`;
    },      
  }

}
</script>

<style>

</style>