<template>

  <div class="container">
    <h3 class="text-2xl mb-4 text-red-500">Order</h3>
    <div class="flex flex-col justify-between items-center border-b">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-green-600">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      </span>
      <span class="mt-2 text-lg text-green-500">Placecd Successfully</span>
      <span class="mt-8">Order No. {{order.id}} 2214</span>
      <div class="py-2 w-40">        
        <NuxtLink to="`/orders/${order.id}/`" class="border border-green-500 text-gray-900 hover:bg-green-600 hover:text-white rounded-full block w-full my-3 px-2 py-2 text-center">
          View Order
        </NuxtLink>
      </div>
    </div>
    <div class="py-2 w-64 mx-auto">        
        <NuxtLink to="`/orders/${order.id}/`" class="bg-orange-500 text-gray-900 hover:bg-orange-600 hover:text-white rounded-full block w-full my-3 px-2 py-2 text-center uppercase">
          Continue shopping
        </NuxtLink>
      </div>    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  middleware: 'auth',
  data() {
    return {}
  },
  mounted() {
    console.log('order placed compo mounted')    
  },
  computed: {
    ...mapState('orders', ['order']),
  }

}
</script>

<style>

</style>