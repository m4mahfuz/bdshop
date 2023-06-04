<template>
  <section class="container">
    <div class="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
      <button 
        @click.prevent="toggleTabs(1, 'daily')"
        class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
        :class="openTab == 1 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
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
        <div class="w-full p-6 grid grid-cols-6 gap-4 h-72 bg-gradient-to-r from-sky-200 to-green-100 rounded">
            <div class="grid col-span-4">
                <div class="bg-white">
                    <span class="text-2xl text-cyan-700 capitalize">
                      {{dealType}} deals
                    </span>
                <p class="mt-1 text-xs text-gray-700">Get exciting deals everyday. Grab before stock runs out.</p>
                </div>
            </div>
            <div class="grid col-span-2">
                <span class="bg-red-200">Product</span>
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
          dealType: 'daily',
          loader: false,
          page: 0,
          openTab: 1
      }
    },
    mounted() {    
    },
	  computed: {
        ...mapState('deals', [
            'dailyDeals',
            'weeklyDeals',            
        ]),         
    },
    methods: {   
       toggleTabs(tabNumber, type){
        // this.loader = true;      
        this.dealType = type;
        // this.page = 0;
        this.openTab = tabNumber;
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