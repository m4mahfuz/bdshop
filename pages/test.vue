<template>
  <div class="mx-8 my-8">      
    <div class="w-64 h-full bg-green-100">
        <overlay-scrollbars
            style="max-height: 250px"
        >
            <!-- :options="osComponentOptions" -->
        mmmmmmm
        mmmmmmmmmmmmmmm
        mmmmmmmmmmmmmmm
        mmmmmmmmmmmmmmm
        mmmmmmmmmmmmmmm
        mmmmmmmmmmmmmmm
        mmmmmmmmmmmmmmm
        mmmmmmmmmmmmmmm
        mmmmmmmmmmmmmmm
        mmmmmmmmmmmmmmm
        mmmmmmmmmmmmmmm
        </overlay-scrollbars>    
        </div>
      <h1> Counter Value from State: {{counter}}</h1>
      <h1> Counter Value from Getters: {{getCounter}}</h1>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click.prevent="increaseCounter()"> + </button>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="decreaseCounter"> - </button>

      <div class="flex justify-center">
        <img class="trigger" src="https://assets.imgix.net/dog.png?w=400" data-zoom="https://assets.imgix.net/dog.png?w=1200">
        <p>This is a simple description of the dog picture.</p>

      </div>

      <div class="border"> 
        <VueSlickCarousel
            ref="c1"
            :asNavFor="$refs.c2"
            :focusOnSelect="true"
        >
            <div>
                <h3>1</h3>
                <h3>2</h3>
                <h3>3</h3>
                <h3>4</h3>
                <h3>5</h3>
                <h3>6</h3>
            </div>            
        </VueSlickCarousel>
        <VueSlickCarousel
            ref="c2"
            :asNavFor="$refs.c1"
            :slidesToShow="4"
            :focusOnSelect="true"
            :arrows="true"
            :dots="true"
        >
            <div>
                <h3>1</h3>
                <h3>2</h3>
                <h3>3</h3>
                <h3>4</h3>
                <h3>5</h3>
                <h3>6</h3>
            </div>            
        </VueSlickCarousel>        
      </div>

       <div>
    <VueSlickCarousel :arrows="true" :dots="true">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </VueSlickCarousel>
  </div>


  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "drift-zoom/dist/drift-basic.css";
  import Drift from 'drift-zoom';
export default {
    components: { VueSlickCarousel },
    data()  {
        return {
            myCounter: '',
             osComponentOptions: {
                // resize: 'both',
                // paddingAbsolute: true,
                 className: "os-theme-dark",
                sizeAutoCapable: true,
                scrollbars: {
                autoHide: 'never',
                clickScrolling: true
                }
            }
        }        
    },

    mounted() {
        console.log(this.$auth.user)
        new Drift(document.querySelector(".trigger"), {
            paneContainer: document.querySelector("p"),
            inlinePane: false,
        });
    },

    computed: {
        ...mapState('moduleOne', [
            'counter'
        ]),        
        ...mapGetters('moduleOne', [
            'getCounter'
        ])
    },

    methods: {
        ...mapActions('moduleOne', [
            'increaseCounter',
            'decreaseCounter'        ])
    }

}
</script>

<style scoped>
/* @import "overlayscrollbars/css/OverlayScrollbars.css"; */
/* @import "overlayscrollbars/css/OverlayScrollbars.min.css"; */

</style>>