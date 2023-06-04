<template>
  <section>
		<div class="px-4 py-4 flex justify-end items-center bg-slate-50 mb-2 rounded-lg">	 	
      <nuxt-link to="/admin/slides/add" class="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-white text-sm">Add Slide</nuxt-link>
    </div>

		<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
			<th scope="col" class="p-2">#</th>
      <th scope="col" class="px-4 py-3">
      Image
      </th>
      <th scope="col" class="px-6 py-3">
      Title
      </th>
      <th scope="col" class="px-4 py-3">
      Description
      </th>
      <th scope="col" class="px-4 py-3">
        Discount
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
        v-for="(slide, index) in slides" class="border-b odd:bg-white even:bg-gray-50"
        :key="index"
      >
			<th scope="row" class="p-2">{{index+1}}</th>
      <td class="px-4 py-4">
				<img :src="url(slide.image)" width="100" height="100" />
			</td>
      <td class="px-4 py-4">
        {{slide.title}}
      </td>
      <td class="px-4 py-4">
        {{slide.description}}
      </td>
      <td class="px-4 py-4">
				{{slide.discount}}
      </td>
      <td class="px-4 py-4">
          <ToggleInput 
            :item="slide" 
            :status="slide.active" 
            @toggleInput="handleToggleInput"
          />
      </td>  
      <td class="px-4 py-2">
        <button type="button" @click.prevent="edit(slide)"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        
        <button type="button" @click.prevent="remove(slide)"> 
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
export default {
    layout: 'dashboard',
    data() {
      return {
				action: '',
				loader: false,
			}
		},
		async mounted() {    
      this.loader = true;
      await this.getSlides('/admin/slides');
      this.loader = false;
    },
    computed: {
      ...mapState('slides', ['slides']),
    },
    methods: {
      ...mapActions('slides', ['getSlides', 'deleteFromStoreSlides']),
      edit(slide) {
        this.action = 'updating';
        localStorage.setItem('slide', JSON.stringify(slide))
        this.$router.push(`/admin/slides/${slide.id}/edit`)
      },
      remove(slide) {
        swal({
            title: "Are you sure?",
            text: `This slide will be deleted!`,
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
              this.$axios.$delete(`/admin/slides/${slide.id}`)
              .then(response => {
                this.deleteFromStoreSlides(slide);
                this.loader = false;
              // this.$toast.success('updated');
                swal("Slide has been deleted!", {
                  icon: 'success',
                  // buttons: false,
                  timer: 3000,
                });
              })
              .catch(error => {
                this.loader = false;
              });
            }                   
          }); 
      },		
      handleToggleInput(event) {
          // console.log(event)
          this.loader = true;
          // const slide = event.item;
          let slide  = {...event.item};
          slide.active = event.value;
          this.$axios.$patch(`/admin/slides/${slide.id}`, slide)
          .then(response => {
                this.loader = false;
                this.$toast.success('Slide Updated');
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                this.errors = Object.values(error.response.data.errors).flat();
                this.loader = false;
            })                    
        },
        // fillupFormByFound(slide, status) {    
        //     let data = {};       
        //     data.id = slide.id;
        //     data.title = slide.title;
        //     data.discount = slide.discount;
        //     data.description = slide.description;
        //     data.active = slide.status;
        //     data.url = slide.url;              
        //     data.image = slide.image;              
        //     return data;
        // },
        url(image) {        
        //    let name = image.name;
          if (image !== null) {
            let path = `/storage/images/slides/small/${image}`;
            return `${this.$config.baseURL}${path}`;
          }
          return; 
        },
    },		
}
</script>

<style>

</style>