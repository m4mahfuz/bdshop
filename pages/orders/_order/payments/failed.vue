<template>
  <h1>
    Payment Failed!
    {{order.id}}
  </h1>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    layout: 'userDashboard',
    // middleware: 'auth',
  data() {
    return {      
    }
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