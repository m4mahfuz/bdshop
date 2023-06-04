<template>
  <div class="group text-center">
    <div class="relative mb-2 h-32">
      <div class="bg-gray-50 p-1 w-40 h-32 mx-auto absolute 
      bottom-0 top-0 left-0 right-0 flex justify-center">
      <ProductWishlist :product="product" class="absolute top-0 right-0" />        
        <img :src="url(product.featured_image)"  class="h-full" alt="Product's Image">
      </div>

      <div class="hidden absolute w-40 h-full m-auto bottom-0 left-0 right-0 group-hover:flex justify-center items-center">
        <div class="bg-black absolute h-full w-full opacity-60"></div>

        <button @click.prevent="showProductDetailsModal" class="absolute left-0 bottom-0 bg-gray-200 p-2 w-full flex items-center justify-center">Details <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg></button>
        
        <div v-if="!matched" class="relative z-10">
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

