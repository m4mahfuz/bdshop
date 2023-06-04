<template>
    <div class="container py-5 bg-slate-100">
        <h1>
            Order placed successfully!
            <!-- {{order.id}} -->
              <!-- postdata="your javascript arrays or objects which requires in backend" -->
              <!-- order="If you already have the transaction generated for current order" -->
        </h1>
              <!-- postData="postData" -->
            <!-- <button 
              type="button" 
              id="sslczPayBtn"
              order=1,
              endpoint="http://localhost:81/api/payments"
              > Pay Now            
            </button> -->
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  middleware: 'auth',
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
    // url() {
    //   return `${this.$config.baseURL}/api/payment`;
    // }
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