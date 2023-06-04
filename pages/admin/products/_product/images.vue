<template>
  <div>
    <div class="flex gap-6">
      <div class="basis-1/3">
        <div class="bg-slate-100 p-4 rounded-md">
          <h3 class="text-xl font-bold mb-4 border-b border-gray-300 pb-2">
              <span class="border-b-4 border-gray-400 pb-1 pr-1">Image Upload</span> 
          </h3>
          <ImageUpload
            :multiple="true"
            :saved="isImagesSaved" 
            directory="products"
            @uploaded="handleUploaded"
            @removed="handleRemoved" 
          />
          <div v-if="imagesToBeSaved.length > 0" class="flex mt-6 gap-2">
            <button class="px-4 py-2 leading-5 text-gray-800 text-sm transition-colors duration-200 transform bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600" @click.prevent="reset()">Cancel</button>
            
            <button @click.prevent="save()" type="button" class="px-12 py-2 leading-5 text-white text-sm transition-colors duration-200 transform bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300">Save</button>
          </div>
        </div>  
      </div>    
      <div class="basis-2/3 py-4 pr-2 md:pr-12">
        <h3 class="text-xl font-bold mb-4 border-b border-gray-300 pb-2">
            <span class="border-b-4 border-gray-400 pb-1 pr-1">Available Images</span> 
        </h3>
        <overlay-scrollbars 
          :key="scroll"          
          class="h-96"
        >
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="p-2">#</th>
                  <th scope="col" class="py-2">Image</th>
                  <th scope="col" class="py-2">Featured</th>
                  <th colspan="2" scope="col" class="py-2 sr-only">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(image, index) in images" :key="index"
                class="odd:bg-white even:bg-gray-50 hover:bg-green-50"
              >
                  <th scope="row" class="px-2">{{index+1}}</th>
                  <td class="py-2">
                    <img :src="url(image)" width="100" height="100" />
                  </td>
                  <td>
                    <input 
                      v-model="featured_image"
                      :value="image"                    
                      name="featured_image" 
                      type="radio" 
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    >
                  </td>
                  <td v-if="featured_image !== null"> 
                    <button 
                    v-if="featured_image.id === image.id"
                    @click.prevent="update(image)" class=" text-purple-600 hover:text-purple-800">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </button>                    
                  </td>                                    
                  <td>
                    <button @click.prevent="remove(image)" class="text-red-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button> 
                   
                  </td>                
              </tr>
              <tr>
                <td colspan="5" class="bg-slate-100">                   
                  <div v-if="featured_image !== null" class="text-xs flex gap-2 p-2">
                    <p>*To update featured image, click on</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
                </td>
              </tr>    
            </tbody>
          </table>       
        </div>                              
        </overlay-scrollbars>
      </div>
    </div>        
  </div>  
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import swal from 'sweetalert';

export default {
    layout: 'dashboard',
    data() {
      return {
        scroll: '',
        isImagesSaved: false,
        imagesToBeSaved: [],
        featured_image: '',
        // availableImages: [],
      }
    },
    mounted() {      
      this.getProductImages(this.$route.params.product);
      this.featured_image = this.getFeaturedImage;
      this.$nextTick(() => { this.scroll++; }); 
    },
    watch: {
      getFeaturedImage(value) {
        this.featured_image = value;
      }
    },
    computed: {
      ...mapState('products', ['images']),
      ...mapGetters('products', ['getFeaturedImage']),
      // featuredImage() {
      //   this.featured_image = this.getFeaturedImage;        
      // }
    },
    methods: {
      ...mapActions('products', [
          'getProductImages',
          'updateStoreImages',
          'deleteFromStoreImages'
      ]),     
      url(image) {
          let path = '/storage/images/products/small/';
          let name = image.name;
          return `${this.$config.baseURL}${path}${name}`;
      },
      handleUploaded(image) {             
        // this.images.push(image.name);
        console.log(image)
        this.imagesToBeSaved.push(image.name);
      },
        handleRemoved(image) {
            let index = this.imagesToBeSaved.indexOf(image.name);
            this.imagesToBeSaved.splice(index, 1);
        },
        save() {
            this.loader = true;
            this.isImagesSaved = false;
            const product = this.$route.params.product;

            this.$axios.$post(`/products/${product}/images`, {images: this.imagesToBeSaved})
            .then(response => {
                this.isImagesSaved = true;
                this.$toast.info('Images Saved');
                //  this.reset();
                this.updateStoreImages(response.data);
                this.imagesToBeSaved = [];
                this.loader = false;
            })
            .catch(error => {
                console.log(error);
                // if (error.response.status !== 422) throw error

                // this.errors = Object.values(error.response.data.errors).flat();
                this.loader = false;
                // this.setErrors(error.response.data.errors);
            })            
        },
        update(image) {
          this.loader = true;          
          this.$axios.$put(`/products/images/${image.id}`)
          .then(response => {              
              this.loader = false;
              this.$toast.info('Image Updated');
          })
          .catch(error => {
              this.loader = false;
          })
        },
        remove(image) {
          swal({
            title: "Are you sure?",
            text: `This '${image.name}' image will be deleted!`,
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
          .then((value) => {
            if (value) {
              this.loader = true;
              const product = this.$route.params.product;

              this.$axios.$delete(`/products/${product}/images/${image.id}`) 
                .then((response) => {
                  // this.actionAlert('info', 'Image deleted successfully.');
                  this.$toast.error('Image deleted successfully.');
                  this.deleteFromStoreImages(image);
                  this.loader = false;		      			
                })
                .catch((error) => {
                  this.loader = false;
                });
            }
          });            
        },
    }
}
</script>