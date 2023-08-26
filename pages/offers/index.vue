<template>
  <section class="md:container">
    <div class="pb-2 flex flex-col justify-center items-center my-2 rounded-lg">
        <!-- deal header -->
        <div class="w-full px-8 py-8 h-min-72 bg-gradient-to-r from-sky-200 to-green-100 rounded">
            <!-- title -->
            <div class="mb-2 text-3xl text-cyan-700 uppercase">
              Offers
            </div>
            <!-- header body -->
            <div class="flex flex-col">
              <!-- deal details -->
              <div class="flex px-8 py-6 gap-4">
                <p class="mt-1 text-sm text-gray-700">Get exciting deals everyday.<br> Grab before stock runs out.</p>
                <div class="flex">
                  <!-- Timer -->
                </div>
              </div>

              <!-- offer products -->
              <div class="flex flex-col md:flex-row gap-4 overflow-x-hidden overflow-y-scroll">
                
                <div 
                  v-for="offer in offersWithProducts" :key="offer.id"                 
                  class="flex flex-wrap justify-center gap-4"
                >
                    <div 
                    v-for="product in offer.products" :key="product.id"
                    class="relative p-2 rounded-lg w-48 bg-white"
                    >
                      <ProductCard :product="product"/>

                      <div
                            v-if="offer.type === 'Percentage' || offer.type === 'Fixed Amount'" 
                            class="absolute flex right-0 bottom-0 p-3 gap-4"
                        >
                            
                            <div class="flex flex-col justify-center text-gray-100 text-center h-12 w-12 rounded-full bg-gradient-to-r from-red-700 to-orange-500 rotate-12">
                            <span class="text-xl">{{ offer.amount }}%</span>
                            <span class="-mt-1 text-xs">off</span>
                            </div>
                      </div>
                  
                      <div v-else class="absolute top-0">
                        <div class="pl-0 flex justify-end translate-x-28 translate-y-14 rotate-90">
                          <span 
                            class="pl-2 pr-2 text text-white"
                            :class="offer.type === 'Buy 1 Get 1' ? 'bg-gradient-to-r from-green-700 to-green-500' : 'bg-gradient-to-r from-orange-700 to-orange-500'"
                            >
                              {{offer.type}} 
                              <span class="uppercase">free</span>
                          </span>
                        </div>
                      </div> 
                    </div>
                </div>
              </div>              
              <!-- <OfferProducts :offers="offersWithProducts" /> -->
            </div>
        </div>
        <!-- previous offers -->
        <!-- <div class="w-full">
            previous deals
        </div> -->
      
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