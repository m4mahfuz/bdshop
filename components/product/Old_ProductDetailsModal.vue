<template>
  <div v-if="modal" class="fixed w-full h-full min-h-screen z-30 top-0 left-0">
      <div @click.prevent="modalClose" class="absolute bg-black opacity-60 h-full w-full top-0 left-0"></div>
      <div class="bs-modal-body bg-white rounded-2xl p-8 mx-auto z-30 my-10 relative">
        <svg @click.prevent="modalClose" xmlns="http://www.w3.org/2000/svg" class="h-4 w-5 absolute right-6 top-5 cursor-pointer hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>

        <div class="flex justify-center flex-wrap md:flex-nowrap my-2">
          <div class="w-80 px-8">
            <ProductZoomer 
              :images="images" 
              :pane="pane" 
              v-if="images.length > 0" 
              :slides="3"
            />
          </div>
          <div class="drift-pane relative px-8 text-left">
            <p class="text-sm mb-3"><span class="uppercase text-gray-400 pr-6">Status</span> <span class="bs-dark-green-color">In Stock</span></p>
            <h3 class="text-2xl">{{product.name}}</h3>
            <p class="text-xs text-gray-400 mb-4 mt-2"><b>{{product.quantity}}</b> items available.</p>
            <p class="text-2xl font-bold">
              <span v-if="Product.isDiscountAvailable">
                <HelperTkSymbol /> {{ Product.salePrice }}
                <del class="font-normal text-gray-400 text-sm pl-2">
                  <HelperTkSymbol /> {{ Product.price }}
                </del>
              </span>
              <span v-else><HelperTkSymbol /> {{ Product.price }}</span>
            </p>
            <div class="flex flex-col items-center justify-center border-t border-gray-200 my-4">
              <!-- <input v-model="cartProductQuantity" type="number" min="1" class="w-14 border border-gray-200 mr-5 text-center"> -->
              <!-- <button class="bs-button">Add to cart</button> -->
              <div class="flex justify-center items-center text-4xl text-gray-600 my-4 gap-2 p-0">
                <span class="pl-2 text-lg uppercase">quantity</span>
                <div class="flex gap-6 w-64">
                  <button @click.prevent="emitEventForCartOperaton('decrease')" class="h-14 w-14 border rounded-full" :disabled="cartProductQuantity < 1">-</button>
                  <span class="flex items-center justify-center w-14 h-14 border border-gray-200 bg-gray-200 rounded-full text-xl font-semibold">{{cartProductQuantity}}</span>
                  <button @click.prevent="emitEventForCartOperaton('increase')" class="h-14 w-14 border rounded-full">+</button>
                </div>
              </div>
              <div class="py-2 w-full">
                <button class="bg-green-500 text-white hover:bg-green-600 hover:text-gray-200 rounded-full w-full px-2 py-2 font-medium">View Cart</button>
              </div>
              <div class="py-2 w-full">
                <button class="bg-orange-500 text-gray-800 hover:bg-orange-600 hover:text-gray-900 rounded-full w-full px-2 py-2 font-medium">Checkout</button>
              </div>
            </div>

            <div class="flex border-b border-gray-200 justify-between text-sm pb-3 mb-8">
              <p class="flex items-center"><img src="~/assets/img/heart.png" class="w-4 mr-3" alt=""> Add to favourites</p>
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
              
                <span v-for="category in product.categories" :key="category.id"><nuxt-link class="bs-dark-green-color" :to="`/category/${ category.name}`">{{category.name}}</nuxt-link><span class="comma">, </span></span>
              </p>

              <p><span class="uppercase text-gray-400 w-28 inline-block">tags:</span>

                <span v-for="tag in product.tags" :key="tag.id"><nuxt-link class="bs-dark-green-color" :to="`/tag/${tag.name}`">{{tag.name}}</nuxt-link><span class="comma">, </span></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Product from '~/assets/mylib/utilities/Product';
export default {
    props: {
        productSlug: String,
        Product: Object,
        modal: {
          type: Boolean,
          default: false
        },
        quantity: {
          type: Number,
          default: 0
        }
    },
    data() {
        return {            
            cartProductQuantity: 0,
        }
    },
    async mounted() {
    console.log('product details modal mounted');
    console.log(this.productSlug);
    this.cartProductQuantity = this.quantity;
    await this.getProduct(this.productSlug);
    // console.log('p', this.product)
    // console.log('img', this.images.length)
  },  
  computed: {
    ...mapState('products', [
        'product',
        'images'
    ]),        
    pane() {
      return document.querySelector('.drift-pane');
    }
  },
  methods: {
    ...mapActions('products', [
      'getProduct',
      'clearImages'	      
    ]),
    modalClose() {
      this.$emit('close', false);
      this.clearImages();
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
      
      this.$emit('cart', {
        product: this.Product,
        // quantity: this.cartProductQuantity,
        action: action
      });
    }
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
</style>