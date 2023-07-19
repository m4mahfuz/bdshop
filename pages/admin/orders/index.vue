<template>
  <div>
    <div class="flex border-b border-gray-200 dark:border-gray-700">
      <button 
        @click.prevent="toggleTabs(1, 'received')" 
        class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
        :class="openTab == 1 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
      >
        New <span v-if="openTab == 1" class="text-gray-500 text-xs">({{pagination.total}})</span>
      </button>

      <button 
        @click.prevent="toggleTabs(2, 'processing')" 
        class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none"
        :class="openTab == 2 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
      >
          Processing <span v-if="openTab == 2" class="text-gray-500 text-xs">({{pagination.total}})</span>
      </button>

      <button 
        @click.prevent="toggleTabs(3, 'shipped')" 
        class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none"
        :class="openTab == 3 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
      >
          Shipped
          <span v-if="openTab == 3" class="text-gray-500 text-xs">({{pagination.total}})</span>
      </button>
      <button 
        @click.prevent="toggleTabs(4, 'Delivered')" 
        class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none"
        :class="openTab == 4 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
      >
          Delivered
          <span v-if="openTab == 4" class="text-gray-500 text-xs">({{pagination.total}})</span> 
      </button>
      <button 
        @click.prevent="toggleTabs(5, 'cancelled')" 
        class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none"
        :class="openTab == 5 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
      >
          Cancelled
          <span v-if="openTab == 5" class="text-gray-500 text-xs">({{pagination.total}})</span> 
      </button>
      <button 
        @click.prevent="toggleTabs(6, 'all')" 
        class="h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap cursor-base focus:outline-none"
        :class="openTab == 6 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
      >
          All
          <span v-if="openTab == 6" class="text-gray-500 text-xs">({{pagination.total}})</span>
      </button>
    </div>    
    <div class="my-2 flex flex-col">
        <div v-if="pagination.total > 0">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
            <th scope="col" class="px-4 py-3">
            Order# 
            </th>
            <th scope="col" class="px-4 py-3">
            Placed On
            </th>
            <th scope="col" class="px-4 py-3">
            Customer Name
            </th>
            <th scope="col" class="px-4 py-3">
            Contact
            </th>
            
            <th scope="col" class="px-4 py-3">
              Amount
            </th>  
            <th scope="col" class="px-4 py-3">
              Status
            </th>  
            <th scope="col" class="px-4 py-3">
              Payment Method
            </th>  
            <th scope="col" class="px-4 py-3">
              <span class="sr-only">Action</span>
            </th>
            </tr>
            </thead>
            <tbody>
            <tr 
              v-for="order in orders" 
              :key="order.id"
              class="border-b odd:bg-white even:bg-gray-50"
            >
            <td scope="row" class="px-6 py-4 whitespace-nowrap">
                <button
                  type="button"
                  @click.prevent="showDetailsOf(order)"                  
                  class="text-cyan-500 font-medium cursor-pointer"
                >{{order.id}}
                </button>
            </td>
            <td class="px-4 py-4">
              {{order.placed_on}}
            </td>
            <td class="px-4 py-4">
              {{order.user.name}}
            </td>
            <td class="px-4 py-4">
              <p>{{order.user.phone}}</p>                
              <p>{{order.user.email}}</p>                
            </td>            
            <td class="px-4 py-4 font-semibold">
              <HelperTkSymbol text="text-sm" />
              {{parseInt(order.net_total)}}
            </td>  
            <td class="px-4 py-4">
              <span class="rounded-full px-2 py-1 text-xs text-white"
              :class="bgColorBy(order.status)"
              >{{order.status}}</span>              
            </td>  
            <td class="px-4 py-4">
              {{order.payment_method}}
            </td>  
            <td class="px-4 py-2">
              <button type="button" @click.prevent="showDetailsOf(order)"> 
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>        
              <button v-if="order.status === 'Shipped' || order.status === 'Delivered'" type="button" @click.prevent="invoice(order)">                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>

              </button>        
            </td>
            </tr>
            </tbody>
            </table>
          </div>
          <loader :action="action" :active="loader" />            
          <div class="my-4">
            <Pagination :pagination="pagination" @paginate="handlePagination" :offset="offset" />
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions} from "vuex";
export default {
  layout: 'dashboard',
  data() {
    return {
      action: 'loading',
      loader: false,
      offset: 4,
      openTab: 1,
      orderStatus: 'received',
    }
  },
  async mounted() {
    if (!this.pagination.current_page) {
      this.loader = true;
      await this.fetchOrders('/admin/orders/received');      
      this.loader = false;
    }
    const openTab = localStorage.getItem('openTabNumber')
    if (openTab !== null) {
      const orderStatus = localStorage.getItem('orderStatus');
      const updatedOrderStatus = localStorage.getItem('updatedOrderStatus');
      if (orderStatus !== updatedOrderStatus) {
        this.toggleTabs(openTab, orderStatus);
      } else {
        this.openTab = openTab;
        this.orderStatus = orderStatus;
      }
      localStorage.removeItem('openTabNumber');
      localStorage.removeItem('orderStatus');
      localStorage.removeItem('updatedOrderStatus');
    }
  },    
  computed: {
    ...mapState('orders', ['orders', 'pagination']),
    ...mapGetters('orders', ['bgColorBy','validProducts', 'cancelledProducts']),            
  },
  methods: {
    ...mapActions('orders', ['fetchOrders']),    
    saveToLocalStorage(order) {
      localStorage.setItem('orderToView', JSON.stringify(order));
      localStorage.setItem('openTabNumber', this.openTab);
      localStorage.setItem('orderStatus', this.orderStatus);
    },
    showDetailsOf(order) {      
      this.saveToLocalStorage(order);
      this.$router.push(`/admin/orders/${order.id}`);
    },
    invoice(order) {
      this.$router.push(`/orders/${order.uuid}/invoice`);
    },
    url(image) {        
        let path = `/storage/images/products/small/${image}`;
        return `${this.$config.baseURL}${path}`;      
    },    
    async toggleTabs(tabNumber, status){
      this.openTab = tabNumber;
      this.orderStatus = status;
      this.loader = true;      
      if (status === 'all') {
        await this.fetchOrders(`/admin/orders`);
      } else {
        await this.fetchOrders(`/admin/orders/${status}`);
      }
      this.loader = false;
    },
    handlePagination(page) {
      let current_page = page;
      let pageNumber = current_page?? 1;
      
      if (this.orderStatus === 'all') {
        let url = `/admin/orders/?page=${pageNumber}`;
        this.fetchOrders(url);
        return;  
      }
      let url = `/admin/orders/${this.orderStatus}?page=${pageNumber}`;
      this.fetchOrders(url);
    }
  }
}
</script>