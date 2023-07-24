<template>
  <div id="app" class="md:container md:mx-auto px-4">
    <Header @route-changed="handleRouteChanged" />
    <div class="flex justify-end lg:hidden">        
      <span @click.prevent="show = true" class="relative">
        <span class="bs-icon-box rounded-full hover:bg-slate-100 inline-block relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>              
        </span>                                        
      </span>
    </div>
    <div class="container py-6">
        <!-- <loader action="loading" :active="loader" /> -->
        <div class="lg:flex lg:gap-6">
          <div class="hidden lg:block lg:w-1/4">
              <Sidebar 
                :categories="categories"                   
              />
          </div>
          
          <div class="lg:hidden">
            <!-- CategoriesMenu -->
            <offcanvas :show="show" direction="left">
            <div class="px-2">
              <div class="flex justify-end my-4">
                <button @click.prevent="show = false">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 hover:text-red-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>      
                <Sidebar 
                  :categories="categories"                   
                />
              </div>
            </offcanvas>
          </div>
          <div class="w-full lg:w-3/4">              
              <Nuxt/>
          </div>  
        </div>    
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "category",   
  data() {
    return {    
      show: false,
    }
  },  
  computed: {
    ...mapState('categories', ['categories']),        
  },
  methods: {
    handleRouteChanged(event) {      
      this.show = false
    }
  }  
}
</script>

<style scoped>
  #app {
        transition: margin-right .5s;
        /* padding: 16px; */
    }
</style>
