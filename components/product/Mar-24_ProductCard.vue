<template>
  <div class="group text-center">
    <!-- <template v-if="showModal"> 
      <ProductDetailsModal 
        :modal="showModal" 
        :productSlug="product.slug" 
        :product="product"
        :quantity="quantity"
        @cart="handleCartOperationEvent" 
        @close="handleModal"
      /> 
    </template>  -->
    <!-- <div class="bg-red-200 relative mb-2 h-32"> -->
    <div class="relative mb-2 h-32">
      <div class="bg-gray-50 p-1 w-40 h-32 mx-auto absolute 
      bottom-0 top-0 left-0 right-0 flex justify-center">
      <ProductWishlist :product="product" class="absolute top-0 right-0" />        
      <!-- wishlist -->
      <!-- <span v-if="$auth.loggedIn" class="z-10">
        <button v-if="product.wishlistCount === 0" @click.prevent="wishlist('add')" type="button" class="absolute text-red-500 right-0 top-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <button v-else @click.prevent="wishlist('remove')" type="button" class="absolute text-red-500 right-0 top-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </button>
      </span> -->
      <!-- / wishlist -->
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
        
        <div v-if="!matched" class="relative z-10">
          <!-- <button class="text-white text-2xl" @click.prevent="cartOperation('add', product)" >Add to cart</button> -->
          <button class="text-white text-2xl" @click.prevent="cartOperation('add', product)" >Add to cart</button>
        </div>

        <div v-else class="relative z-10">
          <div class="flex justify-center items-center gap-5 text-4xl text-white mb-8">
            <button @click.prevent="cartOperation('decrease', product)" class="h-14 w-14 border border-white rounded-full">-</button>
            <span class="flex justify-center items-center h-14 w-14 rounded-full bg-slate-50 text-green-700 text-3xl font-medium">{{ quantity }}</span>
            <button @click.prevent="cartOperation('increase', product)" class="h-14 w-14 border border-white rounded-full disabled:opacity-50"
            :class="{'cursor-not-allowed': !isEnough(product.quantity)}"
            :disabled="!isEnough(product.quantity)"
            >+</button>
          </div>
        </div>        
      </div>
    </div>
    <h4 class="text-xl mb-2">{{product.name}}</h4>
    <p class="text-xs text-gray-500">{{product.unit_quantity}} {{product.unit}}</p>
    <p>
      <span v-if="product.price" class="font-medium bs-dark-orange-color"><HelperTkSymbol /> {{ product.price }}       
      <p class="text-gray-400">
      <HelperTkSymbol /> <del>{{ product.original_price }}</del> 
      <span v-if="product.amount" class="text-gray-400 text-sm px-2">-{{product.amount}}% </span>
      </p>
      </span>
      <span v-else><HelperTkSymbol /> {{ product.original_price }}</span>
    </p>    
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
// import Product from '../../utilities/Product';
// import Product from '~/assets/mylib/utilities/Product';

export default {
  name: "ProductCard",
  props: ['product'],
  data() {
    return {
      matched: false,
      quantity: 0,
      // showModal: false,
      // Product: new Product(this.product)      
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
    ...mapActions('product-details-modal', ['showModal']),
    // productDetails() {
    //   this.$store.dispatch("product-details-modal/triggerModal", this.product);
    // },    
    isEnough(quantity) {
      return (quantity > 1) ? true : false;
    },    
    url(image) {        
    //    let name = image.name;
		if (typeof image === 'object' && image !== null) {
			let path = `/storage/images/products/small/${image.name}`;
			return `${this.$config.baseURL}${path}`;
		}
		return 'https://picsum.photos/200/300';
    },
    showProductDetailsModal() {
      // this.showModal = true;
      this.showModal({
        product: this.product,
        quantity: this.quantity
      })
    },
    // handleCartOperationEvent(data) {
    //   // this.quantity = data.quantity;
    //   console.log("Cart event called")
    //   this.cartOperation(data.action, data.product);
    // },
    // handleModal(value) {
    //   this.showModal = value;
    // },
    // addToCart(product, type) {
    //   this.$store.dispatch("cart/addToCart",
    //     {
    //       product: product,
    //       type: type
    //     }
    //   );
    // },
    cartOperation(action, product) {
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

