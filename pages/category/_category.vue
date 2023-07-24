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
  head() {
    return {
      title: this.category.name,
      meta: [
        {
          hid: 'category-description',
          name: 'description',
          content: this.metaDescription//this.category.meta.description,
        },
        {
          hid: 'category-keywords',
          name: 'keywords',
          content: this.metaKeywords//this.category.meta['keywords'],
        },
      ],
    };
  },
  data() {
    return {
      slug: this.$route.params.category,
      paginatedProducts: [],
      loader: false
    }
  },
  mounted() {
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
    metaDescription() {
      if (typeof this.category.meta !== 'undefined') {
        return this.category.meta.description;        
      }
    },        
    metaKeywords() {
      if (typeof this.category.meta !== 'undefined' ) {
        return this.category.meta['keywords'].join(', ');
      }
    }        
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
