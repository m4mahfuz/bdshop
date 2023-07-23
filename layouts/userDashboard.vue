<template>
  <div class="container px-0 mt-4 h-screen">
    
    <header v-if="isLargeScreen" class="h-16 w-full bg-white shadow-sm px-4 flex items-center justify-between">
      <Logo/>
      <nav class="flex items-center">
        <!-- Notifications -->
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <!-- Account -->
        <div class="relative ml-4" v-click-outside="hideDropdown">
          <div class="cursor-pointer" @click.prevent="toggle('dropdown')">
            <img 
              class="object-cover w-8 h-8 rounded-full"
              src="https://images.unsplash.com/photo-1621659911279-b08ce9ff421f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format& fit=crop&w=764" 
              alt=""
            >
          </div>            
          <DropDown :show="dropdown">
            <nuxt-link to="/manage-account" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">Manage Account</nuxt-link>
            <nuxt-link to="/orders" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">My Orders</nuxt-link>
            
            <nuxt-link to="/user/wishlist" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">My Wishlist</nuxt-link>
            
          </DropDown>
        </div>
      </nav>      
    </header> 

    <!-- mobile header -->
    <header v-else class="h-16 w-full bg-white shadow-sm px-4 flex items-center justify-between">
          <Logo :logoText="false" />
          <nav class="flex items-center gap-3">
            <!-- Notifications -->
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <!-- Account -->
            <div class="relative" v-click-outside="hideDropdown">
              <div class="cursor-pointer" @click.prevent="toggle('dropdown')">
                <img 
                  class="object-cover w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1621659911279-b08ce9ff421f?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format& fit=crop&w=764" 
                  alt=""
                >
              </div>            
              <DropDown :show="dropdown">
                <nuxt-link to="/manage-account" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">Manage Account</nuxt-link>
                <nuxt-link to="/orders" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">My Orders</nuxt-link>
                
                <nuxt-link to="/user/wishlist" class="block px-6 py-2 text-sm leading-5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition">My Wishlist</nuxt-link>
                
              </DropDown>
            </div>
            <!-- Notifications -->
            <div @click.prevent="handleMobileMenu" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </div>            
          </nav>      
    </header> 

    <!-- <div class="flex"> -->
    <div class="md:flex">
      <aside v-if="isLargeScreen" class="w-64 border-r">
        <UserSidebar />
      </aside>
      <main class="grow md:px-6 p-4">        
          <Nuxt />
      </main>
    </div>    
    <offcanvas :show="showMobileMenu" direction="left">
      <div class="px-2">
        <div class="flex justify-end my-4">
          <button @click.prevent="showMobileMenu = false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 hover:text-red-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <aside class="w-64 border-r">
        <UserSidebar />
      </aside>
    </offcanvas>
  </div>  
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
        dropdown: false,
        isLargeScreen: true,
        showMobileMenu: false,
    }
 },
 mounted() {
  window.addEventListener('resize', this.updateScreenSize);
    this.updateScreenSize();
  },
  destroyed() {
    // Remove event listener when component is destroyed
    window.removeEventListener('resize', this.updateScreenSize);
  },
  watch:{
    $route: {
      handler(newRouteValue){
        if (!this.isLargeScreen) {
          this.showMobileMenu = false;
        }
      },
      // deep: true
    }
  },
 methods: {
  updateScreenSize() {
      this.isLargeScreen = window.innerWidth >= 1024;
    },
    hideDropdown() {
        console.log('outside clicked')
        this.dropdown = false;        
    },
    toggle(element) {
        this.dropdown = !this.dropdown;
    },
    handleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
 }
}
</script>
