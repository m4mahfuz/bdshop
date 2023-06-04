<template>
  <!-- <div class="w-3/4"> -->
  <div>
        <div class="h-60 bg-gray-50 mb-6"></div>
        <div class="flex justify-between items-center mb-8">
          <h3 class="text-3xl capitalize">{{ category.name }}</h3>
          <div class="min-w-max flex items-center">
            <div class="text-sm mr-6"><b>{{ category.productCount }}</b> Products Found</div>
            <select name="sorting" v-model="selectedSorting">
              <option value="default">Default sorting</option>
              <option value="price">Sort by price</option>
              <option value="discount">Sort by discount</option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap -mx-4">
          <div v-for="product in productsLoaded" :key="product.id" class="w-1/3 px-4 mb-10">
            <ProductCard :product="product"/>
          </div>
        </div>

        <div v-if="productsLoaded.length >= loadMoreSize" @click="loadMore()" class="flex justify-center mb-10">
          <!-- <button class="bs-button flex justify-center"> -->
          <button class="flex justify-center items-center text-white bg-green-600 w-56 h-14 rounded-lg">            
            Load More
          </button>
        </div>

      </div>
</template>

<script>
export default {
    props: {
        category: Object,
        products: Array
    },
    data() {
        return {
          selectedSorting: 'default',
          loadMoreSize: 9,
          totalSize: 0,
        }
    },  
    mounted() {
      console.log('Product List Mounted');
      this.loadMore();
    },
    computed: {
      productsLoaded() {
        let products = [...this.products];
        return products.splice(0, this.totalSize);
      }
    },
    methods: {
      loadMore() {
        this.animate = true;
        this.totalSize = this.loadMoreSize + this.productsLoaded.length;
      }
    }  
}
</script>

<style>

</style>