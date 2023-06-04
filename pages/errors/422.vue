<template>
  <div class="bg-gradient-to-r from-purple-300 to-blue-200">
    <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
        <div class="border-t border-gray-200 text-center pt-8">
        <h1 class="text-9xl font-bold text-purple-400">422</h1>
        <h1 class="text-4xl font-medium px-6 py-8 text-red-400">Unauthorized!</h1>
        <p class="text-2xl pb-8 px-12 font-medium">It seems, you don't have permission to access this page.</p>
        <nuxt-link :to="linkTo">
          <button class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
          HOME
          </button>
        </nuxt-link>  
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  layout: 'customError',
  mounted() {
    console.log('422')    
  },
  computed: {
    linkTo() {
      if (this.$auth.$state.strategy === 'admin') {
        return '/admin/dashboard';
      }
      return '/';
    }
  }
}
</script>