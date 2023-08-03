<template>
  <div>
    <loader action="loading" :active="loader" />
    <div class="md:flex md:justify-between md:items-center mb-8">
          <h3 class="text-3xl uppercase">{{ tagName }}
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
          <div v-for="(product, index) in paginatedProducts" :key="index" class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4 md:mb-8">
            <ProductCard :product="product"/>
          </div>
        </div>

        <div class="flex justify-center mb-10">
          <button @click="handlePaginateRequest" class="flex justify-center items-center text-white bg-green-600 disabled:bg-green-300 disabled:text-gray-100 w-56 h-14 rounded-lg" :disabled="links.next === null ? true : false">            
            Load More
          </button>
        </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    layout: 'category',
    data() {
        return {
          slug: this.$route.params.tag,
          selectedSorting: 'default',
          paginatedProducts: [],
          loader: false,
          tagName: '',
        }
    },
    mounted() {
      this.tagName = localStorage.getItem('tagName');
      this.getTagProducts(`/tags/${this.slug}/products`);
    },
    watch: {  
      products(val) {
        this.paginatedProducts.push(...val);
      }
    },
    computed: {
      ...mapState('products', ['products', 'links', 'meta']),
      totalProducts() {
        return this.meta.total;
      }
    },
    methods: {
        ...mapActions('products', ['getTagProducts']),
        async handlePaginateRequest() {
          this.loader = true;
          await this.getTagProducts(this.links.next);
          this.loader = false;
        }
    }
}
</script>

<style>

</style>