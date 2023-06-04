<template>
  <div class="container">
    <div class="my-4 w-full mx-auto max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="text-2xl font-bold mb-4 text-gray-800 tracking-tight border-b">Order 
        <span class="text-sm font-semibold mt-2 text-red-500 float-right uppercase">: {{order.payment_method}} </span>
      </h5>
      <div class="flex flex-col justify-between items-center border-b">
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-green-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>

        <span class="mt-2 text-lg text-green-500">Payment Successfull!</span>
        <div class="mt-4 mb-4 p-4 w-full rounded bg-slate-200 text-gray-800 text-sm flex flex-col items-center">
          <p>Order No.: <span class="text-gray-500 font-medium">{{order.id}}</span></p>          
            <p class="mt-2">Est. Delivery: <span class="text-xs text-red-500">{{order.delivery_earliest}} to  {{order.delivery_latest}}</span></p>
            <p class="text-sm mt-2">Delivery: <span class="text-gray-500 text-xs uppercase">{{order.shipping_type}}</span></p>
          
          <div class="w-40 mx-auto">        
            <NuxtLink :to="`/orders/${order.id}`" class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-200 rounded-lg block w-full mt-3 px-2 py-1.5 text-center text-sm">
              View Order
            </NuxtLink>
          </div>
        </div>
      <!-- <div class="py-2 w-40">        
        <NuxtLink to="`/orders/${order.id}/`" class="border border-green-500 text-gray-900 hover:bg-green-600 hover:text-white rounded-full block w-full my-3 px-2 py-2 text-center">
          View Order
        </NuxtLink>
      </div> -->
      </div>
      <div class="mt-4 w-full mx-auto bg-slate-100">        
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
  layout: 'userDashboard',
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