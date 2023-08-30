<template>
  <div class="container">
    <div class="p-4 my-4 w-full mx-auto max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="text-2xl font-bold mb-4 text-gray-800 tracking-tight border-b">Order 
        <span class="text-sm font-semibold mt-2 text-red-500 float-right uppercase">: {{order.payment_method}} </span>
      </h5>
      <div class="flex flex-col justify-between items-center border-b">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-green-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      
        <span class="mt-2 text-lg text-green-500 text-center">Placecd Successfully</span>
        <div class="mt-4 mb-4 p-4 w-full rounded bg-slate-200 text-gray-800 text-sm flex flex-col items-center">
          <p>Order No.: <span class="text-gray-500 font-medium">{{order.id}}</span></p>          
            <p class="mt-2">Est. Delivery: <span class="text-xs text-red-500">{{order.delivery_earliest}} to  {{order.delivery_latest}}</span></p>
            <p class="text-sm mt-2">Delivery: <span class="text-gray-500 text-xs uppercase">{{order.shipping_type}}</span></p>
          
          <div class="w-full md:w-40 mx-auto">        
            <NuxtLink :to="`/orders/${order.id}`" class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-200 rounded-lg block w-full mt-3 px-2 py-1.5 text-center text-sm">
              View Order
            </NuxtLink>
          </div>
        </div>      
    </div>
      <div class="mt-4 w-full mx-auto">        
          <NuxtLink to="/" class="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-orange-900 font-medium rounded-lg text-sm block px-5 py-2.5 text-center uppercase">
            Continue shopping
          </NuxtLink>
      </div>    
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  // middleware: 'auth',
  layout: 'userdashboard',
  data() {
    return {
      slug: this.$route.params.order,
    }
  },
  async mounted() {
    console.log('order placed compo mounted', this.slug)    
    if (this.isEmptyOrder) {
      await this.getOrderBy(this.slug);
    }

  },
  computed: {
    ...mapState('orders', ['order']),
    ...mapGetters('orders', ['isEmptyOrder'])
  },
  methods: {
    ...mapActions('orders', ['getOrderBy'])
  }
}
</script>

<style>

</style>