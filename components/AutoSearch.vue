<template>
    <form @submit.prevent="submitSearch">
        <input 
            type="text"
            v-model="searchQuery" 
            placeholder="Search..."
            class="rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            @keyup="searchItems" 
        />        
        <button type="submit" class="px-8 py-1.5 border border-green-500 rounded-md">Search</button>

        <ul v-if="isLoading">
            <li>Loading...</li>
        </ul>
        <ul v-else>
          <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
        </ul>
    </form>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      items: [],
      isLoading: false
    }
  },
  computed: {
    filteredItems() {
      console.log(this.items);
      if (!this.items || this.items.length === 0) return;
      return this.items.filter(item => {
        return item.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1;
      });
    },
  },

  methods: {
    submitSearch() {
      this.$emit('search', this.searchQuery);
    },
    searchItems() {
      this.isLoading = true;
      this.$axios
        .$get(`/search/items?q=${this.searchQuery}`)
        .then(response => {
          // this.items = response.data;
          this.items = response;
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        });
    },
  },
};
</script>
