<template>
  <div>
    <h3 class="text-2xl font-bold mb-8 border-b border-red-100 pb-2">
        <span class="border-b-4 border-red-400 pb-1 pr-1">Wishlist</span> 
    </h3>
    <loader :active="loader" action="loaderAction" />
    <div 
      v-for="wishlist in wishlists" :key="wishlist.product.id" class="py-2 border-b text-gray-500 text-sm grid grid-cols-12 odd:bg-white even:bg-gray-50 hover:bg-green-50"
    >
      <div class="col-span-6 flex">
        <span class="w-16">
          <img :src="url(wishlist.product.featured_image)" alt="image">   
        </span>
        <span class="px-1">
          <p class="font-medium">
            {{wishlist.product.name}}
          </p>
          <p class="text-xs text-gray-500">{{wishlist.product.unit_quantity}} {{wishlist.product.unit}}</p>                
        </span>
      </div>                   
      <div class="col-span-2">
        <span v-if="wishlist.product.price" class=" bs-dark-orange-color"><HelperTkSymbol /> {{ wishlist.product.price }}       
          <p class="text-gray-400">
            <HelperTkSymbol /> <del>{{ wishlist.product.original_price }}</del>         
          </p>
        </span>
        <span v-else><HelperTkSymbol /> {{ wishlist.product.original_price }}</span>
      </div>                         
      <div class="col-span-4 text-xs flex justify-center items-start pt-0.5 gap-1">
        <button @click.prevent="addItemToCart(wishlist.product)" class="px-1 py-1 rounded text-green-700 hover:bg-green-700 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </button>
        <button @click.prevent="remove(wishlist)" class="px-1 py-1 rounded text-gray-500 hover:bg-red-500 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>        
      </div>                   
    </div>
    <div class="my-4">
      <Pagination :pagination="pagination" @paginate="handlePagination" :offset="offset" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions} from "vuex";
import swal from 'sweetalert';
export default {
  layout: 'userDashboard',
  data() {
    return {
      loader: false,
      loaderAction: 'loading',
      offset: 4,
    }
  },
  async mounted() {
    if (!this.pagination.current_page) {
      await this.getWishlists();
    }
  },
  computed: {
    ...mapState('wishlists', ['wishlists', 'pagination']),
    ...mapState('cart', ['cart']),
    // ...mapGetters('orders', ['bgColorBy'])
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    ...mapActions('wishlists', ['getWishlists', 'removeWishlist']),
    url(image) {        
        let path = `/storage/images/products/small/${image}`;
        return `${this.$config.baseURL}${path}`;      
    },    
    handlePagination(page) {
      let current_page = page;
      let pageNumber = current_page?? 1;

      let url = `/wishlists?page=${pageNumber}`;
      this.getWishlists(url);
    },
    addItemToCart(product) {
      ///      
      let action = 'add';
     
     if(this.cart?.length) {
        this.cart.forEach(item => {
          if(item.id === product.id) {
            // matched = true;
            action = 'increase';
          }
        })
      }

      this.addToCart(
        {
          product: product,
          action: action,
          quantity: 1 //this.quantity
        }
      )
    },
    async remove(wishlist) {      
      swal({
            title: "Are you sure?",
            text: `This product, '${wishlist.product.name}'  will be deleted from wishlists.`,
            icon: "error",                 
            dangerMode: true,
            buttons: {
              cancel: "cancel",
              confirm: {
              text: "Delete It!",
              value: true,
              },                                
            },
          })
          .then(async (value) => {
            if (value) {
              this.action = 'deleting';
              this.loader = true;					
              await this.removeWishlist(wishlist.id);
              this.loader = false;
              swal("Deleted from wishlits successfully!", {
                icon: 'success',
                // buttons: false,
                timer: 3000,
              });
            }                   
          });      
    }
  }
}
</script>