<template>
  <div v-if="slides.length > 0" class="p-8">
    <vue-slick-carousel class="hero-slide" v-bind="settings">
        <div 
          v-for="slide in slides" :key="slide.id"
          class="rounded-2xl relative bg-green-50"
        >
          <nuxt-link :to="linkTo(slide.url)">
          <img :src="url(slide.image)" class="object-cover h-full" alt="slide.title">
          </nuxt-link>
          <!-- <div class="container absolute top-0 left-0">
                <p class="py-2 lg:hidden float-none bs-dark-green-color text-xs">Save up {{slide.discount}}% off</p>
            <div class="flex items-center">
              <div class="w-1/2 mt-2 font-size-22">
                <p class="hidden lg:block bs-dark-green-color font-size-32 mb-4">Save up {{slide.discount}}% off</p>
                <h2 class="text-xl md:text-2xl lg:text-4xl xl:text-6xl font-bold mb-6 text-gray-800">{{slide.title}}</h2>
                <p class="mb-4">{{slide.description}}</p>

                <nuxt-link :to="linkTo(slide.url)" class="bs-button text-base">Shop Now</nuxt-link>
              </div>              
            </div>
          </div> -->
        </div>
      </vue-slick-carousel>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
export default {    
      data() {
      return {
        settings: {
          arrows: false,
          dots: true,
          autoplay: true,
          autoplaySpeed: 5000
        },
      }
    },
    async mounted() {
        await this.getSlides();
    },
    computed: {
        ...mapState('slides', ['slides']),
    },
    methods: {
        ...mapActions('slides', ['getSlides']),    
        linkTo(url) {
        return url === null ? '/#' : `/${url}`;
        },
        url(image) {
        // console.log(image)
        let path = `/storage/images/slides/large/`;
        // let name = image.name;
        return `${this.$config.baseURL}${path}${image}`;
        },
    }
}
</script>

<style>

</style>