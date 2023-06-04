<template>
  <div>
    <loader action="loading" :active="loader" />
    <ProductList 
      :category="category" 
      :products="paginatedProducts"
      :loadMoreButtonDisabled="links.next === null ? true : false" 
      @loadMore="handlePaginateRequest"
    />           
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: 'category',
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
