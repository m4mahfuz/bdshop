<template>
  <div id="app">
    <Header/>
      <div class="container py-6">
          <!-- <loader action="loading" :active="loader" /> -->
          <div class="flex">
            <div class="w-1/4 pr-6">
                <Sidebar :categories="categories" />
            </div>
            <div class="w-3/4">
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
  computed: {
    ...mapState('categories', ['categories']),
  }
}
</script>

<style scoped>
  #app {
        transition: margin-right .5s;
        /* padding: 16px; */
    }
</style>
