<template>
  <div class="container px-0 mt-4 h-screen">
    <!-- header -->
    <!-- <div class="flex">     -->
        <!-- <div class="h-16 shadow-sm bg-red-200">
            <Logo/>
        </div> -->
        <header class="h-16 w-full bg-white shadow-sm px-4 flex items-center justify-between">
          <Logo/>
          <!-- search -->
          <div class="relative h-20 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-8 text-gray-400 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" class="block w-72 shadow borde-none rounded-3xl focus:outline-none bg-gray-100 text-xs font-light text-gray-600 py-2 pl-11 pr-2 pl" placeholder="search">
          </div> 

          <nav class="items-center hidden lg:flex">
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
    <!-- </div> -->
    <div class="flex">
      <aside class="w-64 border-r">
        <UserSidebar />
      </aside>
      <main class="grow px-4 py-2">        
          <Nuxt />
      </main>
    </div>    
  </div>  
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
        dropdown: false,
    }
 },
 methods: {
    hideDropdown() {
        console.log('outside clicked')
        this.dropdown = false;        
    },
    toggle(element) {
        this.dropdown = !this.dropdown;
    }
 }
}
</script>
