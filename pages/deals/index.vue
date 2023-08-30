<template>
  <section class="md:container">
  <!-- <section class="bg-sky-100"> -->
    <div class="lg:flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
      <button 
        @click.prevent="toggleTabs(1, 'daily')"
        class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"        :class="openTab == 1 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
        >
          Daily
      </button>

      <button @click.prevent="toggleTabs(2, 'weekly')"
        class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
        :class="openTab == 2 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'">
          Weekly
      </button>
    </div>    
    <div class="pb-2 flex flex-col justify-center items-center my-2 rounded-lg">
        <!-- deal header -->
        <div class="w-full px-8 py-8 h-min-72 bg-gradient-to-r from-sky-200 to-green-100 rounded">
            <!-- title -->
            <div class="mb-2 text-2xl text-cyan-700 capitalize">
              {{dealType}} deals ⏳
            </div>
            <!-- header body -->
            <div class="flex flex-col">
              <!-- deal details -->
              <div class="lg:flex px-4 lg:px-8 py-6 gap-4">
                <p v-if="dealType === 'daily'" class="mt-1 text-sm text-gray-700">Get exciting deals <span class="font-semibold text-gray-600">everyday</span>.<br> Grab before stock runs out.
                </p>
                <p v-else class="mt-1 text-sm text-gray-700">Unleash the excitement with our <span class="font-semibold text-gray-600">weekly</span> deals.<br> Hurry, before stocks vanish!
                </p>
                <div class="mt-4 lg:mt-0 flex">             
                  <CountDownTimer v-if="countDownDate !== null" 
                    :countDownDate="countDownDate"
                    :dealType="dealType"
                    :show="showCountDown" 
                  />
                </div>
              </div>

              <!-- deal products -->
              <div class="flex justify-between px-4 md:px-8 py-6 flex-wrap gap-4 max-h-96 overflow-y-scroll">
                <!-- -p-2 -->
                <div 
                  v-for="deal in deals" :key="deal.id"
                  class="p-2 md:p-4 md:rounded-lg bg-white md:h-32 relative md:flex"
                >
                  <!-- image -->
                  <img class="h-20 w-20 md:mr-4 bg-transparent" :src="url(deal.product.featured_image)" alt="">
                  
                  <!-- product details -->
                  <div class="md:w-48">
                    <p class="w-24 text-xs md:text-base">{{ deal.product.name }}</p>
                    <span class="mt-3 text-xs">{{ deal.product.unit_quantity}} {{deal.product.unit}} </span>
                  </div>
                  <!-- price -->
                  <div class="absolute md:flex right-0 bottom-0 md:p-3 gap-4">
                    <!-- amount -->
                    <div class="hidden md:flex items-end" >
                      <span class="px-1">at</span>
                      <span class="px-1 font-medium inline text-2xl text-cyan-600">
                        <HelperTkSymbol />
                        {{deal.product.price}}</span>
                    </div>
                  
                    <!-- discount percent -->
                    <div class="flex flex-col justify-center text-gray-100 text-center h-12 w-12 rounded-full bg-gradient-to-r from-red-700 to-orange-500 rotate-12">
                      <span v-if="deal.amount_type === 'Percentage'" class="text-lg">{{ deal.amount }}%</span>
                      <span v-else class="text-lg"><HelperTkSymbol />{{ deal.amount }}</span>
                      <span class=" -mt-1 text-xs">off</span>
                    </div>
                  </div>
                </div>
              </div>              
            </div>
        </div>
        <!-- previous deals -->
        <!-- <div class="w-full">
            previous deals
        </div> -->
      
    </div>   
    <loader :action="action" :active="loader" />
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    data() {
        return {
          action: '',
          loader: false,
          page: 0,
          openTab: 1
      }
    },
    async mounted() { 
      if (this.dailyDealsLength === 0) {
        await this.getDailyDeals();
      }   
      if (this.weeklyDealsLength === 0) {
        await this.getWeeklyDeals();
      }   
      this.setCountDownDate(this.dealType);
    },
	  computed: {
        ...mapState('deals', [
            'dailyDeals',
            'weeklyDeals',
            'countDownDate',
            'dealType'            
        ]),
        ...mapGetters('deals', [
          'dailyDealsLength',
          'weeklyDealsLength'
        ]),
        deals() {
          if (this.dealType === 'daily') {
            return this.dailyDeals;
          }         
          return this.weeklyDeals;
        },
        showCountDown() {
          if (this.dealType === 'daily') {
            return (this.dailyDealsLength > 0) ? true: false;
          }
          return (this.weeklyDealsLength > 0) ? true: false;
        }
    },
    methods: {   
      ...mapActions('deals', ['getDailyDeals', 'getWeeklyDeals', 'setCountDownDate', 'setDealType']),
       toggleTabs(tabNumber, type){
        // this.loader = true;      
        // this.dealType = type;
        this.setDealType(type);
        // this.page = 0;
        this.openTab = tabNumber;
        this.setCountDownDate(type);
       },
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