<template>
  <span v-if="show">
      <loader :active="loader" action="loading" />
      <p v-if="wishlistCount === 0" class="flex items-center whitespace-nowrap">
        <button @click.prevent="callToToggleWishlist()" type="button" class="text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>          
        </button>
        <span v-if="text" class="px-2">Add to favourites</span>
      </p>
      <p v-else class="flex items-center whitespace-nowrap">        
        <button @click.prevent="callToToggleWishlist()" type="button" class="text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </button>
        <span v-if="text" class="px-2">Remove from favourites</span>
      </p>
    </span>
</template>

<script>
import {mapActions} from "vuex";
export default {
    props: {
        product: {
            type: Object,
        },        
        text: {
          type: Boolean,
          default: false
        }
    },
    data() {
        return {
            loader: false,
            wishlistCount: this.product.wishlistCount 
        }
    },        
    computed: {
      show() {
        return this.$auth.loggedIn && this.product?.deal !== true;
      }
    },
    methods: {
      ...mapActions('wishlists', ['toggleWishlist']),
        // toggleWishlist() {
        //   this.loader = true;
        //   return this.$axios.$post('/products/toggle-wishlist', { product_id: this.product.id })
        //   .then(response => {
        //     this.loader = false;
        //     this.wishlistCount = response.data.count;
        //     if (response.data.count === 1) {
        //       this.$toast.success(response.data.message);
        //     } else {
        //       this.$toast.error(response.data.message);
        //     }
        //   })
        //   .catch(error => {
        //     console.log(error.response)
        //     this.loader = false;
        //   })
        // }
        async callToToggleWishlist() {
          this.loader = true;
          let data = await this.toggleWishlist({ product_id: this.product.id })          
          this.wishlistCount = data.count;
          this.loader = false;         
          // this.showMessage(data);
        },
        showMessage(data) {
          if (data.count === 1) {
            this.$toast.success(data.message);
            return;
          } 
          this.$toast.error(data.message);
        }
    }  

}
</script>