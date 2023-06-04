<template>
  <div style="padding: 100px">
    <div class="flex justify-between">
      <div class="demo-area w-1/3">    
        <vue-slick-carousel
          v-bind="config.settings"
          ref="c1"
          :asNavFor="$refs.c2"
          @beforeChange="onBeforeChange"          
        >
            <!-- v-for="(i, index) in [1, 2, 3, 4, 5, 6]" -->
          <div
            v-for="(normal, index) in images.normal_size"
            :key="index"
          >
            <!-- <h1> {{ index }} </h1> -->
            <img 
              class="drift-img"
              :src="normal.url"              
              :data-zoom="largeImageURL(normal)"
            >
          </div>
        </vue-slick-carousel>      
      </div>      
      <div class="drift-pane w-2/3">
          <section class="pt-0">
            <h3>Men's Watch - Drift Demo</h3>
            <p>Specifications:</p>
            <ul>
              <li>Hover over image</li>
              <li>35 mm stainless steel case</li>
              <li>Stainless link bracelet with buckle closure</li>
              <li>Water resistant to 100m</li>
            </ul>
            <h4>$XX.XX <button>Add to Cart</button></h4>
          </section>  
      </div>
    </div>
    <vue-slick-carousel
      v-bind="config.asNavFor.settings"
      ref="c2"
      :asNavFor="$refs.c1"
      @beforeChange="onBeforeChange"
    >
      <div
        v-for="(thumb, index) in images.thumbs"
        :key="index"
      >
        <h1> {{ index }} </h1>
        <img :src="thumb.url">
      </div>
    </vue-slick-carousel>
  </div>
</template>

<script>
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  import "drift-zoom/dist/drift-basic.css";
  import Drift from 'drift-zoom';

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
        },
        driftImgs: [],        
        images: {
            thumbs: [
            {
                id: 1,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/1.jpeg"
            },
            // {
            //     id: 2,
            //     url:
            //     "https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/2.jpeg"
            // },
            {
                id: 3,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/3.jpeg"
            },
            {
                id: 4,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/4.jpeg"
            },
            {
                id: 5,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/5.jpeg"
            },
            {
                id: 6,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/6.jpeg"
            },
            {
                id: 7,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/7.jpeg"
            },
            {
                id: 8,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/8.jpeg"
            },
            {
                id: 9,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/thumbs/9.jpeg"
            }
            ],
            normal_size: [
            {
                id: 1,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/1.jpeg"
            },
            // {
            //     id: 2,
            //     url:
            //     "https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/2.jpeg"
            // },
            {
                id: 3,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/3.jpeg"
            },
            {
                id: 4,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/4.jpeg"
            },
            {
                id: 5,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/5.jpeg"
            },
            {
                id: 6,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/6.jpeg"
            },
            {
                id: 7,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/7.jpeg"
            },
            {
                id: 8,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/8.jpeg"
            },
            {
                id: 9,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/normal_size/9.jpeg"
            }
            ],
            large_size: [
            {
                id: 1,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/1.jpeg"
            },
            // {
            //     id: 2,
            //     url:
            //     "https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/2.jpeg"
            // },
            {
                id: 3,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/3.jpeg"
            },
            {
                id: 4,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/4.jpeg"
            },
            {
                id: 5,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/5.jpeg"
            },
            {
                id: 6,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/6.jpeg"
            },
            {
                id: 7,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/7.jpeg"
            },
            {
                id: 8,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/8.jpeg"
            },
            {
                id: 9,
                url:
                "https://yoohooworld.com/assets/images/vue_product_zoomer/large_size/9.jpeg"
            }
            ]
        },
      }
    },
    mounted() {
      this.$nextTick(() => {
        const driftImgs = document.querySelectorAll('.drift-img');
        this.driftImgs.push(...driftImgs);
        const pane = document.querySelector('.drift-pane');
        this.driftImgs.map(img => {
          new Drift(img, {
            paneContainer: pane,
            inlinePane: false,
            zoomFactor: 4,
            hoverBoundingBox: true,
            hoverDelay: 300,
          });
        });
      });
    },
    methods: {
        onBeforeChange(currentPosition, nextPosition) {
                this.$refs.c1.goTo(nextPosition)
                this.$refs.c2.goTo(nextPosition)
        },       
        
        largeImageURL(image) {
          const matchedLargeImg = this.images.large_size.find(img => {
            return img.id === image.id;
          })
          return matchedLargeImg.url;
        }
    }
  }
</script>

<style>  
  .slick-next, .slick-prev,
  .slick-next:hover, .slick-prev:hover{
    background: red;
  }
  .demo-area{
  /* background:$color_invert_fg; */
  border-radius:8px;
  padding:20px;
  /* section{
    padding-top:0;
  } */
}

.drift-pane {
  position: relative;
  /* width: 65%; */
  margin-left: 5%;
  /* float: left; */
  }
</style>