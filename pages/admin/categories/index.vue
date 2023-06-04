<template>
  <section>
    <div class="px-4 py-4 flex justify-end items-center bg-slate-50 mb-2 rounded-lg">
	 	<!-- <span class="text-sm">Categories: <span class="font-semibold text-blue-600">{{categoriesFlat.length}} </span></span> -->
      <nuxt-link to="/admin/categories/add" class="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-white text-sm">Add Category</nuxt-link>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" class="px-4 py-3">
        Icon
      </th>
      <th scope="col" class="px-6 py-3">
      Name
      </th>
      <th scope="col" class="px-4 py-3">
      Description
      </th>
      <th scope="col" class="px-4 py-3">
        Image
      </th>
      <th scope="col" class="px-4 py-3">
        Parent
      </th>  
      <th scope="col" class="px-4 py-3">
        Active
      </th>  
      <th scope="col" class="px-4 py-3">
        <span class="sr-only">Action</span>
      </th>
      </tr>
      </thead>
      <tbody>
      <tr 
        v-for="(category, index) in categoriesFlat" class="border-b odd:bg-white even:bg-gray-50"
        :key="index"
      >
      <td class="px-2 py-4">
        <img class="w-16" :src="url(category.icon, 'icon')" :alt="category.name">
      </td>
      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            <!-- :to="`/admin/categories/${category.slug}`" -->
          <nuxt-link
            :to="`/admin/categories/${category.slug}`"
          >{{category.name}}
          </nuxt-link>
      </td>
      <td class="px-4 py-4">
        {{category.description}}
      </td>
      <td class="px-2 py-4">
        <img class="w-16" :src="url(category.image)" :alt="category.name">
      </td>
      <td class="px-4 py-4">
        {{category.parent}}
      </td>
      <td class="px-4 py-4">
          <ToggleInput 
            :item="category" 
            :status="category.active" 
            @toggleInput="handleToggleInput"
          />
      </td>  
      <td class="px-4 py-2">
        <button type="button" @click.prevent="edit(category)"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button type="button" @click.prevent="remove(category)"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>        
      </td>
      </tr>
      </tbody>
      </table>
    </div>
    <loader :action="action" :active="loader" />
  </section>
</template>

<script>
import swal from 'sweetalert';
import { mapState, mapGetters, mapActions } from "vuex";
import Loader from '../../../components/Loader.vue';
import ToggleInput from '../../../components/ToggleInput.vue';

export default {
  components: { ToggleInput, Loader },
    layout: 'dashboard',
    data() {
        return {
          action: '',
          loader: false,
        }
    },
    async mounted() {
      this.loader = true;
      await this.getCategories();
      this.loader = false;
      // this.$nextTick(() => console.log(this.flatCategories) 
      // )      
    },
    computed: {
        ...mapState('categories', [
            'categories',
            'categoriesFlat'
        ]),
        // ...mapGetters('categories', [
        //   'flatCategories'
        // ])
    },
    methods: {
        ...mapActions('categories', [
            'getCategories',
            'deleteFromStoreCategories',
          'deleteCategory'		
        ]),
      edit(category) {
        this.action = 'updating';
        localStorage.setItem('category', JSON.stringify(category))
        this.$router.push(`/admin/categories/${category.slug}/edit`)
      },
      remove(category) {
        swal({
            title: "Are you sure?",
            text: `This '${category.name}' category will be deleted!`,
            icon: "error",                 
            dangerMode: true,
            buttons: {
              cancel: "cancel",
              confirm: {
              text: "Delete It!",
              value: true,
              },                                
            },
          })
          .then(async (value) => {
            if (value) {
              this.action = 'deleting';
              this.loader = true;					
              // await this.deleteCategory(category);
              // 
                this.$axios.$delete(`/categories/${category.slug}`)
                .then(response => {
                  this.deleteFromStoreCategories(category)
                })
                .catch(error => {
                  console.log(error)
                });
              // 

              this.loader = false;
              // this.$toast.success('updated');
              swal("Category has been deleted!", {
                icon: 'success',
                // buttons: false,
                timer: 3000,
              });
            }                   
          }); 
      },      
      handleToggleInput(event) {
        // console.log(event)
        this.loader = true;
        const category = event.item;
        console.log('receiving..');
        this.$axios.$patch(`/categories/${category.slug}`, {
          name: category.name,
          slug: category.slug,
          description: category.description,
          parent_id: category.parent_id,
          active: event.value,
          meta: {
            title: category.meta.title,
            description: category.meta.description,            
            keywords: category.meta.keywords
          },
        }).then(async (response) => {                
              this.getCategories();
              this.loader = false;
              this.$toast.success('updated');
          })
          .catch(error => {
              if (error.response.status !== 422) throw error

              this.errors = Object.values(error.response.data.errors).flat();
              this.loader = false;
          })                    
      },
       url(image, type='image') {
          if (image === null) {
             return (type === 'icon') ? require('~/assets/no_image_icon.png') : require('~/assets/no_image.png');
          }
          let name = (typeof image === 'object') ? image.name : image;
         
          let path = (type === 'image') ? `/storage/images/categories/small/${name}` : `/storage/images/icons/${name}` 
          return `${this.$config.baseURL}${path}`;
      }
    }
}
</script>