<template>
  <div id="app" class="md:container md:mx-auto px-4">
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
