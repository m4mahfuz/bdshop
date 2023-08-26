<template>
  <!-- <nuxt-link to="/" class="flex font-size-32 font-medium items-center"> -->
  <nuxt-link :to="linkTo" class="flex items-center text-xl md:text-2xl font-medium">
    <img class="mr-3" src="~/assets/img/logo.png" alt="">
    <span 
      v-if="logoText"
      class="bg-gradient-to-r from-cyan-500 to-lime-500 text-transparent bg-clip-text"
    >Bengal shop
    </span>
  </nuxt-link>
</template>

<script>
export default {
  name: "Logo",
  props: {
    logoText:{
      type: Boolean,
      default: true
    },
    linkTo:{
      type: String,
      default: '/'
    },
  }
}
</script>

<style scoped>

</style>
