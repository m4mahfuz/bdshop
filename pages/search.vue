<template>
  <div class="container">      
    <div v-show="found === false" class="flex justify-center items-center gap-4 my-8 text-2xl text-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>
     Found nothing! 
    </div>

    <div v-show="found === true">
      <div class="text-xl border-b py-1 mb-4">
        <span class="font-bold text-2xl">{{ items.length }}</span> Items found!         
      </div>
      <div class="flex flex-wrap -mx-4">
        <div v-for="(product, index) in items" :key="index" class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4 md:mb-8">
          <ProductCard :product="product"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  // data() {
  //   return {
  //     // items: [ 'Apple', 'Banana', 'Orange', 'Mango', 'Pear', 'Peach', 'Grape', 'Tangerine', 'Pineapple'],
  //     items: [],
  //     links: {},
  //     isLoading: false,
  //   };
  // },
  // watch: {
  //   arrowCounter(value) {
  //     console.log('itL', this.items);
  //     if ( value === this.items.length - 1) {
  //       const url = this.links.next;
  //       this.fetchItems(url);
  //     }
  //   },
  // },
  computed: {
    ...mapState('search', ['items', 'found']),
  },
  methods: {
    // nextItems() {
    //     const url = this.links.next;
    //     this.fetchItems(url);
    // },
    // searchItems(query) {
    //   console.log('q', query);
    //   if (query === '') {
    //     this.items = [];
    //     return;
    //   }
    //   this.items = [];
    //   const url = `/search/items?q=${query}`;
    //   this.fetchItems(url);
      
      // this.isLoading = true;
      // await this.$axios
      //   // .$get(`/search/items?q=${query}`)
      //   .$get(url)
      //   .then(response => {
      //     this.items = response.data;
      //     this.links = response.links;
      //     this.isLoading = false;
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     this.isLoading = false;
      //   });
    // },
    // async fetchItems(url) {
    //   this.isLoading = true;
    //   await this.$axios
    //     .$get(url)
    //     .then(response => {
    //       // this.items = response.data;          
    //       this.items.push(...response.data);
    //       this.links = response.links;
    //       this.isLoading = false;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.isLoading = false;
    //     });
    // }
  }
}
</script>

<style>

</style>