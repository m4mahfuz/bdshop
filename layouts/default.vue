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
  head() {
    return {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
      ],
      meta: [
        { property: 'og:title', content: 'BengalShop- Online Grocery Store' },
        { property: 'og:description', content: 'Browse a wide selection of fresh fruits, vegetables, dairy, and more at BengalShop, your reliable online grocery store.'
        },
        { property: 'og:image', content: 'https://bengalshop.online/_nuxt/img/logo.4987c6a.png' },
        { property: 'og:url', content: 'https://bengalshop.online' },
        { property: 'og:type', content: 'website' }
      ],
    };
  }
};
</script>

<style scoped>
  #app {
        transition: margin-right .5s;
        /* padding: 16px; */
    }
</style>
