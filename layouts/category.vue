<template>
  <!-- <div id="app"> -->
  <div id="app" class="md:container md:mx-auto px-4">
    <Header/>
      <div class="container py-6">
          <!-- <loader action="loading" :active="loader" /> -->
          <div class="lg:flex lg:gap-6">
            <div class="w-full lg:w-1/4">
                <Sidebar 
                  :categories="categories" 
                  :open="setOpen" 
                />
            </div>
            <div class="w-full lg:w-3/4">
                <!-- <ProductList 
                :category="category" 
                :products="paginatedProducts"
                :loadMoreButtonDisabled="links.next === null ? true : false" 
                @loadMore="handlePaginateRequest"
                />            -->
                <Nuxt/>
            </div>  
          </div>    
      </div>
      <!-- <Nuxt/> -->
    <Footer/>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "category",
  data() {
    return {
      viewportWidth: '', 
    }
  },
  mounted() {
    this.viewportWidth = window.innerWidth || document.documentElement.clientWidth;       
     window.addEventListener("resize", this.handleResize);
  },  
   beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    ...mapState('categories', ['categories']),    
    setOpen() {
      return this.viewportWidth >1023 ? true : false;
    }
  },
  methods: {
    handleResize() {
      this.viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    },
  },
}
</script>

<style scoped>
  #app {
        transition: margin-right .5s;
        /* padding: 16px; */
    }
</style>
