<template>
  <div v-if="categories.length > 0">
    <vue-slick-carousel class="category-carousel mb-8 text-center" v-bind="categoryCarouselSettings">
          <div v-for="category in categories" :key="category.id" class="bg-gray-50 p-4">
            <div class="h-20 md:h-32 flex justify-center items-center">
              <nuxt-link :to="`/category/${category.slug}`">
                <img :src="url(category.icon)" alt="">
              </nuxt-link>
            </div>
            <h4 class="text-xl text-clip overflow-hidden">{{category.name}}</h4>
          </div>

          <template #prevArrow="arrowOption">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </template>

          <template #nextArrow="arrowOption">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mt-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </template>
        </vue-slick-carousel>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            categoryCarouselSettings: {
                "slidesToShow": 6,
                "responsive": [
                  {
                    "breakpoint": 1280,
                    "settings": {
                      "slidesToShow": 4,                      
                    }
                  },
                  {
                    "breakpoint": 1024,
                    "settings": {
                      "slidesToShow": 3,                      
                    }
                  },
                  // {
                  //   "breakpoint": 768,
                  //   "settings": {
                  //     "slidesToShow": 3,                      
                  //   }
                  // },
                  {
                    "breakpoint": 600,
                    "settings": {
                      "slidesToShow": 2,
                      // "slidesToScroll": 2,
                      // "initialSlide": 2
                    }
                  },
                  {
                    "breakpoint": 480,
                    "settings": {
                      "slidesToShow": 1,
                      "slidesToScroll": 1
                    }
                  }
                ]                
            },
        }
    },
    mounted() {
      this.getCategories();
    },
    computed: {
      ...mapState('categories', ['categories']),
    },
    methods: {
      ...mapActions('categories', ['getCategories']),
      url(image) {
        if (image === null) {
             return require('~/assets/no_image_icon.png');
        }
        let path = `/storage/images/icons/${image}`;
        return `${this.$config.baseURL}${path}`;
      }
    }
}
</script>

<style>

</style>