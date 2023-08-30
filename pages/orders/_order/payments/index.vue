<template>
    <div>
      <h3 class="text-2xl font-bold mb-8 border-b border-green-100 pb-2">
        <span class="border-b-4 border-green-400 pb-1 pr-1">Order</span> 
      </h3>
      <div class="bg-slate-100 px-4 py-4 rounded flex flex-col justify-center items-center space-y-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-green-600">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
        </svg>
        <h1 class="capitalize text-2xl text-center">placed successfully!</h1>
        <div class="bg-green-100 text-sm w-full p-2 rounded">
          <p>Order: # {{order.id}} </p>
          <p>Amount: {{order.net_total}}</p>          
        </div>
        <button v-if="showButton(order)" type="button" @click.prevent="pay" class="bg-red-500 text-gray-800 font-medium hover:text-white hover:bg-red-600  w-full px-4 py-1.5 rounded-md uppercase">Pay Now</button>
      </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: 'userdashboard',
  data() {
    return {      
    }
  },
  mounted() {
    console.log('Payment process mounted')

  },
  computed: {
    ...mapState('orders', ['order']),
  },
  methods: {    
    showButton(order) {
      return (order?.payment_method ==='Prepaid')?? false;
    },
    async pay() {
      let data = {
        // order: this.order.id,
        order: this.$route.params.order,
        // total: '',
        // net_total: ''
      }
      await this.$axios.$post('/payments', data)
      .then(response=>{
        // console.log(response);
        if (response.status === 'success') {
          window.location.href = response.data;
        }
      })
      .catch(error=>{
        console.log(error);
      });
    }    
  }
}
</script>

<style>
  #sslczPayBtn::before, #sslczPayBtn::after {
    content: none !important;
  }
  #sslczPayBtn {
    padding: 0 !important;
    width: 128px !important;
  }
  
</style>