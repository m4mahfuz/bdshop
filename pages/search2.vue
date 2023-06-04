<template>
  <div  class="container">
    <auto-search v-on:search="searchItems" />
    <ul v-if="isLoading">
        <li>Loading...</li>
    </ul>
    <ul v-else>
      <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
// import AutoSearchComponent from './AutoSearchComponent.vue';
// import axios from 'axios';

export default {
  data() {
    return {
      filteredItems: [],
      isLoading: false,
    };
  },
  methods: {
    searchItems(query) {
      this.isLoading = true;
      this.$axios
        .$get(`https://your-api-server.com/items?q=${query}`)
        .then(response => {
          this.filteredItems = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        });
    },
  },
  // components: {
  //   AutoSearchComponent,
  // },
};
</script>
