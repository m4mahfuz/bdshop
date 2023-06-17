<template>
  <!-- <div id="app"> -->
  <div id="app" class="md:container md:mx-auto px-4">
    <Header/>
      <Nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  name: "default",
  components: {Footer, Header}
}
</script>

<style scoped>
  #app {
        transition: margin-right .5s;
        /* padding: 16px; */
    }
</style>
