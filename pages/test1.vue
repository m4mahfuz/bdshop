<template>
  <div style="padding: 100px">
    <vue-slick-carousel
      v-bind="config.settings"
      ref="c1"
      :asNavFor="$refs.c2"
      @beforeChange="onBeforeChange"
    >
      <div
        v-for="index in [1, 2, 3, 4, 5, 6]"
        :key="index"
      >
        <h1> {{ index }} </h1>
        <!-- <img src="https://picsum.photos/400/400"> -->
      </div>
    </vue-slick-carousel>
    <vue-slick-carousel
      v-bind="config.asNavFor.settings"
      ref="c2"
      :asNavFor="$refs.c1"
      @beforeChange="onBeforeChange"
    >
      <div
        v-for="index in [1, 2, 3, 4, 5, 6]"
        :key="index"
      >
        <h1> {{ index }} </h1>
      </div>
    </vue-slick-carousel>

    <img src="~/assets/img/logo.png" alt="">
  </div>
</template>

<script>
//   import VueSlickCarousel from 'vue-slick-carousel'
//   // optional style for arrows & dots
//   import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

  export default {
    name: 'MyComponent',
    // components: { VueSlickCarousel },
    data () {
      return {
        config: {
          settings: { focusOnSelect: true },
          asNavFor: {
            settings: { 
                arrows: true,
                dots: false,
                slidesToShow: 4, 
                focusOnSelect: true 
            },
          },
        }
      }
    },
    mounted() {
        const img = require('~/assets/img/logo.png');
        console.log('img', img);
      // Comment out these lines and carousels don't sync
      // inspect carousels with chrome vue devtools - each carousel has asHavFor undefined despite props passes
    //   this.$refs.c1.asNavFor = this.$refs.c2;
    //   this.$refs.c2.asNavFor = this.$refs.c1;

    },
    methods: {
        onBeforeChange(currentPosition, nextPosition) {
                this.$refs.c1.goTo(nextPosition)
                this.$refs.c2.goTo(nextPosition)
        }
    }
  }
</script>

<style>
  .slick-next, .slick-prev,
  .slick-next:hover, .slick-prev:hover{
    background: red;
  }
</style>