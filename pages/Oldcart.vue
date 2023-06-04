<template>
  <div class="container py-5 pr-3">
      <div class="flex gap-5">
          <div class="basis-2/3">
            <h3 class="text-2xl font-bold mb-8 border-b border-green-100 pb-2">
                <span class="border-b-4 border-green-400 pb-1 pr-1">Cart</span> 
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
                    <th scope="col" class="px-2 py-2 text-center">Qty</th>
                    <th scope="col" class="px-2 py-2">Total</th>
                    <th scope="col" class="px-2 py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
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
                    <td class="w-16 border-b p-2">
                      <img :src="url(product.image)" alt="">
                    </td>
                    <td class="border-b p-2">{{product.name}}</td>

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
                    <td class="border-b">
                      <div class="flex flex-row items-center justify-center gap-3">
                        <!-- <button @click.prevent="cartOperaton('decrease', product)" class="border border-gray-300 w-6 h-6 rounded-full">-</button> -->
                        <button @click.prevent="cartOperaton('decrease', product)" class="text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <span class="font-semibold">{{product.quantity}}</span>
                        <button 
                          @click.prevent="cartOperaton('increase', product)" 
                          class="text-gray-400" 
                          :class="{'cursor-not-allowed': !isEnough(product.stock_quantity)}"
                          :disabled="!isEnough(product.stock_quantity)"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          </button>
                      </div>
                    </td>
                    <td class="border-b p-2 font-medium"><HelperTkSymbol /> {{totalPriceOf(product)}}</td>
                    <td class="border-b p-2">
                      <button @click.prevent="removeFromCart(product)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#fca5a5" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>                    
                    </td>
                  </tr>                
                </tbody>
              </table>
            </div>
          </div>
          <div class="basis-1/3">
            <h3 class="text-2xl font-bold mb-8 border-b border-orange-100 pb-2">
              <span class="border-b-4 border-orange-400 pb-1">Order Summary</span> 
            </h3>
            <div class="bg-slate-100 rounded-lg px-4 pt-4 pb-6">
              <div class="flex justify-between py-2">
                <span class="text-xs">Subtotal</span>
                <span class="text-xs"><HelperTkSymbol text="text-sm" /> {{subTotal}}</span>
              </div>
              <div class="flex justify-between py-3">
                <span class="text-xs">Shipping</span>
                <span class="text-xs"><HelperTkSymbol text="text-sm" /> {{shippingCharge}}</span>
              </div>
              
              <div v-if="!validDiscount" class="flex justify-between gap-4 my-2">
                <input 
                  v-model="coupon.code" 
                  type="text" 
                  class="text-xs outline-none border rounded h-10 w-60 px-2"
                  :class="[has('coupon') ? 'border-pink-600 text-pink-600' : 'border-gray-200']"
                  placeholder="Enter code here" 
                >              
                <button @click.prevent="applyCoupon" class="bg-sky-200 text-gray-900 rounded px-6 uppercase" :disabled="coupon.code ===''">Apply</button>
              </div>
              <p 
                class="mb-2 text-pink-600 text-sm" 
                v-if="has('coupon')"
                v-text="get('coupon')"
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
                <button class="bg-orange-500 text-white hover:bg-orange-600 hover:text-gray-900 rounded-full w-full px-2 py-2">Checkout</button>
              </div>
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
    }
  },
  mounted() {
    console.log('cart mounted')    
  },
  watch: {
    'coupon.code'(value) {
      if (value === '') {
        this.resetErrors();
      }
    },
  },
  computed: {
    ...mapState('cart', [
        'cart'
    ]),         
    ...mapState('errors', [
      'errors',
    ]),
    ...mapGetters('errors', [
      'has',
      'get',
      'any'
    ]),  
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
      return parseInt(this.$auth.$state.user.shipping_charge);
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
    ...mapActions('errors', [
      'setErrors',      
      'resetErrors'
    ]),
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
        return `${this.$config.baseURL}${path}`;      
    },      
  }

}
</script>

<style>

</style>