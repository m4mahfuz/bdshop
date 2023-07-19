<template>
  <div>
        <div class="h-60 bg-green-50 mb-6 rounded-t-xl">
          <img :src="url(category.image)" class="object-cover h-full float-right" alt="category.title">
        </div>
        <div class="md:flex md:justify-between md:items-center mb-8">
          <h3 class="text-3xl capitalize">{{ category.name }}
            <span class="text-sm lg:mr-6"><b>{{ totalProducts }}</b> Products Found</span>
          </h3>
          <div class="min-w-max mt-4 md:mt-0">
            <select name="sorting" v-model="selectedSorting">
              <option value="default">Default sorting</option>
              <option value="price">Sort by price</option>
              <option value="discount">Sort by discount</option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap -mx-4">
          <div v-for="(product, index) in products" :key="index" class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4 md:mb-8">
            <ProductCard :product="product"/>
          </div>
        </div>

        <div class="flex justify-center mb-10">
          <button @click="loadMore" class="flex justify-center items-center text-white bg-green-600 disabled:bg-green-300 disabled:text-gray-100 w-56 h-14 rounded-lg" :disabled="loadMoreButtonDisabled">            
            Load More
          </button>
        </div>
      </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: {
        category: Object,
        products: Array,
        loadMoreButtonDisabled: {
          type: Boolean,
          default: false
        }
    },
     head() {
      return {
        title: 'Product List',
        meta: [
          {
            hid: 'product-list-description',
            name: 'description',
            content: this.metaDescription,
          },
          {
            hid: 'product-list-keywords',
            name: 'keywords',
            content: this.metaKeywords,
          },
        ],
      };
    },
    data() {
        return {
            selectedSorting: 'default',
        }
    },
    computed: {
      ...mapState('products', [
        'meta'
      ]),
        metaDescription() {
        if (typeof this.category.meta !== 'undefined') {
          return this.category.meta.description;        
        }
      },        
      metaKeywords() {
        let productNames = [];
        let categoryKeywords = [];
        let mergedKeywords = [];
        if ( this.products.length > 0 ) {
          productNames = this.products.map(product => product.name);
        }
        if (typeof this.category.meta !== 'undefined' ) {
          categoryKeywords = this.category.meta['keywords'];
        }
        // Merge product names and category keywords
        mergedKeywords = [...categoryKeywords, ...productNames];

        // Join the keywords with commas
        return mergedKeywords.join(', ');
      },
      totalProducts() {
        return this.meta.totalProducts;
      }
    },        
    methods: {
      loadMore() {
          // this.loader = true;
          // await this.getProducts(this.links.next);
          this.$emit('loadMore');
          // this.loader = false;
      },
      url(image) {   
        let path = `/storage/images/categories/large/${image}`;
        // let name = image;
        // return `${this.$config.baseURL}${path}${name}`;
        return `${this.$config.baseURL}${path}`;
      }
    }
}
</script>

<style>

</style>