<template>
  <div class="container py-6">
    <loader action="loading" :active="loader" />
    <div class="flex">
      <div class="w-1/4 pr-6">
        <Sidebar :categories="categories" />
      </div>
      <div class="w-3/4">
        <ProductList 
          :category="category" 
          :products="paginatedProducts"
          :loadMoreButtonDisabled="links.next === null ? true : false" 
          @loadMore="handlePaginateRequest"
        />           
      </div>  
    </div>    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "category",
  data() {
    return {
      slug: this.$route.params.category,
      paginatedProducts: [],
      loader: false
    }
  },
  mounted() {
    console.log('category mounted');    
    this.getCategory(this.slug);
    this.getCategoryProducts({category: this.slug});
  },  
  watch: {  
      products(val) {
        this.paginatedProducts.push(...val);
      }
  },
  computed: {
    ...mapState('categories', [
        'category',
        'categories'
    ]),        
    ...mapState('products', [       
        'products',
        'links',
        'meta'
    ]),        
  },
  methods: {
    ...mapActions('categories', [
      'getCategory'		
    ]),
    ...mapActions('products', [
      'getCategoryProducts'		
    ]),    
    async handlePaginateRequest() {
      this.loader = true;
      await this.getCategoryProducts({category: this.slug, link: this.links.next});
      this.loader = false;
    }
  }
}
</script>

<style scoped>
</style>
