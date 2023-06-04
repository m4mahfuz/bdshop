<template>
  <section class="container">
    <div class="pb-2 flex flex-col justify-center items-center my-2 rounded-lg">
        <!-- deal header -->
        <div class="w-full px-8 py-8 h-min-72 bg-gradient-to-r from-sky-200 to-green-100 rounded">
            <!-- title -->
            <div class="mb-2 text-2xl text-cyan-700 capitalize">
              Offers
            </div>
            <!-- header body -->
            <div class="flex flex-col">
              <!-- deal details -->
              <div class="flex px-8 py-6 gap-4">
                <p class="mt-1 text-sm text-gray-700">Get exciting deals everyday.<br> Grab before stock runs out.</p>
                <div class="flex bg-sky-100">
                  Timer
                </div>
              </div>

              <!-- offer products -->
              <div class="flex justify-between px-8 py-6 flex-wrap gap-4 bg-yellow-100 max-h-96 overflow-y-scroll">
                <!-- -p-2 -->
                <!-- <div 
                  v-for="offer in offersWithProducts" :key="offer.id"
                  class="p-4 rounded-lg bg-white h-32 relative flex"
                > -->
                <div 
                  v-for="offer in offersWithProducts" :key="offer.id"                 
                >
                    <div 
                    v-for="product in offer.products" :key="product.id"
                    class="p-4 rounded-lg bg-white h-32 relative flex"
                    >
                        <!-- image -->
                        <img class="h-20 w-20 mr-4 bg-transparent" :src="url(product.featured_image)" alt="">
                        
                        <!-- product details -->
                        <div class="w-48">
                            <p>{{ product.name }}</p>
                            <span class="mt-3 text-xs">
                                <HelperTkSymbol />
                                {{product.original_price}}/
                                {{ product.unit_quantity}} {{product.unit}} </span>
                        </div>
                        <!-- price -->
                        <div
                            v-if="offer.type === 'Percentage' || offer.type === 'Fixed Amount'" 
                            class="absolute flex right-0 bottom-0 p-3 gap-4"
                        >
                            <!-- amount -->
                            <div class="flex items-end" >
                            <span class="px-1">at</span>
                            <span class="px-1 font-medium inline text-2xl text-cyan-600">
                                <HelperTkSymbol />
                                {{product.price}}</span>
                            </div>
                        
                            <!-- discount percent -->
                            <div class="flex flex-col justify-center text-gray-100 text-center h-12 w-12 rounded-full bg-gradient-to-r from-red-700 to-orange-500 rotate-12">
                            <span class="text-xl">{{ offer.amount }}%</span>
                            <span class="-mt-1 text-xs">off</span>
                            </div>
                        </div>
                        <!-- <div v-else class="flex-col bg-green-100"> -->
                        <!-- <div v-else class="bg-green-100"> -->
                        <div v-else class="absolute -right-6 top-12">
                          <div class="flex rotate-90">
                            <span class="px-2 text-lg text-white bg-gradient-to-r from-green-700 to-green-500 rounded">
                                {{offer.type}}
                            </span>
                          </div>
                        </div>
                    </div>
                </div>
              </div>              
            </div>
        </div>
        <!-- previous offers -->
        <div class="w-full">
            previous deals
        </div>
      
    </div>   
    <loader :action="action" :active="loader" />
  </section>
</template>

<script>
// import swal from 'sweetalert';
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    // layout: 'dashboard',
    data() {
        return {
          action: '',
          // dealType: 'daily',
        //   dealType: 'daily',
          loader: false,
          page: 0,
        //   openTab: 1
      }
    },
    async mounted() { 
      if (this.activeOffersLength === 0) {
        await this.getActiveOffers();
      }         
    },
	  computed: {
        // ...mapState('offers', [
        //     'activeOffers',
        // ]),
        ...mapGetters('offers', [
          'offersWithProducts',
          'activeOffersLength',
        ]),        
    },
    methods: {   
      ...mapActions('offers', ['getActiveOffers']),       
      url(image) {        
      //    let name = image.name;
        if (typeof image === 'object' && image !== null) {
          let path = `/storage/images/products/small/${image.name}`;
          return `${this.$config.baseURL}${path}`;
        }
      return; 
      },
    }

}
</script>

<style>

</style>