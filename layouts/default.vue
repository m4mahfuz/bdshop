<template>
  <div id="app" class="md:container md:mx-auto px-4">
    <!-- <div class="p-2 bg-green-600 text-yellow-300 text-xs">Demo purpose only</div> -->
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
