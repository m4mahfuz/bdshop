<template>
  <div class="autocomplete relative">
    <div class="relative flex items-center">
      <span class="pointer-events-none absolute left-0 py-2 flex items-center px-3 border border-r-0 rounded-l-md bg-gray-100 text-gray-600 sm:text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </span>
    <input
      v-model="search"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      @keydown.esc="isOpen = false"
      type="text"
      class="rounded-md border-gray-300 px-14 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    />
    <button 
      v-if="search !== ''"
      class="absolute right-0 mr-2 py-2 text-gray-500 hover:text-red-500 cursor-pointer"
      @click.prevent="clearSearch"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    </div>
    <ul      
      v-show="isOpen"
      class="autocomplete-results px-2 py-1 m-0 border border-gray-100 bg-slate-100 h-64 overflow-y-auto rounded-md"
    >
      <li
        v-if="isLoading"
        class="loading"
      >
      <div class="flex items-center px-2 py-2">
        <svg class="animate-spin mr-3 h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading...
      </div>
      </li>
      <li
        v-else
        v-for="(result, i) in items"
        :key="i"
        @click.prevent="setResult(result)"
        class="autocomplete-result list-none text-left px-1 py-1.5 cursor-pointer hover:text-white hover:bg-sky-600"
        :class="{ 'active': i === arrowCounter }"
        ref="options"        
      >
        {{result.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchAutocomplete',
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },    
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      search: '',    
      isOpen: false,
      isLoading: false,
      arrowCounter: -1
    };    
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    console.log('rNamee', this.$route.name);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },
   watch: {
      isAsync(value) {
        if (value) {
          this.isOpen = true
          this.isLoading = true;
          return;
        }
        this.isLoading = false;                 
      },      
      'items.length'(value) {
        console.log('itemsL', value);
        if (value === 0) {
          this.isOpen = false;
          if (this.search !== '') {
            this.$emit('found', false);    
          }
          return;
        }
        this.isOpen = true;
        this.$emit('found', true);    
        if(this.$route.name !== 'search') {
          this.$router.push('/search');
        }
      },
      arrowCounter(value) {
        console.log('itL', this.items.length);
        if ( value === this.items.length - 1) {
          this.$emit('next');  
        }
      },
    },
  
  methods: {
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.arrowCounter = -1;
          this.isOpen = false;
        }
      },
      onArrowDown() {        
        if (this.arrowCounter < this.items.length - 1) {
          this.arrowCounter = this.arrowCounter + 1;
          this.fixScrolling();
        }
      },
      onArrowUp() {
        if (this.arrowCounter > 0) {
          this.arrowCounter = this.arrowCounter - 1;
          this.fixScrolling();
        }
      },
      fixScrolling() {
         this.$refs.options[this.arrowCounter].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      },
      onEnter() {
        if (this.arrowCounter === -1) { 
          return;
        }
        this.search = this.items[this.arrowCounter].name;
        this.arrowCounter = -1;
        this.isOpen = false;
      },
      setResult(result) {
        this.search = result.name;
        this.isOpen = false;
      },      
      clearSearch() {
        this.search = '';
        this.$emit('search', this.search);
      },
      onChange() {
        this.$emit('search', this.search);
        this.isOpen = true;
        if (this.isAsync) {
          this.isLoading = true;
          return;
        }
      }
  }
};
</script>
<style scoped>
.active {
  background-color: #0284BE;
  color: white;
}
</style>