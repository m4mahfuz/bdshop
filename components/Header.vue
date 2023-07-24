<template>
  <div class="mb-4">    
      <nav v-if="isLargeScreen">
        <div class="py-6 flex justify-between items-center">
          <Logo/>
          
          <div class="w-auto h-6 z-20">
            <search-autocomplete 
              :items="items"
              :isAsync="isLoading" 
              @search="searchItems"
              @found="(status) => setFound(status)"
              @next="nextItems" 
            />
          </div>

          <div class="min-w-max flex items-center">          
            <span @click.prevent="wishlist()" class="relative">
              <span class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </span>                          
              <span v-if="$auth.loggedIn && getWishlistsCount > 0" class="absolute bg-red-500 -top-2.5 right-0 w-7 h-7 rounded-full flex justify-center items-center text-xs text-white">{{ getWishlistsCount }}
              </span>
            </span>  
            
            <span class="relative mx-4" @click.prevent="handleMiniCart">
              <span class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
              <span class="absolute bg-red-500 -top-2.5 right-0 w-7 h-7 rounded-full flex justify-center items-center text-xs text-white">{{ count }}
              </span>
            </span>          
            <client-only>
            <template v-if="!$auth.loggedIn">
              <nuxt-link to="/register">
                <Tooltip mLeft="-ml-16">
                  <span class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                  </span>
                  <template #message>Register</template>
                </Tooltip>
              </nuxt-link>
              <nuxt-link to="/login">
                <Tooltip mLeft="-ml-14">
                  <span @click="storeRedirectPathAtLocal()" class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </span>
                  <template #message>Login</template>
                </Tooltip>
              </nuxt-link>
            </template>          
            <template v-else>               
              <button type="button" @click.prevent="toggle('dropdown')" class="relative">              
                  <span class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </span>
                  <div class="text-left">
                    <DropDown :show="dropdown">
                      <nuxt-link to="/manage-account" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">Manage Account</nuxt-link>
                      <nuxt-link to="/orders" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">My Orders</nuxt-link>
                      
                      <nuxt-link to="/user/wishlist" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">My Wishlist</nuxt-link>
                    </DropDown>
                  </div>
              </button>
              <Tooltip mLeft="-ml-14">       
              <span @click.prevent="logout()" class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </span>       
                <template #message>Logout</template>
              </Tooltip>
            </template>
            </client-only>
          </div>
        </div>          

        <div class="flex items-center">
          <div v-click-outside="closeMenu" class="w-96 relative">
            <div @click.prevent="handleAllCategoriesMenu" class="bs-dark-green-bg relative z-20 flex rounded-full px-4 py-2 cursor-pointer">
              <div class="min-w-max">
                <img src="~/assets/img/menu-right.png" alt="">
              </div>
              <!-- <div class="w-full text-sm md:text-base text-center px-6 text-white"> -->
              <div class="w-full text-sm 2xl:text-base text-center text-white">
                All Categories
              </div>
              <div class="min-w-max">
                <img src="~/assets/img/chevron-down.png" alt="">
              </div>
            </div>          
            <div v-if="showAllCategoriesMenu" class="absolute bs-dark-green-bg z-10 w-full -mt-5 pt-6 pb-4 rounded-b-2xl">
              <ul>
                <li v-for="category in categories" :key="category.id">
                  <nuxt-link v-if="category.active" class="block text-white py-2 px-6 hover:text-black" :to="`/category/${category.slug}`">
                    {{category.name}}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="w-full">
            <ul class="flex justify-center">
              <li><nuxt-link class="p-4" to="/">Home</nuxt-link></li>
              <li><nuxt-link class="p-4" to="/about">About</nuxt-link></li>
              <li><nuxt-link class="p-4" to="/contact">Contact</nuxt-link></li>
              <li><nuxt-link class="p-4" to="/faqs">FAQs</nuxt-link></li>
              <li><nuxt-link class="p-4" to="/order-tracking">Order Tracking</nuxt-link></li>
            </ul>
          </div>
          <nuxt-link to="/offers" class="min-w-max bs-dark-orange-color flex">
            <img src="~/assets/img/u_percentage.png" class="mr-3" alt=""> Special Offers!
          </nuxt-link>
        </div>
      </nav>

      <!-- Mobile Header -->
      <nav v-else>        
        <div class="py-6 flex justify-between items-center">
          <Logo :logoText="false" />

          <div class="min-w-max flex items-center">          
            
            <span class="relative mx-4" @click.prevent="handleMiniCart">
              <span class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </span>
              <span class="absolute bg-red-500 -top-2.5 right-0 w-7 h-7 rounded-full flex justify-center items-center text-xs text-white">{{ count }}
              </span>
            </span>     

            <span @click.prevent="handleMobileMenu" class="relative">
              <span class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">      
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
              </span>                                        
            </span>
          </div>
        </div>          

        <div class="flex items-center">
          <div v-click-outside="closeMenu" class="w-full relative">
            <div @click.prevent="handleAllCategoriesMenu" class="bs-dark-green-bg relative z-20 flex rounded-full px-4 py-2 cursor-pointer">
              <div class="min-w-max">
                <img src="~/assets/img/menu-right.png" alt="">
              </div>
              
              <div class="w-full text-sm 2xl:text-base text-center text-white">
                All Categories
              </div>
              <div class="min-w-max">
                <img src="~/assets/img/chevron-down.png" alt="">
              </div>
            </div>

            <div v-if="showAllCategoriesMenu" class="absolute bs-dark-green-bg z-10 w-full -mt-5 pt-6 pb-4 rounded-b-2xl">
              <ul>
                <li v-for="category in categories" :key="category.id">
                  <nuxt-link v-if="category.active" class="block text-white py-2 px-6 hover:text-black" :to="`/category/${category.slug}`">
                    {{category.name}}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>          
        </div>
      </nav>
    <!-- </div> -->
    <offcanvas :show="showMobileMenu" direction="left">
      <div class="px-2">
        <div class="flex justify-end my-4">
          <button @click.prevent="showMobileMenu = false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 hover:text-red-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="z-20">
            <search-autocomplete 
              :items="items"
              :isAsync="isLoading" 
              @search="searchItems"
              @found="(status) => setFound(status)"
              @next="nextItems" 
            />
        </div>
        
        <div class="my-4 flex justify-center items-center bg-slate-100 rounded-lg">
          <span @click.prevent="wishlist()" class="relative">
              <span class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </span>                          
              <span v-if="$auth.loggedIn && getWishlistsCount > 0" class="absolute bg-red-500 -top-2.5 right-0 w-7 h-7 rounded-full flex justify-center items-center text-xs text-white">{{ getWishlistsCount }}
              </span>
            </span>
            <client-only>
              <template v-if="!$auth.loggedIn">
                <nuxt-link to="/register">
                  <Tooltip mLeft="-ml-16">
                    <span class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                      </svg>
                    </span>
                    <template #message>Register</template>
                  </Tooltip>
                </nuxt-link>
                <nuxt-link to="/login">
                  <Tooltip mLeft="-ml-14">
                    <span @click="storeRedirectPathAtLocal()" class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </span>
                    <template #message>Login</template>
                  </Tooltip>
                </nuxt-link>
              </template>          
              <template v-else>               
                <button type="button" @click.prevent="toggle('dropdown')" class="relative">              
                    <span class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </span>
                    <div class="text-left">
                      <DropDown :show="dropdown">
                        <nuxt-link to="/manage-account" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">Manage Account</nuxt-link>
                        <nuxt-link to="/orders" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">My Orders</nuxt-link>
                        
                        <nuxt-link to="/user/wishlist" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">My Wishlist</nuxt-link>
                      </DropDown>
                    </div>
                </button>
                <Tooltip mLeft="-ml-14">       
                <span @click.prevent="logout()" class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>       
                  <template #message>Logout</template>
                </Tooltip>
              </template>
            </client-only>
        </div>

        <div class="w-full">
          <ul class="flex flex-col justify-center gap-2">
            <li><nuxt-link class="p-4" to="/">Home</nuxt-link></li>
            <li><nuxt-link class="p-4" to="/about">About</nuxt-link></li>
            <li><nuxt-link class="p-4" to="/contact">Contact</nuxt-link></li>
            <li><nuxt-link class="p-4" to="/faqs">FAQs</nuxt-link></li>
            <li><nuxt-link class="p-4" to="/order-tracking">Order Tracking</nuxt-link></li>
          </ul>
        </div>
        <nuxt-link to="/offers" class="min-w-max bs-dark-orange-color flex p-4">
          <img src="~/assets/img/u_percentage.png" class="mr-3" alt=""> Special Offers!
        </nuxt-link>

      </div>
    </offcanvas>    
    <MiniCart 
        :show="showMiniCart"
        :count="count"
        @close="handleClose"
    />
    
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      isLargeScreen: true,
      showAllCategoriesMenu: false,
      showMiniCart: false,
      showMobileMenu: false,
      showCategoriesMenu: false,
      count: 0,
      dropdown: false
    }
  },
  mounted() {
    this.getCategories();	
    if (this.$auth.loggedIn) {
      this.getWishlists();		    
    }	    
    
    this.setCartAtLocalStorageIfNotExist();
    this.initializeCartStore();    

    this.cartWatcher();
    
   // Add event listener to update screen size properties
    window.addEventListener('resize', this.updateScreenSize);
    this.updateScreenSize();
  },
  destroyed() {
    // Remove event listener when component is destroyed
    window.removeEventListener('resize', this.updateScreenSize);
  },

  watch: {
    cart: {
      handler(value) {
        // console.log('watch triggered from Header')
        this.cartWatcher();
      },
      deep: true
    },    
    $route: {
      handler(newRouteValue){
        if (!this.isLargeScreen) {
          this.$emit('route-changed', true);
          this.showMobileMenu = false;
        }
      },
      // deep: true
    }
  },  
  computed: {
    ...mapState('categories', [
        'categories'
    ]),
    ...mapState('cart', [
        'cart'
    ]),
    ...mapState('search', ['items', 'links', 'isLoading']),
    ...mapGetters('wishlists', ['getWishlistsCount']),
  },
  methods: {
    ...mapActions('categories', [
      'getCategories',
    ]),
    ...mapActions('cart', [
      'emptyTheCart',
      'setToCart'
    ]),
    ...mapActions('wishlists', ['getWishlists']),
    ...mapActions('search', ['getItems', 'emptyItems', 'setFound']),
     updateScreenSize() {
      this.isLargeScreen = window.innerWidth >= 1024;
      // this.isSmallScreen = window.innerWidth < 1024;
    },
    nextItems() {
      const url = this.links.next;
      this.getItems(url);
    },
    searchItems(query) {
      if (query === '') {
        this.emptyItems();
        this.setFound(null);
        return;
      }
      // this.items = [];
      this.emptyItems();
      const url = `/search/items?q=${query}`;
      this.getItems(url);
    },
    wishlist() {
      this.$router.push('/user/wishlist');
    },
    handleClose(event) {
      this.showMiniCart = event;
    },
    handleMiniCart() {
      this.showMiniCart = !this.showMiniCart
    },
    handleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    initializeCartStore() {
      let cartAtLocalStorage = this.getCartAtLocalStorage();
      if (cartAtLocalStorage) this.setToCart(cartAtLocalStorage);
    },
    toggle(element) {
      this.dropdown = !this.dropdown;
    },
    async logout() {
      await this.$auth.logout()
        .then(() => {
          this.removeRedirectPathAtLocal();
          this.resetCart();
          this.$auth.strategies.cookie.reset();         
          this.$toast.warning('Logged Out!')
        })
    },
    storeRedirectPathAtLocal() {
      localStorage.setItem('redirect', this.$route.path);
    },
    removeRedirectPathAtLocal() {
      if (localStorage.getItem('redirect') !== null ) {
        localStorage.removeItem('redirect');
      }
    },
    emptyTheCartAtLocalStorage() {
        localStorage.setItem('cart', '[]');
        console.log('cartAtLocalStorageCleared');
    },
    resetCart() {
      if(this.cart.length) this.emptyTheCart();
      this.emptyTheCartAtLocalStorage();
    },
    handleAllCategoriesMenu() {
      // console.log('all cat clicked')
      this.showAllCategoriesMenu = !this.showAllCategoriesMenu;
    },
    closeMenu() {
      this.showAllCategoriesMenu = false
    },
    cartWatcher() {      
      this.count = 0;
      const cartAtLocalStorage = this.getCartAtLocalStorage();
      const cartAtStore = this.cart;

      let cart = [];
      cart = cartAtStore.length ? cartAtStore : cartAtLocalStorage;

      if(cart.length) {        
        cart.forEach(item => {
          this.count = (this.count + item.quantity);
        })
      }
    },
    getCartAtLocalStorage() {
      return JSON.parse(localStorage.getItem('cart'));
    },
    setCartAtLocalStorageIfNotExist() {
      let cartAtLocalStorage = this.getCartAtLocalStorage();
      if(cartAtLocalStorage === null) {
        localStorage.setItem('cart', '[]');
      }
    }
  },
}
</script>