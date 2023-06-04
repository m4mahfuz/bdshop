<template>
  <div>
    <h3 class="text-2xl font-bold mb-8 border-b border-green-100 pb-2">
      <span class="border-b-4 border-green-400 pb-1 pr-1">Order List</span> 
    </h3>
    <div class="flex border-b border-gray-200 dark:border-gray-700">
      <button 
        @click.prevent="toggleTabs(1)" 
        class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
        :class="openTab === 1 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
      >
          All
      </button>

      <button 
        @click.prevent="toggleTabs(2)" 
        class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none"
        :class="openTab === 2 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
      >
          To Ship
      </button>

      <button 
        @click.prevent="toggleTabs(3)" 
        class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none"
        :class="openTab === 3 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
      >
          To Receive
      </button>
    </div>    
    <div class="my-2 flex flex-col">
        <div v-if="openTab === 1">
          
          <ul class="space-y-4">
            <li v-for="order in orders" :key="order.id">              
              <!-- <template> -->
                <div class="px-8 py-4 bg-slate-100 rounded shadow-md">
                  <div class="flex items-center justify-between border-b pb-2">
                      <span class="text-gray-600">
                        Order: 
                        <nuxt-link :to="`/orders/${order.id}`" class="text-cyan-500 font-medium">
                          #{{order.id}}
                        </nuxt-link>
                        <p  class="text-sm font-light text-gray-600">Placed on <span class="font-medium"> {{order.placed_on}} </span></p>
                      </span>

                      <nuxt-link 
                        :to="`/orders/${order.id}`"
                        v-if="order.status==='Received' || order.status==='Delivered'" class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabindex="0" role="button">Manage
                      </nuxt-link>
                  </div>

                  <div 
                    v-for="product in order.products" :key="product.id"   class="my-2 py-1 text-gray-500 text-sm grid grid-cols-12 gap-1"
                  >
                    <div class="col-span-6 flex">
                      <span class="w-16">
                        <img :src="url(product.featured_image)" alt="image">   
                      </span>
                      <span class="px-1">
                        {{product.pivot.name}}
                        <p>
                          {{product.unit_quantity}} {{product.unit}}
                        </p>
                      </span>
                    </div>                   
                    <div class="col-span-2 justify-self-center">
                      <span class="text-gray-400">Qty:</span> {{product.pivot.quantity}}
                    </div>                   
                    <div class="col-span-2 justify-self-center">
                      <span class="rounded-full px-2 py-1 text-xs text-white"
                      :class="bgColorBy(order.status)"
                      >{{order.status}}</span>
                    </div>
                    <div class="col-span-2 justify-self-center text-xs"><span v-if="order.status === 'Delivered'">Delivered On {{order.delivered_on}}</span></div>                   
                  </div>
                </div>
              <!-- </template> -->
            </li>
          </ul>
          <div class="my-4">
            <Pagination :pagination="pagination" @paginate="handlePagination" :offset="offset" />
          </div>
        </div>
        
        <div v-if="openTab === 2">Tab 2</div>
        <div v-if="openTab === 3">Tab3</div>     

      </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions} from "vuex";
export default {
  layout: 'userDashboard',
  data() {
    return {
      offset: 4,
      // orders: [],
      // pagination: {},      
      openTab: 1
    }
  },
  async mounted() {
    if (!this.pagination.current_page) {
      await this.fetchOrders();
    }
  },    
  computed: {
    ...mapState('orders', ['orders', 'pagination']),
    ...mapGetters('orders', ['bgColorBy'])
  },
  methods: {
    ...mapActions('orders', ['fetchOrders']),
    url(image) {        
      let path = `/storage/images/products/small/${image}`;
        
        if (typeof image === 'object' && image !== null) {
          path = `/storage/images/products/small/${image.name}`;
        }
          console.log(path)

        return `${this.$config.baseURL}${path}`;      
    },
    toggleTabs(tabNumber){
      this.openTab = tabNumber;
    },
    handlePagination(page) {
      let current_page = page;
      let pageNumber = current_page?? 1;

      let url = `/orders?page=${pageNumber}`;
      this.fetchOrders(url);
    }
  }
}
</script>