<template>
    <div class="container">            
      <div class="p-4 my-6 mx-auto max-w-2xl w-full bg-slate-100 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Order Details</h5>
          <div class="py-2 font-normal text-gray-700 dark:text-gray-400 flex flex-col border-b-2 border-gray-300 mb-3">
            <p class="text-sm">Order: <span class="text-cyan-500 font-medium">#{{order.id}} </span>
            <span class="float-right text-red-500 font-semibold">: {{order.status}}</span>
            </p>            
            <p class="pt-1 text-xs text-gray-500">Delivery By  {{order.delivery_earliest}} to {{order.delivery_latest}}</p>
            <p class="pt-.75 text-xs text-gray-500 uppercase">  {{order.payment_method}}</p>
          </div>          
          <Alert :time="4" :show="showAlert" @close="handleClose">            
             {{message}}
          </Alert>
          <Modal :showing="showModal" @close="showModal = false">                        
            <div class="p-6 text-center">
                <svg aria-hidden="true" class="mx-auto mb-2 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure to cancel this order?</h3>
                
                <div class="text-left mt-2 mb-4">
                  <CancelReason 
                      :id="slug" 
                      @selected="handleSelectedEvent"
                  />
                  <p v-show="!isValid" class="py-2 text-gray-400 text-xs font-mono">*Please select a reason.</p>
                </div>

                <button @click="showModal = false" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>

                <button 
                  @click.prevent="cancel()" 
                  type="button" 
                  class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  :disabled="!isValid"
                >
                    Yes, I'm sure
                </button>
                
            </div>
          </Modal>  
          <div v-if="order.status !== 'Cancelled'" class="overflow-x-auto relative shadow-md sm:rounded-lg mb-6">
              <h3 class="bg-sky-600 text-white text-xl px-4 py-1">Ordered Items</h3>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
                      <tr>
                          <th scope="col" class="p-2 text-center">
                              #
                          </th>
                          <th v-if="order.status==='Received'" scope="col" class="py-2 px-2 text-red-500">
                              Cancel
                          </th>
                          <th v-if="order.status==='Delivered'" scope="col" class="py-2 px-2 text-blue-500">
                              Return
                          </th>
                          <th scope="col" class="py-2 px-4">
                              Image
                          </th>
                          <th scope="col" class="py-2 px-4">
                              Name
                          </th>
                          <th scope="col" class="py-2 px-4">
                              Price
                          </th>                                                    
                      </tr>
                  </thead>
                  <tbody>
                      <tr 
                        v-for="(product, index) in validProducts"
                        :key="product.id"
                        class="odd:bg-white even:bg-gray-50 hover:bg-green-50 border-b"                        
                      >
                        <td class="text-center">{{index+1}}</td>
                        <td v-if="order.status==='Received' || order.status==='Delivered'" class="py-2 px-4">                          
                          <CheckBox 
                            :product="product" @checked="handleCheckedEvent" 
                            @unchecked="handleUncheckedEvent" 
                          />                            
                        </td>                        
                        <td class="w-16 border-b p-2">
                          <img :src="url(product.featured_image)" alt="img">
                        </td>
                        <td class="py-2 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div>{{product.pivot.name}}</div>
                            <p class="text-xs font-light text-gray-500">{{product.unit_quantity}} {{product.unit}}</p>
                            <p class="text-xs font-light text-gray-600">Qty: {{product.pivot.quantity}}
                              <span v-if="product.pivot.additional_quantity" class="text-xs font-light text-gray-500">+ {{product.pivot.additional_quantity}}
                              </span>
                            </p>                            
                        </td>  
                        <td v-if="product.pivot.discounted_price !==null" class="py-2 px-4">
                          <div><HelperTkSymbol /> {{totalPriceOf(product.pivot.discounted_price, product.pivot.quantity)}}</div>
                          <div class="text-orange-500 text-xs font-light">
                            <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.discounted_price)}} x {{product.pivot.quantity}}
                          </div>
                          <del class="text-gray-300 text-xs font-light">
                            <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.price)}}
                          </del>
                        </td>  
                        <td v-else class="py-2 px-4">
                          <div><HelperTkSymbol /> {{totalPriceOf(product.pivot.price, product.pivot.quantity)}}</div>
                          <p class="text-xs font-extralight">
                            <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.price)}} x {{product.pivot.quantity}}
                          </p>
                        </td>                                              
                      </tr>
                  </tbody>
                  <tfoot class="bg-white border-t-2 border-gray-300">
                      <tr>                        
                        <td :colspan="columnSpan"></td>
                        <td class="px-4">Subtotal</td>
                        <td class="px-4"><HelperTkSymbol /> {{order.total}}</td>
                      </tr>
                      <tr>
                      <tr>                        
                        <td :colspan="columnSpan"></td>
                        <td class="px-4">Shipping</td>
                        <td class="px-4"><HelperTkSymbol /> {{order.shipping_charge}}</td>
                      </tr>
                      <tr>
                      <tr>                        
                        <td :colspan="columnSpan"></td>
                        <td class="px-4">Coupon Discount (-)</td>
                        <td class="px-4"><HelperTkSymbol /> {{couponDiscount}}</td>
                      </tr>
                      <tr>
                        <td :colspan="columnSpan"></td>
                        <td class="pb-4 px-4 text-lg text-gray-600">Net Total</td>
                        <td class="pb-4 px-4 text-xl text-red-500"><HelperTkSymbol /> {{order.net_total}}</td>
                      </tr>
                      <tr v-if="order.status==='Received'">
                        <td colspan="3" class="bg-green-100 py-3  text-center">
                          <button @click.prevent="cancelItems" type="button" class="px-10 py-2  text-gray-700 bg-orange-300 border border-orange-400 hover:bg-orange-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-orange-200 text-sm rounded-lg uppercase">Cancel selected Items
                          </button>
                        </td>
                        
                        <td colspan="2" class="bg-green-50 text-center">
                          <button @click="showModalAction" type="button" class="px-10 py-2 border text-gray-700 border-red-400 hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-200 text-sm rounded-lg uppercase">Cancel Order</button>
                        </td>
                      </tr>
                      <tr class="my-2"></tr>
                  </tfoot>
              </table>
          </div>

          <div v-if="order.status === 'Cancelled' || cancelledItemsAvailable" class="mt-4 overflow-x-auto relative shadow-md sm:rounded-lg">
              <h3 class="bg-red-400 text-white text-xl px-4 py-1">Cancelled Items</h3>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
                      <tr>
                          <th scope="col" class="p-2 text-center">
                              #
                          </th>
                          <th scope="col" class="py-2 px-4">
                              Image
                          </th>
                          <th scope="col" class="py-2 px-4">
                              Name
                          </th>
                          <th scope="col" class="py-2 px-4">
                              Price
                          </th>           
                      </tr>
                  </thead>
                  <tbody>
                      <tr 
                        v-for="(product, index) in cancelledProducts"
                        :key="product.id"
                        class="odd:bg-white even:bg-gray-50 hover:bg-green-50 border-b"                        
                      >
                        <td class="text-center">{{index+1}}</td>                        
                        <td class="w-16 border-b p-2">
                          <img :src="url(product.featured_image)" alt="img">
                        </td>
                        <td class="py-2 px-4 font-medium text-gray-900 whitespace-nowrap">
                            <div>{{product.pivot.name}}</div>
                            <p class="text-xs font-light text-gray-500">{{product.unit_quantity}} {{product.unit}}</p>
                            <p class="text-xs font-light text-gray-600">Qty: {{product.pivot.quantity}}</p>
                        </td>  
                        <td v-if="product.pivot.discounted_price !==null" class="py-2 px-4">
                          <div><HelperTkSymbol /> {{totalPriceOf(product.pivot.discounted_price, product.pivot.quantity)}}</div>
                          <div class="text-orange-500 text-xs font-light">
                            <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.discounted_price)}} x {{product.pivot.quantity}}
                          </div>
                          <del class="text-gray-300 text-xs font-light">
                            <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.price)}}
                          </del>
                        </td>  
                        <td v-else class="py-2 px-4">
                          <div><HelperTkSymbol /> {{totalPriceOf(product.pivot.price, product.pivot.quantity)}}</div>
                          <p class="text-xs font-extralight">
                            <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.price)}} x {{product.pivot.quantity}}
                          </p>
                        </td>                                              
                      </tr>
                  </tbody>                  
              </table>
          </div>
          
          <div class="flex justify-end">
            <button 
              type="button"
              @click.prevent="$router.go(-1)"
              class="px-6 py-2 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded-md  hover:bg-gray-500 uppercase"
            >back
            </button>
          </div>

      </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Alert from '../../../components/Alert.vue';
import cancelReason from '../../../components/CancelReason.vue';
export default {
  components: { cancelReason, Alert },
  middleware: 'auth',
  data() {
    return {
      slug: this.$route.params.order,
      items: [],
      showAlert: false,
      showModal: false,
      reason: ''       
    }
  },
  async mounted() {
    console.log('order details compo mounted', this.slug)    
    // if (this.isEmptyOrder) {
    await this.getOrderBy(this.slug);
    // }

  },
  watch: {
    success(value) {      
      if (value === true) {
        this.showAlert = true;
      }      
    }
  },
  computed: {
    ...mapState('orders', ['order', 'message', 'success']),
    ...mapGetters('orders', ['isEmptyOrder', 'validProducts', 'cancelledProducts']),
    cancelledItemsAvailable() {
      return (this.cancelledProducts.length > 0) ? true:false;
    },
    couponDiscount() {
      return this.order.coupon?.discounted_amount?? 0;
    },
    columnSpan() {
      return (this.order.status === 'Received' || this.order.status === 'Delivered') ? 3 : 2;
    },
    isValid() {
      return (this.reason !=='') ? true : false;
    }
  },
  methods: {
    ...mapActions('orders', [
      'getOrderBy',
      'cancelOrder',
      'cancelOrderItems'
    ]),
    totalPriceOf(price, quantity) {
      return (price * quantity);
    },
    handleClose() {
       this.showAlert = false; 
    },
    showModalAction() {
      this.reason = '';
      this.showModal = true;
    },
    async cancel() {      
      let respose = await this.cancelOrder({
        order: this.slug,
        reason: this.reason,
      });
      this.showModal = false;
      if (!this.isEmptyOrder) {
          if (this.order.status === 'Cancelled') {
            this.$router.push(`/orders`);
            return;
          }           
      }
    },
    async cancelItems() {
      let respose = await this.cancelOrderItems({
        order: this.slug,
        items: this.items
      });      
      // if (!this.isEmptyOrder) {
      //     if (this.order.status === 'Cancelled') {
      //       this.$router.push(`/orders`);
      //       return;
      //     }           
      //   }
    },
    url(image) {        
        let path = `/storage/images/products/small/${image}`;
        if (typeof image === 'object' && image !== null) {
          path = `/storage/images/products/small/${image.name}`;
        } 
        return `${this.$config.baseURL}${path}`;
    },
    handleSelectedEvent(event) {
      console.log(event);
      this.reason = event.reason;
    },    
    handleCheckedEvent(event) {
      this.items.push(event);
    },    
    handleUncheckedEvent(event) {
      let index = this.items.indexOf(event);
      this.items.splice(index, 1); 
    },        
  }
}
</script>