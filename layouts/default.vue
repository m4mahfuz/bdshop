<template>
  <div id="app" class="md:container md:mx-auto px-4">
    <div class="mt-2 px-4 p-2 bg-gradient-to-r from-green-300 text-white text-xs rounded-sm">Demo purpose only</div>
    <Header />
      <Nuxt/>
    <Footer/>
  </div>
</template>

<script>
export default {
  name: "default",
}
</script>

<style scoped>
  #app {
        transition: margin-right .5s;
        /* padding: 16px; */
    }
</style>
