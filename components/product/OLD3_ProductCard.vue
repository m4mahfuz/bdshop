<template>
  <div class="group text-center">
    <template v-if="showModal"> 
      <ProductDetailsModal 
        :modal="showModal" 
        :productSlug="product.slug" 
        :Product="Product"
        :quantity="quantity"
        @cart="handleCartOperationEvent" 
        @close="handleModal"
      /> 
    </template> 
    <!-- <div class="bg-red-200 relative mb-2 h-32"> -->
    <div class="relative mb-2 h-32">
      <div class="bg-gray-50 p-1 w-40 h-32 mx-auto absolute 
      bottom-0 top-0 left-0 right-0 flex justify-center">
      <!-- <div class="bg-gray-50 p-1 h-36 w-36 m-auto"> -->
        <!-- <img :src="url(product.featured_image)" class="w-auto h-[180px]" alt="Product's Image"> -->
        <img :src="url(product.featured_image)"  class="h-full" alt="Product's Image">
      </div>
      <!-- <div class="hidden absolute h-full w-full top-0 left-0 group-hover:flex justify-center items-center"> -->
      <div class="hidden absolute w-40 h-full m-auto bottom-0 left-0 right-0 group-hover:flex justify-center items-center">
        <div class="bg-black absolute h-full w-full opacity-60"></div>

        <button @click.prevent="showProductDetailsModal" class="absolute left-0 bottom-0 bg-gray-200 p-2 w-full flex items-center justify-center">Details <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg></button>
        <!-- <ProductDetailsModal :modal="showModal" :productSlug="product.slug" @close="handleModal"/>  -->
        <!-- <button @click.prevent="productDetails" class="absolute left-0 bottom-0 bg-gray-200 p-2 w-full flex items-center justify-center">Details <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg></button> -->

        <!-- <div v-if="!matched" class="relative z-10">
          <button class="text-white text-2xl" @click.prevent="addToCart(product, 'plus')" >Add to cart</button>
        </div>

        <div v-if="matched" class="relative z-10">
          <div class="flex justify-center items-center text-4xl text-white mb-8">
            <button @click.prevent="addToCart(product, 'minus')" class="h-12 w-12 border border-white rounded-full">-</button>
            <span class="mx-6">{{ quantity }}</span>
            <button @click.prevent="addToCart(product, 'plus')" class="h-12 w-12 border border-white rounded-full">+</button>
          </div>
        </div> -->

        <div v-if="!matched" class="relative z-10">
          <!-- <button class="text-white text-2xl" @click.prevent="cartOperaton('add', product)" >Add to cart</button> -->
          <button class="text-white text-2xl" @click.prevent="cartOperaton('add', Product)" >Add to cart</button>
        </div>

        <div v-else class="relative z-10">
          <div class="flex justify-center items-center gap-5 text-4xl text-white mb-8">
            <button @click.prevent="cartOperaton('decrease', Product)" class="h-14 w-14 border border-white rounded-full">-</button>
            <span class="flex justify-center items-center h-14 w-14 rounded-full bg-slate-50 text-green-700 text-3xl font-medium">{{ quantity }}</span>
            <button @click.prevent="cartOperaton('increase', Product)" class="h-14 w-14 border border-white rounded-full">+</button>
          </div>
        </div>        
      </div>
    </div>
    <h4 class="text-xl mb-2">{{product.name}}</h4>
    <p class="text-xs text-gray-500">{{product.unit_quantity}} {{product.unit}}</p>
    <p>
      <span v-if="Product.isDiscountAvailable()" class="font-medium bs-dark-orange-color"><HelperTkSymbol /> {{ Product.salePrice }}       
      <del class="text-gray-400"><HelperTkSymbol /> {{ Product.price }}</del>
      </span>
      <span v-else><HelperTkSymbol /> {{ Product.price }}</span>
    </p>    
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
// import Product from '../../utilities/Product';
import Product from '~/assets/mylib/utilities/Product';

export default {
  name: "ProductCard",
  props: ['product'],
  data() {
    return {
      matched: false,
      quantity: 0,
      showModal: false,
      Product: new Product(this.product)      
    }
  },    
  mounted() {
    console.log('product card mounted');
    // this.Product = new Product(this.product);      
     this.productChecker();
     /*

    this.$store.watch(
      () => {
        return this.$store.getters["cart/getCart"]
      },
      (val) => {
        this.productChecker();
      },
      {
        deep:true
      }
    );
 */
    //console.log(this.$store.getters["cart/getCart"]);
  },

  watch: {
    cart: {
      handler(value) {
        console.log('watch triggered from PC')
        this.productChecker();
      },
      deep: true
    }
  },
  
  computed: {    
    ...mapState('cart', [
        'cart'
    ]),    
  },
  methods: {
    ...mapActions('cart', [
        'addToCart',
        // 'addProductToCart',
        'removeFromCart',
    ]),        
    // productDetails() {
    //   this.$store.dispatch("product-details-modal/triggerModal", this.product);
    // },    
    url(image) {        
    //    let name = image.name;
		if (typeof image === 'object' && image !== null) {
			let path = `/storage/images/products/small/${image.name}`;
			return `${this.$config.baseURL}${path}`;
		}
		return 'https://picsum.photos/200/300';
    },
    showProductDetailsModal() {
      this.showModal = true;
    },
    handleCartOperationEvent(data) {
      // this.quantity = data.quantity;
      console.log("Cart event called")
      this.cartOperaton(data.action, data.product);
    },
    handleModal(value) {
      this.showModal = value;
    },
    // addToCart(product, type) {
    //   this.$store.dispatch("cart/addToCart",
    //     {
    //       product: product,
    //       type: type
    //     }
    //   );
    // },
    cartOperaton(action, product) {
      if (this.quantity === 1 && action === 'decrease') {
        this.removeFromCart(product);
        this.quantity = 0;
        this.matched = false;
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
    productChecker() {    
      this.quantity = 0;
      this.matched = false;
      const cartAtLocalStorage = this.getCartAtLocalStorage();
      const cartAtStore = this.cart;

      let cart = [];
      cart = cartAtStore.length ? cartAtStore : cartAtLocalStorage;

      if(cart.length) {
        cart.forEach(item => {
          if(item.id === this.product.id) {
            this.matched = true;
            this.quantity = item.quantity
          }
        })
      }
    },
    getCartAtLocalStorage() {
      return JSON.parse(localStorage.getItem('cart'));
    },
  },
}
</script>

<style scoped>

</style>
