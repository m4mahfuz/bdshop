<template>
  <section>
    <div class="px-4 py-4 flex justify-end items-center bg-slate-50 mb-2 rounded-lg">	 	
      <nuxt-link to="/admin/tags/add" class="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-white text-sm">Add Tag</nuxt-link>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" class="px-6 py-3">
      Name
      </th>
      <th scope="col" class="px-4 py-3">
      Category
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
        v-for="(tag, index) in tags" class="border-b odd:bg-white even:bg-gray-50"
        :key="index"
      >
      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {{ tag.name }}
      </td>      
      <td class="px-4 py-4">        
        <span v-if="tag.category">
          {{tag.category.name}}
        </span>
      </td>
      <td class="px-4 py-4">
          <ToggleInput 
            :item="tag" 
            :status="tag.active" 
            @toggleInput="handleToggleInput"
          />
      </td>
      <td class="px-4 py-2">
        
        <button type="button" @click.prevent="edit(tag)"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        
        <button type="button" @click.prevent="remove(tag)"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>        
      </td>              
      </tr>
      </tbody>
      </table>
    </div>    
    <div class="my-6 flex justify-between items-center">
      <div>
        <span class="pl-2 text-xl font-semibold"> {{ meta.totalTags }} </span> tags.
      </div>
      <div class="flex justify-end items-center gap-4">
          {{page}} of {{totalPages}}
        <button @click.prevent="previous" type="button" :disabled="links.prev===null" class="w-32 text-center py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300">Previous</button>

        <button @click.prevent="next" type="button" :disabled="links.next===null" class="w-32 text-center py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 disabled:bg-orange-300">Next</button>      
      </div>
    </div>
    <loader :action="action" :active="loader" />
  </section>
</template>

<script>
import swal from 'sweetalert';
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    layout: 'dashboard',
    data() {
        return {
          action: '',
          loader: false,
          page: 0,
          tagsPerPage: 10
        }
    },
    async mounted() {
      this.loader = true;
      await this.getTags();
      this.page++;
      this.loader = false;
      
    },
	  computed: {
        ...mapState('tags', [
            'tags',
            'meta',
            'links',
        ]),
        totalPages() {
          return (this.meta.totalTags >= this.tagsPerPage) ? Math.ceil(this.meta.totalTags / this.tagsPerPage) : 1;
        }
    },
    methods: {
        ...mapActions('tags', [
            'getTags',
            'deleteTag'		
        ]),
        async previous() {
            this.loader = true;
            await this.getTags(this.links.prev);
            this.page--;
            this.loader = false;
        },
        async next() {
            this.loader = true;
            await this.getTags(this.links.next);
            this.page++;
            this.loader = false;
        },
      edit(tag) {
        this.action = 'updating';
        localStorage.setItem('tag', JSON.stringify(tag))
        this.$router.push(`/admin/tags/${tag.slug}/edit`)
      },
      
      remove(tag) {
        swal({
            title: "Are you sure?",
            text: `This '${tag.name}' tag will be deleted!`,
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
              await this.deleteTag(tag);

              this.loader = false;
              swal("Tag has been deleted!", {
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
        const tag = event.item;
        // console.log('receiving..');
        this.$axios.$patch(`/admin/tags/${tag.slug}`, {
          name: tag.name,
          slug: tag.slug,          
          category: tag.category.id,
          active: event.value
        }).then(response => {
              this.loader = false;
              this.$toast.success('updated');
          })
          .catch(error => {
              if (error.response.status !== 422) throw error

              this.errors = Object.values(error.response.data.errors).flat();
              this.loader = false;
          })                    
      },      
    }

}
</script>