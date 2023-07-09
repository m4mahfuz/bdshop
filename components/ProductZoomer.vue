<template>
  <div class="p-30">
    <div class="rounded mb-4">
    <!-- {{normalLength}} -->
      <vue-slick-carousel
        v-if="normalLength"
        v-bind="config.settings"
        ref="c1"
        :asNavFor="$refs.c2"
        @beforeChange="onBeforeChange"          
      >
        <div
          v-for="(normal, index) in normal_size"
          :key="index"            
        >
          <img 
            class="drift-img cursor-zoom-in"
            :src="normal.url"              
            :data-zoom="largeImageURL(normal)"
          >
        </div>
      </vue-slick-carousel>
    </div>
    
    <div>    
      <vue-slick-carousel
        v-if="thumbsLength"
        v-bind="config.asNavFor.settings"
        ref="c2"
        :asNavFor="$refs.c1"
        @beforeChange="onBeforeChange"
        
      >
      <template #prevArrow="arrowOption">
      <button type="button" class="custom-arrow">
        <!-- {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }} -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </template>
        <div
          v-for="(thumb, index) in thumbs"
          :key="index"
          class="px-1 sm:p-2"
        >
          <img 
            :src="thumb.url"
            class="object-fill w-16 h-16 sm:w-24 sm:h-24 cursor-pointer 
            hover:outline
            hover:outline-teal-500"
          >
        </div>
        <template #nextArrow="arrowOption">
          <button type="button" class="custom-arrow">
            <!-- {{ arrowOption.currentSlide }}/{{ arrowOption.slideCount }} -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 flex justify-center items-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </template>
      </vue-slick-carousel>    
    </div>
  </div>
</template>

<script>
  import "drift-zoom/dist/drift-basic.css";
  // import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  import Drift from 'drift-zoom';

  export default {
    name: 'ProductZoomer',
    props: {
      images: Array,
      pane: '',
      slides: {
        type: Number,
        default: 4
      }
    },
    data () {
      return {
        normal_size: [],
        large_size: [],
        thumbs: [],
        config: {
          settings: { 
            arrows: false,
            focusOnSelect: true 
          },
          asNavFor: {
            settings: { 
                arrows: true,
                dots: false,
                slidesToShow: this.slides, 
                focusOnSelect: true,
                infinite: false 
            },
          },
        },
        driftImgs: [],        
      }
    },     
    mounted() {
      console.log('PZoomer mounted')  
      
      this.arrange(this.images)
      this.$nextTick(() => {
        this.handleDrift()
      });
      
    },    
    computed: {    
      thumbsLength() {
        return this.thumbs.length;
      },
      normalLength() {
        return this.normal_size.length;
      }
    },
    methods: {
    
        onBeforeChange(currentPosition, nextPosition) {
                this.$refs.c1.goTo(nextPosition)
                this.$refs.c2.goTo(nextPosition)
        },       
        
        largeImageURL(image) {
          const matchedLargeImg = this.large_size.find(img => {
            return img.id === image.id;
          })
          return matchedLargeImg.url;
        },
        handleDrift() {
          // console.log('handling drift');
          const driftImgs = document.querySelectorAll('.drift-img');
          console.log(driftImgs)
          this.driftImgs.push(...driftImgs);       
          this.driftImgs.map(img => {
            new Drift(img, {
              paneContainer: this.pane,
              inlinePane: false,
              zoomFactor: 4,
              hoverBoundingBox: true,
              hoverDelay: 300,
            });
          });
        },
        arrange(images) {
          // console.log('handling images')
          // console.log(images.length)
          const baseURL = this.$config.baseURL;
          if (images.length > 0) {
              images.forEach(image => {
                  this.thumbs.push({
                      id: image.id,
                      url: `${baseURL}/storage/images/products/small/${image.name}`
                  });
                  this.normal_size.push({
                      id: image.id,
                      url: `${baseURL}/storage/images/products/medium/${image.name}`
                  });
                  this.large_size.push({
                      id: image.id,
                      url: `${baseURL}/storage/images/products/large/${image.name}`
                  })
              });
          }
        }
    }
  }
</script>

<style scooped>  
    
  /* Arrows */

.custom-arrow.slick-arrow.slick-prev,
.custom-arrow.slick-arrow.slick-next {
  font-size: 0;
  line-height: 0;

  position: absolute;
  top: 50%;

  display: flex;

  width: 20px;
  height: 20px;  
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  /* padding: 1px; */
  background-color: #4b5563;  
  color: white;
  cursor: pointer;

  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
}

.custom-arrow.slick-arrow.slick-prev:hover,
.custom-arrow.slick-arrow.slick-prev:focus,
.custom-arrow.slick-arrow.slick-next:hover,
.custom-arrow.slick-arrow.slick-next:focus {
  outline: none;
  background-color: lightgreen;
}

.custom-arrow.slick-arrow.slick-prev.slick-disabled,
.custom-arrow.slick-arrow.slick-next.slick-disabled {
  opacity: 0.25;
  cursor: default;
}

.custom-arrow.slick-arrow.slick-prev {
  left: -25px;
}

.custom-arrow.slick-arrow.slick-next {
  right: -25px;
}
</style>