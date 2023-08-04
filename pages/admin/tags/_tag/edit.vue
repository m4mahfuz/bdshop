<template>    
  <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 
          class="pb-2 text-lg text-gray-400 capitalize dark:text-white border-b border-orange-100"            
      >
          <span 
              class="border-b-4 border-orange-400 pb-2 pr-1"
          > 
              Edit Tag
          </span>

      </h2>
      <form autoComplete="off" class="mt-8">
          <div class="flex justify-center gap-4">
            <div class="basis-1/2">
              <div class="mb-4">
                  <label for="categoryLevel" class=" text-gray-600 dark:text-gray-400 text-sm">Select Category</label>
                  <select 
                      v-model="tag.category" id="categoryLevel" 
                      class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                      <option disabled value="">Please select one</option>
                      <optgroup 
                          v-for="category in categories" :key="category.id" 
                          :label="category.name"
                      >
                          <option v-for="child in category.children" :key="child.id" :value="child.id"
                          disabled
                          >                           
                          {{ child.name }}                            
                          </option> 
                      </optgroup>                   
                  </select>                    
              </div>                
                              
              <div>
                  <label class="text-gray-600 dark:text-gray-200 text-sm" for="name">Name</label>
                  <input 
                      v-model="tag.name"
                      id="name" 
                      type="text" 
                      class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-yellow-50 border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring"
                      :class="[has('name') ? 'border-pink-600 text-pink-600 focus:border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-300']"
                      placeholder="Enter product name"
                  >
                  <p 
                    class="mb-2 text-pink-600 text-sm" 
                    v-if="has('name')"
                    v-text="get('name')"
                  ></p>
              </div>
            </div>
            <div class="basis-1/2 border rounded-md p-2">
              <h1 v-show="tags.length < 1" class="text-gray-400 font-semibold">Available Tags</h1>
              <span 
                v-for="(tag, index) in tags" 
                :key="index" 
                class="
                  ml-1 first:ml-0 
                  after:content-[','] 
                  last:after:content-['\0020']
                "
              >
                {{tag.name}}
              </span>
            </div>
              
          </div>

          <div class="my-8 flex justify-between">
            <div>
              <button @click.prevent="back()" class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Back</button>
            </div>
            <div class="flex gap-4">
                  <button @click.prevent="reset()" type="button" class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Reset</button>
                  <button @click.prevent="update(tag)" type="button" :disabled="!isValid" class="px-10 py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 disabled:bg-orange-300">Update</button>
              </div>
          </div>
      </form>
      <loader action="updating" :active="loader" />            
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  layout: 'dashboard',
  head() {
      return {
          title: 'Add Tag',            
      }
  },
  data() {
      return {            
          prevTag: '',
          tag: {
              id: '',
              name: '',    
              slug: '',            
              category: '', 
              active: true,                 
          },            						
          loader: false,
      }
  },    
  mounted() {
    this.getCategories();
    this.setTag();
  },        
  watch:{
      'tag.category'(value) {
          if (value !== '') {
            this.getTagsByCategory(`/admin/tags/categories/${value}`);
          }
      }
  },
  computed: {
      ...mapState('categories', [
          'categories',
      ]),                
      ...mapState('tags', ['tags']),
      ...mapGetters('errors', [
          'has',
          'get',
          'any'
      ]),
      
      isValid() {            
          return (this.tag.name !== '' &&
          this.tag.category !== '',
          this.tag.name !== this.prevTag.name 
          ) ? true : false;
      },
  },
  methods: {
      ...mapActions('categories', [
          'getCategories',
      ]),   
      ...mapActions('tags', [
          'getTagsByCategory',
          'replaceTag'
      ]),   
      ...mapActions('errors', ['setErrors']),
      setTag() {        
        const tag = JSON.parse(localStorage.getItem('tag'));        
        this.prevTag = tag;
        this.fillupFormByFound(tag);
      },
      fillupFormByFound(tag) {
        this.tag.id = tag.id;
        this.tag.active = true;
        this.tag.category = tag.category.id;
        this.tag.name = tag.name;
      },
      back() {
        this.$router.back();
      },
      update(tag) {
          this.loader = true;
          this.tag.slug = tag.name;            
          
          this.$axios.$patch(`/admin/tags/${this.prevTag.slug}`, tag)
          .then(response => {
            this.replaceTag({old: this.prevTag.name, new: this.tag.name} )
              this.loader = false;
              this.$toast.info('Tag Updated');
              this.updateRoute(response.data);              
              // this.reset();
              // this.tag.name = '';
              // this.tag.slug = '';
          })
          .catch(error => {                
              this.loader = false;
              this.setErrors(error.response.data.errors);
          })            
      },
      updateRoute(tag) {
        this.prevTag.name = tag.name;
        this.prevTag.slug = tag.slug;
        localStorage.setItem('tag', JSON.stringify(this.prevTag));
        this.$router.push(`/admin/tags/${tag.slug}/edit`)              
      },
      reset() {
         this.tag.name = this.prevTag.name;
      }        
  }
}
</script>