<template>
  <div class="lg:container py-5 lg:pr-3">
      <div class="lg:flex gap-5">
          <div class="basis-2/3">
            <h3 class="text-2xl font-bold mb-8 border-b border-green-100 pb-2">
                <span class="border-b-4 border-green-400 pb-1 pr-1">Cart</span> 
            </h3>
            <div class="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" class="px-2 py-2">#</th>
                    <th scope="col" class="px-2 py-2">Image</th>
                    <th scope="col" class="pl-2 pr-20 py-2 text-left">Name</th>
                    <th scope="col" class="px-4 py-2">Price</th>                    
                    <th scope="col" class="px-2 py-2 text-center">Qty</th>
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
                    <td class="w-16 border-b p-2">
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
          </div>
          <div class="mt-6 lg:mt-0 basis-1/3">
            <h3 class="text-2xl font-bold mb-8 border-b border-orange-100 pb-2">
              <span class="border-b-4 border-orange-400 pb-1">Order Summary</span> 
            </h3>
            <div class="bg-slate-100 rounded-lg px-4 pt-4 pb-6">
              <div class="flex justify-between py-2">
                <span class="font-semibold">Items</span>
                <span class="font-semibold text-lg">{{getCartItemsQty}}</span>
              </div>              
              <div class="flex justify-between mt-3 pt-1 pb-2 font-semibold text-xl">
                <span>Total Price</span>
                <span><HelperTkSymbol /> {{total}}</span>
              </div>
              <div class="py-4 w-full">
                <button @click.prevent="goTo('checkout')" class="bg-orange-500 text-white hover:bg-orange-600 hover:text-gray-900 rounded-full block w-full px-2 py-2 text-center uppercase disabled:bg-orange-300 disabled:cursor-not-allowed" :disabled="isEmptyCart">
                  Checkout
                </button>
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
  computed: {
    ...mapState('cart', [
        'cart'
    ]),             
    ...mapGetters('cart', [
      'getCartItemsQty', 'isEmptyCart'
    ]),    
    subTotal() {
      let subToal = 0;
      this.cart.forEach(product => {
        let price = (product.price !== null) ? product.price : product.original_price;
        subToal = subToal + (product.quantity * price);
      });
      
      return subToal;
    },    
    total() {
      // return ((this.subTotal + this.shippingCharge); 
      return this.subTotal;
    }
  },  
  methods: {
    ...mapActions('cart', [
        'addToCart',
        'removeFromCart',
    ]),
    goTo(page) {
      this.$router.push(`/${page}`);
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
    url(image) {        
        let path = `/storage/images/products/small/${image}`;
        if (typeof image === 'object' && image !== null) {
          path = `/storage/images/products/small/${image.name}`;
        } 
        return `${this.$config.baseURL}${path}`;
    },      
  }

}
</script>