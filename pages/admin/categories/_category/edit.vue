<template>
    <!-- <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"> -->
    <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 
            class="pb-2 text-lg text-gray-400 capitalize dark:text-white border-b border-orange-100"            
        >
            <span 
                class="border-b-4 border-orange-400 pb-2 pr-1"
            > 
                Edit Category
            </span>

        </h2>
        
        <form autoComplete="off">
            <div class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
                <div>
                    <label class="text-gray-500 dark:text-gray-200 text-sm" for="name">Name</label>
                    <input 
                        v-model="category.name"
                        id="name" 
                        type="text" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        placeholder="Enter category name"
                    >
                </div>
                <div class="grow">
                    <label for="categoryLevel" class=" text-gray-500 dark:text-gray-400 text-sm">Select Parent Category</label>
                    <select 
                        v-model="category.parent_id" id="categoryLevel" 
                        class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option selected value="null">Main Category</option>                    
                        <option v-for="category in categories" :key="category.id" :value="category.id"
                        >                           
                           {{ category.name }}                            
                        </option>                    
                    </select>
                </div>
                
                <div>
                    <label class="text-gray-500 dark:text-gray-200 text-sm" for="description">Description</label>
                 
                    <textarea 
                        v-model="category.description"
                        id="description" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter category description"></textarea>
                </div>
                
                <div>
                    <label class="text-gray-500 dark:text-gray-200 text-sm" for="title">Meta Title</label>
                 
                    <textarea 
                        v-model="category.meta.title"
                        id="title" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter meta title"></textarea>
                </div>
                <div>
                    <label class="text-gray-500 dark:text-gray-200 text-sm" for="metaDescription">Meta Description</label>
                 
                    <textarea 
                        v-model="category.meta.description"
                        id="metaDescription" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter meta description"></textarea>
                </div>                                
                <div>
                    <label class="text-gray-500 dark:text-gray-200 text-sm">Available Meta Keywords</label>
                        <div class="flex h-100 mt-2 flex-wrap border rounded-md">
                            <div class="flex justify-between items-center w-full bg-green-100 p-2 mx-0 mb-2">
                                <span class="text-sm font-semibold text-blue-500">[{{ category.meta.keywords.length }}] </span>
                                <button 
                                    @click.prevent="toggleNewKeywords"
                                    type="button" 
                                    class="text-xs px-2 py-1 border border-red-400 hover:bg-red-600 hover:text-white rounded"
                                    :class="{
                                        'text-red-500': !isNewKeywords,
                                        'bg-red-500': isNewKeywords,
                                        'text-white': isNewKeywords                                       
                                    }"
                                >Add New 
                                </button>
                            </div>
                            <div class="p-2 w-full flex justify-start flex-wrap gap-3">
                                <span 
                                    v-for="(keyword, index) in category.meta.keywords" 
                                    :key="index"
                                    class="px-3 py-1 text-xs bg-green-300 shadow rounded-md relative"
                                >
                                    {{keyword}}
                                    <button @click.prevent="remove(index)" type="button" class="absolute -top-[10px] right-0 border border-green-500 bg-green-400 text-green-700 hover:bg-green-300 transition delay-200 text-xs h-4 w-4 rounded-full flex justify-center items-center">x</button>
                                </span>
                            </div>
                            <div v-if="isNewKeywords" class="bg-green-100 p-2 mx-0 mt-2 w-full">
                                <textarea 
                                    v-model="newKeywords"
                                    id="addNewMetaKeywords" 
                                    rows="1" 
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add new meta keywords">
                                </textarea>
                            </div>
                        </div>
                </div>
                <div>
                  <label class="text-sky-500 font-semibold text-sm">Icon/Image</label>
                  
                  <div class="mt-2 grid grid-cols-3 gap-2 justify-end items-center border p-2 rounded-md">
                    <label class="px-2 py-2 text-blue-500 dark:text-gray-200 font-semibold text-sm mb-2">Icon</label>
                    <img class="w-16" :src="url(category.icon, 'icon')" alt="icon">
                    <button 
                      v-if="isNullCategory('icon')" 
                      class="mx-auto hover:border hover:border-blue-600 hover:p-1 hover:rounded-md disabled:border-0"
                      type="button"
                      @click.prevent="add('icon')" :disabled="isDisable"
                    > 
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"
                      :class="isDisable ? 'text-gray-300':'text-blue-600'"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </button>
                    <button 
                      v-if="!isNullCategory('icon')" 
                      class="mx-auto hover:border hover:border-red-600 hover:p-1 hover:rounded-md"
                      type="button" 
                      @click.prevent="removeCategory('icon')"
                    > 
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>        
                    <div class="col-span-3 my-2 border-b"></div>
                    
                    <!-- image -->
                    <label class="px-2 py-2 text-orange-500 dark:text-gray-200 font-semibold text-sm mb-2">Hero Image</label>
                    <img class="w-16" :src="url(category.image)" alt="image">
                    <button v-if="isNullCategory('image')" 
                    class="mx-auto hover:border hover:border-orange-600 hover:p-1 hover:rounded-md" type="button" @click.prevent="add('image')"> 
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-orange-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>

                    </button>
                    <button v-if="!isNullCategory('image')"  class="mx-auto hover:border hover:border-red-600 hover:p-1 hover:rounded-md" type="button" @click.prevent="removeCategory('image')"> 
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>                
                  <p v-show="isDisable" class="mt-2 font-light text-xs text-gray-400">* Icon not required for 'child' category.</p>
                </div>  
                <div v-show="showImageUploader">
                  <label 
                    class=" font-semibold text-sm uppercase"
                    :class="isIcon ? 'text-blue-600' : 'text-orange-600'"                    
                  >{{uploaderTitle}}</label>
                  <ImageUpload
                    class="mt-2"
                    ref="imageUploader"
                    :icon="isIcon"
                    :multiple="false"
                    :saved="isImageSaved" 
                    :directory="directory"
                    @uploaded="handleUploaded"
                    @removed="handleRemoved" 
                  />
                </div>
                <!-- <div v-if="showImageUploader">
                  <label 
                    class="text-orange-600 font-semibold text-sm uppercase"
                  >Image Upload</label>
                  <ImageUpload
                    class="mt-2"   
                    ref="imageUploader"                 
                    :multiple="false"
                    :saved="isImageSaved" 
                    directory="categories"
                    @uploaded="handleUploaded"
                    @removed="handleRemoved" 
                  />
                </div> -->
            </div>
  
            <div class="flex justify-center mt-8 gap-4">
                <button class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Cancel</button>
                
                <button @click.prevent="update(category)" type="button" :disabled="!isValid" class="px-10 py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 disabled:bg-orange-300">Update</button>
            </div>
        </form>
    </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ImageUpload from '../../../../components/ImageUpload.vue';
export default {
  components: { ImageUpload },
    layout: 'dashboard',
    head() {
        return {
            title: 'Edit Category',            
        }
    },
    data() {
        return {
            category: {
                id: '',
                name: '',
                slug: '',
                description: '',
                parent_id: null,
                icon: null,
                image: null,
                active: true,
                meta: {
                    title: '',
                    description: '',
                    keywords: ''
                } 
            },
            isIcon: false,      
            isNewKeywords: false,
            newKeywords: '',
            errors: [],
            showIconUploader: false,
            showImageUploader: false,
            // iconRemoved: false,
            // imageRemoved: false,
            isImageSaved: false,
            directory: '',
            uploader: {
              icon: null,
              image: null
            }
        }
    },    
    mounted() {
        if ( this.categories.length < 1 ) {
            this.getCategories();  
        }
        // if (this.$route.params.category !== 'add') {
            let category = this.getCategoryBy(this.$route.params.category);
            
            this.fillupFormByFound(category);
        // }

    },    
    computed: {
        ...mapState('categories', [
            'categories',
        ]),
        ...mapGetters('categories', [
            'categoryBy',
        ]),
        isDisable() {
          return (this.category.parent_id !== null) ? true:false;
        },        
        isValid() {            
            return (this.category.name !== '' &&
            this.category.slug !== '' &&
            this.category.description !== '' 
            ) ? true : false;
        },
        uploaderTitle() {
          return this.isIcon ? 'Icon Uploader' : 'Image Uploader';
        }
    },
    methods: {
        ...mapActions('categories', [
            'getCategories',
        ]),
        handleUploaded(image) {    
          // this.clearUploaderImagesArray();
          if (this.isIcon) {
            this.category.icon = image.name;
            this.uploader.icon = image;
            this.showImageUploader = false;
            return;
          }         
            console.log(image)
            this.uploader.image = image;
            this.category.image = image.name;
            this.showImageUploader = false;
        },
        handleRemoved(image) {
           if (this.isIcon) {
            this.category.icon = null;
            this.uploader.icon = null;
            return;
          }    
					this.category.image = null;
          this.uploader.image = null;
        },        
        isNullCategory(type) {
          if (type === 'icon') {
            return (this.category.icon === null) ? true : false;
          }
          return (this.category.image === null) ? true : false;
        },
        add(type) {
          this.clearUploaderImagesArray();
          this.showImageUploader = true;
          if (type === 'icon') {
            this.isIcon = true;
            this.directory = 'icons';
            return;
          }          
          this.isIcon = false;
          this.directory = 'categories';
        },
        clearUploaderImagesArray() {
          this.$refs.imageUploader.images = [];
        },
        removeCategory(type) {
          swal({
            title: "Are you sure?",
            text: `This category '${type}' will be deleted!`,
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
              
              if (type === 'icon' && this.uploader.icon !== null) {
                this.isIcon = true;
                this.$refs.imageUploader.remove(this.uploader.icon);
                return;
               }

              if (type === 'image' && this.uploader.image !== null) {
                this.isIcon = false;
                this.$refs.imageUploader.remove(this.uploader.image);
                return;
               }

              this.action = 'deleting';
              this.loader = true;					

              // let name = this.category.image;
              // if (type === 'icon') {
              //   name = this.category.icon;
              // }
              let name = (type === 'icon') ? this.category.icon : this.category.image; 

              // this.$axios.$delete(`/admin/categories/${this.category.slug}/${type}s/${name}`) 
              this.$axios.$delete(`/admin/categories/${this.category.slug}/${type}`) 
                .then((response) => {
                  // this.actionAlert('info', 'Image deleted successfully.');
                  this.$toast.error(`${type} deleted successfully.`);
                  this.setNullToCategory(type);
                  this.loader = false;		      			
                })
                .catch((error) => {
                  this.loader = false;
                });

              //axios call
            //   this.loader = false;
            //   this.$toast.error('Deleted');
              // swal("Category has been deleted!", {
              //   icon: 'success',
              //   // buttons: false,
              //   timer: 3000,
              // });
            }                   
          });          
        },
        setNullToCategory(type) {
          if (type === 'icon') {
            this.category.icon = null;
            return;
          }
          this.category.image = null;
        },
        toggleNewKeywords() {
            this.isNewKeywords = !this.isNewKeywords;
        },
        getCategoryBy(slug) {
            let category = this.categoryBy(slug);
            if (category === undefined) {
                category = JSON.parse(localStorage.getItem('category'));
            }
            return category;
        },
        fillupFormByFound(category) {            
            this.category.id = category.id;
            this.category.name = category.name;
            this.category.slug = category.slug;
            this.category.description = category.description;
            this.category.parent_id = category.parent_id;
            this.category.icon = category.icon;              
            this.category.image = (typeof category.image === 'object' && category.image !== null) ? category.image.name : category.image;              
            this.category.active = category.active;              
            
            this.category.meta.title = category.meta.title;
            this.category.meta.description = category.meta.description;
            // this.category.meta.keywords = category.meta.keywords.length > 0 ?  category.meta.keywords.toString() : ''
            this.category.meta.keywords = category.meta.keywords
        },
        // save() {
        //     this.category.slug = this.category.name;
        //     if (!Array.isArray(this.category.meta.keywords)) {
        //         let keywordsArray = this.category.meta.keywords.split(',');
        //         this.category.meta.keywords = keywordsArray;
        //     }
        //     console.log(this.category)
            
        //     this.$axios.$post('/categories', this.category)
        //     .then(response => {
        //         this.$toast.info('New Category Created');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         if (error.response.status !== 422) throw error

        //         this.errors = Object.values(error.response.data.errors).flat();
        //     })            
        // },
        update(category) {
            if (this.newKeywords !== '') {
                let keywordsArray = this.mergePrevKeywordsWithNew();
                this.category.meta.keywords = keywordsArray;
            }            
            this.$axios.$patch(`/categories/${category.slug}`, category)
            .then(response => {
                localStorage.removeItem('category');
                this.newKeywords = '';
                this.$toast.info('Category Updated');
            })
            .catch(error => {
                console.log(error);
                if (error.response.status !== 422) throw error

                this.errors = Object.values(error.response.data.errors).flat();
            })
        },
        mergePrevKeywordsWithNew() {
            // let newKeywordsArray = this.newKeywords.split(',');
            let newKeywordsArray = [];
            this.newKeywords.split(',').forEach((element) => {
              newKeywordsArray.push(this.ucfirst(element.trim()));
            });

            let keywordsArray = newKeywordsArray;

            if (Array.isArray(this.category.meta.keywords) && this.category.meta.keywords.length > 0 ) {
                keywordsArray = [...new Set([...this.category.meta.keywords, ...newKeywordsArray])];
            }
            return keywordsArray;
        },
        ucfirst(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        },
        remove(index) {
            this.category.meta.keywords.splice(index, 1);
        },
        url(image, type='image') {
          if (image === null) {
             return (type === 'icon') ? require('~/assets/no_image_icon.png') : require('~/assets/no_image.png');
          }
          let name = image;
          // let  path = '/storage/images/icons/';
          // if (type === 'image') {
          //   path = `/storage/images/categories/small/`;
          // }
          let path = (type === 'image') ? `/storage/images/categories/small/${name}` : `/storage/images/icons/${name}` 
          return `${this.$config.baseURL}${path}`;
      }
    }
}
</script>
