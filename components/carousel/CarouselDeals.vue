<template>
  <div v-if="dealsProducts.length > 0">
    <!-- <ProductCard v-for="deal in dealsProducts" :key="deal.id" :product="deal.product"/> -->   
    
     <vue-slick-carousel class="category-carousel mb-16 text-center" v-bind="productCarouselSettings">
          <ProductCard v-for="deal in dealsProducts" :key="deal.id" :product="deal.product"/>

          <template #prevArrow="arrowOption">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </template>

          <template #nextArrow="arrowOption">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </template>
      </vue-slick-carousel>
  </div>
</template>

<script>

export default {
  props: {
    deals: {
      type: Array,
      required: true
    },
  },
  data() {
    return {      
        productCarouselSettings: {
            "slidesToShow": 4
        },
        dealsProducts: []
    }
  },
  mounted() {
    // this.dealsOfTheDayProducts = dealsOfTheDayProducts;
    this.dealsProducts = this.deals
    // console.log('CD', this.dealsProducts.length);		
  },
  
}
</script>

<style>

</style>