<template>
  <div class="w-3/4">
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
          <div v-for="product in products" :key="product.id" class="w-1/3 px-4 mb-10">
            <ProductCard :product="product"/>
          </div>
        </div>

        <div class="text-center mb-10">
          <button class="bs-button">Load more</button>
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
        }
    },    
}
</script>

<style>

</style>