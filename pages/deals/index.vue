<template>
  <section class="container">
    <div class="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
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

    <!-- <div id="tabContent" class="my-2 flex bg-red-200">
        <div :class="{'hidden': openTab !== 1, 'block': openTab === 1}">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Daily            
          </div>
        </div>
        <div :class="{'hidden': openTab !== 2, 'block': openTab === 2}">
          <div class="text-sm text-gray-500 dark:text-gray-400">Weekly            
          </div>
        </div>
    </div> -->
    <div class="pb-2 flex flex-col justify-center items-center my-2 rounded-lg">
        <!-- deal header -->
        <div class="w-full px-8 py-8 h-min-72 bg-gradient-to-r from-sky-200 to-green-100 rounded">
            <!-- title -->
            <div class="mb-2 text-2xl text-cyan-700 capitalize">
              {{dealType}} deals
            </div>
            <!-- header body -->
            <div class="flex flex-col">
              <!-- deal details -->
              <div class="flex px-8 py-6 gap-4">
                <p class="mt-1 text-sm text-gray-700">Get exciting deals everyday.<br> Grab before stock runs out.</p>
                <div class="flex">             
                  <CountDownTimer v-if="countDownDate !== null" 
                    :countDownDate="countDownDate"
                    :dealType="dealType" 
                  />
                </div>
              </div>

              <!-- deal products -->
              <div class="flex justify-between px-8 py-6 flex-wrap gap-4 bg-yellow-100 max-h-96 overflow-y-scroll">
                <!-- -p-2 -->
                <div 
                  v-for="deal in deals" :key="deal.id"
                  class="p-4 rounded-lg bg-white h-32 relative flex"
                >
                  <!-- image -->
                  <img class="h-20 w-20 mr-4 bg-transparent" :src="url(deal.product.featured_image)" alt="">
                  
                  <!-- product details -->
                  <div class="w-48 bg-red-100">
                    <p>{{ deal.product.name }}</p>
                    <span class="mt-3 text-xs">{{ deal.product.unit_quantity}} {{deal.product.unit}} </span>
                  </div>
                  <!-- price -->
                  <div class="absolute flex right-0 bottom-0 p-3 gap-4">
                    <!-- amount -->
                    <div class="flex items-end" >
                      <span class="px-1">at</span>
                      <span class="px-1 font-medium inline text-2xl text-cyan-600">
                        <HelperTkSymbol />
                        {{deal.product.price}}</span>
                    </div>
                  
                    <!-- discount percent -->
                    <div class="flex flex-col justify-center text-gray-100 text-center h-12 w-12 rounded-full bg-gradient-to-r from-red-700 to-orange-500 rotate-12">
                      <span class="text-xl">{{ deal.amount }}%</span>
                      <span class=" -mt-1 text-xs">off</span>
                    </div>
                  </div>
                </div>
              </div>              
            </div>
        </div>
        <!-- previous deals -->
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
          countDownDate: null,
          dealType: 'daily',
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
        ]),
        ...mapGetters('deals', [
          'dailyDealsLength',
          'weeklyDealsLength'
        ]),
        deals() {
          if (this.dealType === 'daily') {
            // if (this.dailyDealsLength > 0) {
            //   this.countDownDate = this.dailyDeals[0].ending;
            // }
            return this.dailyDeals;
          }
          // if (this.weeklyDealsLength > 0) {
          //     this.countDownDate = this.weeklyDeals[0].ending;
          //   }
          return this.weeklyDeals;
        }
    },
    methods: {   
      ...mapActions('deals', ['getDailyDeals', 'getWeeklyDeals']),
       toggleTabs(tabNumber, type){
        // this.loader = true;      
        this.dealType = type;
        // this.page = 0;
        this.openTab = tabNumber;
        this.setCountDownDate(type);
       },
       setCountDownDate(dealType) {
        if (dealType === 'daily' && this.dailyDealsLength > 0) {
          this.countDownDate = this.dailyDeals[0].ending;
          return;
        }
        if (this.weeklyDealsLength > 0) {
          this.countDownDate = this.weeklyDeals[0].ending;
          return;
        }
        this.countDownDate = null;
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

<style>

</style>