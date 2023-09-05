<template>
  <nuxt-link :to="linkTo" class="flex items-center text-xl md:text-2xl font-medium">
    <!-- <img class="mr-3" src="~/assets/img/logo.png" alt=""> -->
    <img class="w-24 h-24" src="~/assets/img/logo.svg" alt="">
    <span 
      v-if="logoText"
      class="bg-gradient-to-r from-green-500 to-orange-500 text-transparent bg-clip-text"
    >Bengal Shop
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