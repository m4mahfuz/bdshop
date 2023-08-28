<template>
  <div v-if="modal" class="fixed w-full h-full min-h-screen z-30 top-0 left-0">
      <div @click.prevent="modalClose" class="absolute bg-black opacity-60 h-full w-full top-0 left-0"></div>
      <!-- <overlay-scrollbars :key="scroll" class="h-full">  -->
      <!-- <div class="lg:bs-modal-body bg-slate-100 rounded-2xl p-8 mx-4 lg:mx-10 my-10 z-30 relative h-4/5 overflow-y-auto"> -->
        <div class="flex justify-center items-center h-full w-full">        
          <div class="bg-slate-100 rounded-2xl p-8 mx-4 lg:mx-10 my-10 z-30 relative h-4/5 lg:min-h-max overflow-y-scroll">
            <svg @click.prevent="modalClose" xmlns="http://www.w3.org/2000/svg" class="h-4 w-5 absolute right-6 top-5 cursor-pointer hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <!-- <overlay-scrollbars 
              :key="scroll" 
              class="h-full"
              :options = "{                
                scrollbars: {                  
                  visibility: 'hidden',                  
                },  
              }"
            >  -->
            <div class="lg:flex justify-center my-4 lg:mx-4">
              <div class="w-full lg:w-1/2 md:px-8">
                <ProductZoomer 
                  :images="images" 
                  :pane="pane" 
                  v-if="images.length > 0" 
                  :slides="3"
                />
              </div>
              <div class="drift-pane relative md:px-8 text-left w-full lg:w-1/2">
                <p class="text-sm mb-3"><span class="uppercase text-gray-400 pr-6">Status</span> <span class="bs-dark-green-color">In Stock</span></p>
                <h3 class="text-lg md:text-2xl">{{product.name}}</h3>
                <p class="text-xs text-gray-400 mb-4 mt-2"><b>{{product.quantity}}</b> items available.</p>
                <p class="text-2xl font-bold">
                  <span v-if="product.price">
                    <HelperTkSymbol /> {{ product.price }}
                    <del class="font-normal text-gray-400 text-sm pl-2">
                      <HelperTkSymbol /> {{ product.original_price }}
                    </del>
                  </span>
                  <span v-else><HelperTkSymbol /> {{ product.original_price }}</span>
                </p>
                <div class="flex flex-col items-start justify-center border-t border-gray-200 my-4">              
                  <div class="md:flex items-center text-4xl text-gray-600 my-4 gap-2 p-0 w-full xl:w-3/4">
                    <span class="text-lg xl:text-xl uppercase">quantity</span>
                    <div class="mt-2 md:mt-0 flex gap-2 2xl:gap-6 md:w-64">
                      <button @click.prevent="emitEventForCartOperaton('decrease')" class="h-10 w-10 md:h-12 md:w-12 xl:h-14 xl:w-14 border border-gray-200 rounded-full" :disabled="cartProductQuantity < 1">-</button>
                      <span class="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 xl:w-14 xl:h-14 border border-gray-200 bg-gray-200 rounded-full text-xl font-semibold">{{cartProductQuantity}}</span>
                      <button @click.prevent="emitEventForCartOperaton('increase')" class="h-10 w-10 md:h-12 md:w-12 xl:h-14 xl:w-14 border border-gray-200 rounded-full">+</button>
                    </div>
                  </div>
                  <div class="py-2 w-full xl:w-3/4 2xl:w-2/4">
                    <button 
                    @click.prevent="goto('cart')"
                    type="button" class="bg-green-500 text-white hover:bg-green-600 hover:text-gray-200 rounded-full w-full px-2 py-2 font-medium">View Cart</button>
                  </div>
                  <div class="py-2 w-full xl:w-3/4 2xl:w-2/4">
                    <button 
                    @click.prevent="goto('checkout')"
                    type="button" class="bg-orange-500 text-gray-800 hover:bg-orange-600 hover:text-gray-900 rounded-full w-full px-2 py-2 font-medium">Checkout</button>
                  </div>
                </div>

                <div class="flex border-b border-gray-200 justify-between text-sm pb-3 mb-8">              
                  <p class="relative">
                    <ProductWishlist :product="product" :text="true" class="absolute top-0 left-0" />
                  </p>
                  
                  <p class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </p>
                </div>

                <div class="text-xs leading-loose">
                  <p><span class="uppercase text-gray-400 w-28 inline-block">Sku:</span> {{ product.sku }}</p>
                  
                  <p><span class="uppercase text-gray-400 w-28 inline-block">category:</span>              
                  <button class="bs-dark-green-color" @click.prevent="goTo(`/category/${product.category.slug}`)">{{product.category.name}}</button>
                  </p>

                  <p><span class="uppercase text-gray-400 w-28 inline-block">tags:</span>

                    <span v-for="tag in tags" :key="tag.id"><button class="bs-dark-green-color uppercase" @click="goTo(`/tags/${tag.slug}`, tag)">{{tag.name}}</button><span class="comma">, </span></span>
                  </p>
                </div>
              </div>
            </div>
            <!-- </overlay-scrollbars> -->
          </div>
        </div>
      <!-- </overlay-scrollbars> -->
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Product from '~/assets/mylib/utilities/Product';
export default {    
    data() {
        return {            
            cartProductQuantity: 0,    
            scroll: ''        
        }
    },
    async mounted() {    
    this.productSlug = this.quantity;
    this.cartProductQuantity = this.quantity;
    await this.getProductImages(this.product.slug);
    await this.getProductTags(this.product.slug);
    this.$nextTick(() => { this.scroll++; }); 
  },  
  computed: {
    ...mapState('products', [
        'images',
        'tags'
    ]),        
    ...mapState('product-details-modal', [
        'modal',
        'product',
        'quantity'
    ]),        
    pane() {
      return document.querySelector('.drift-pane');
    }
  },
  methods: {
    ...mapActions('cart', [
        'addToCart',
        // 'addProductToCart',
        'removeFromCart',
    ]),
    ...mapActions('products', [
      'getProductImages',
      'getProductTags',
      'clearImages'	      
    ]),
    ...mapActions('product-details-modal', ['hideModal']),
    goto(page) {
      this.modalClose();
      if (page === 'cart') {
          this.$router.push('/cart')
          return;
      }
      this.$router.push('/checkout')
    },
    goTo(url, tag='') {
      localStorage.setItem('tagName', tag.name);
      this.modalClose();
      this.$router.push(url);
    },
    modalClose() {
      // this.$emit('close', false);
      this.clearImages();
      this.hideModal();
    },
    emitEventForCartOperaton(actionType) {
      console.log('modal cart action', actionType)
      let action;
      if (actionType === 'increase') {
        this.cartProductQuantity++;
        action = actionType;
        if (this.quantity === 0) {
          action = 'add'
        }
      } else {
        if (this.cartProductQuantity > 0) {
          this.cartProductQuantity--;
          action = actionType;
        }
      }
      
      // this.$emit('cart', {
      //   product: this.Product,
      //   // quantity: this.cartProductQuantity,
      //   action: action
      // });
      this.cartOperation(action, this.product);
    },
    cartOperation(action, product) {
      if (this.cartProductQuantity === 1 && action === 'decrease') {
        this.removeFromCart(product);
        this.cartProductQuantity = 0;
        // this.matched = false;
        return;
      }
      this.addToCart(
        {
          product: product,
          action: action,
          quantity: 1 //this.quantity
        }
      )
    },

  }
}
</script>

<style scoped>
  input[type=number]::-webkit-inner-spin-button {
    opacity: 1;
  }
  /* .drift-pane {
  /* position: relative; */
  /* width: 65%; */
  /* margin-left: 5%; */
  /* float: left; */
  /*} */
  /*Scroll bar nav*/

  /* Works on Firefox */
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

::-webkit-scrollbar {
  width: auto; 
}

</style>