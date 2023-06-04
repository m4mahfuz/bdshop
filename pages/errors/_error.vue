<template>
  <div class="bg-gradient-to-r from-purple-300 to-blue-200">
    <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
        <div class="border-t border-gray-200 text-center pt-8">
        <h1 class="text-9xl font-bold text-purple-400">{{$route.params.error}}</h1>
        <h1 class="text-4xl font-medium px-6 py-8 text-red-400 uppercase">
          <span v-if="has('statusText')">{{get('statusText')}}</span>
          <span v-else>Unauthorized!</span>
        </h1>

        <p v-if="has('message')" class="text-2xl pb-8 px-12 font-medium"> Oops! {{get('message')}}</p>
        <p v-else class="text-2xl pb-8 px-12 font-medium">It seems, you don't have permission to access this page.</p>

        <!-- <nuxt-link :to="linkTo"> -->
        <button @click="linkTo()" class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
        HOME
        </button>
        <!-- </nuxt-link>   -->
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  layout: 'customError',
  mounted() {
    console.log(this.$route.params.error)    
    console.log(this.errors)    
  },
  methods: {
    ...mapActions('errors', ['resetErrors']),
    linkTo() {
      this.resetErrors();
      if (this.$auth.$state.strategy === 'admin') {
        this.$router.push('/admin/dashboard');
        return; 
      }
      this.$router.push('/');
    }
  },
  computed: {
    ...mapState('errors', [
      'errors',
    ]),
    ...mapGetters('errors', [
      'has',
      'get',
      'any'
    ]),    
  }
}
</script>