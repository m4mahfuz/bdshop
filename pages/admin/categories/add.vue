<template>
    <!-- <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"> -->
    <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 
            class="pb-2 text-lg text-gray-400 capitalize dark:text-white border-b border-green-100"            
        >
            <span 
                class="border-b-4 border-green-400 pb-2 pr-1"
            > 
                Add Category
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
                    <label for="categoryLevel" class=" text-gray-500 dark:text-gray-400 text-sm">Select Category Level</label>
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
                    <label class="text-gray-500 dark:text-gray-200 text-sm" for="metaKeywords">Meta Keywords</label>
                 
                    <textarea 
                        v-model="category.meta.keywords"
                        id="metaKeywords" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter meta keywords"></textarea>
                </div>
                <div class="mt-4 md:mt-0">
                  <label class="text-green-500 font-semibold text-sm mb-2">Icon</label>                
                  <ImageUpload
                    class="mt-2"
                    :icon="true"
                    :multiple="false"
                    :saved="isImageSaved" 
                    directory="icons"
                    @uploaded="handleUploadedIcon"
                    @removed="handleRemovedIcon" 
                  />
                </div>                
                <div class="mt-4 md:mt-0">
                  <label class="text-red-500 font-semibold text-sm">Hero Image</label>                
                  <ImageUpload
                    class="mt-2"
                    :multiple="false"
                    :saved="isImageSaved" 
                    directory="categories"
                    @uploaded="handleUploaded"
                    @removed="handleRemoved" 
                  />
                </div>                
            </div>

            <div class="flex justify-center mt-8 gap-4">
                <button class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Cancel</button>
                <button @click.prevent="save" type="button" :disabled="!isValid" class="px-10 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300">Save</button>
            </div>
        </form>
    </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Label from '../../../components/Label.vue';
export default {
  components: { Label },
    layout: 'dashboard',
    head() {
        return {
            title: 'Add Category',            
        }
    },
    data() {
        return {
            isImageSaved: false,
            category: {
                id: '',
                name: '',
                description: '',
                parent_id: null,
                image: null,
                icon: null,
                active: true,
                meta: {
                    title: '',
                    description: '',
                    keywords: ''
                } 
            },      
            isNewKeywords: false,
            newKeywords: '',
            errors: [],
        }
    },    
    mounted() {
        if ( this.categories.length < 1 ) {
            this.getCategories();  
        }
    },    
    computed: {
        ...mapState('categories', [
            'categories',
        ]),
        // ...mapGetters('categories', [
        //     'categoryBy',
        //     // 'flatCategories'
        // ]),        
        // isAddCategory() {
        //     return (this.$route.params.category === 'add') ? true : false;
        // },
        isValid() {            
            return (this.category.name !== '' &&
            this.category.slug !== '' &&
            this.category.description !== '' 
            ) ? true : false;
        }
    },
    methods: {
        ...mapActions('categories', [
            'getCategories',
        ]),        
        handleUploadedIcon(icon) {             
					this.category.icon = icon.name;
        },
        handleRemovedIcon(icon) {
					this.category.icon = null;
        },
        handleUploaded(image) {             
					this.category.image = image.name;
        },
        handleRemoved(image) {
					this.category.image = null;
        },
        toggleNewKeywords() {
            this.isNewKeywords = !this.isNewKeywords;
        },

        // getCategoryBy(slug) {
        //     let category 4= this.categoryBy(slug);
        //     if (category === undefined) {
        //         category = JSON.parse(localStorage.getItem('category'));
        //     }
        //     return category;
        // },
        // fillupFormByFound(category) {            
        //     this.category.id = category.id;
        //     this.category.name = category.name;
        //     this.category.slug = category.slug;
        //     this.category.description = category.description;
        //     this.category.parent_id = category.parent_id;
        //     this.category.active = category.active;              
        //         this.category.meta.title = category.meta.title;
        //         this.category.meta.description = category.meta.description;
        //         // this.category.meta.keywords = category.meta.keywords.length > 0 ?  category.meta.keywords.toString() : ''
        //         this.category.meta.keywords = category.meta.keywords
        // },
        save() {
            this.loader = true;
            this.isImageSaved = false;
            this.category.slug = this.category.name;
            if (!Array.isArray(this.category.meta.keywords)) {
                let keywordsArray = this.category.meta.keywords.split(',');
                this.category.meta.keywords = keywordsArray;
            }
            console.log(this.category)
            
            this.$axios.$post('/categories', this.category)
            .then(response => {
                this.loader = false;
                this.isImageSaved = true;
                this.$toast.info('New Category Created');
                // this.$router.go(-1);
                this.reset();
            })
            .catch(error => {
                console.log(error);
                if (error.response.status !== 422) throw error

                this.errors = Object.values(error.response.data.errors).flat();
            })            
        },
        reset() {
            this.category.id = '';
            this.category.name = '';
            this.category.description = '';
            this.category.parent_id = null;
            this.category.image = null;
            this.category.active = true;
            this.category.meta.title = '';
            this.category.meta.description = '';
            this.category.meta.keywords = '';
            this.isNewKeywords = false;
            this.newKeywords = '';            
        }
        // update(category) {
        //     if (this.newKeywords !== '') {
        //         let keywordsArray = this.mergePrevKeywordsWithNew();
        //         this.category.meta.keywords = keywordsArray;
        //     }
            
        //     this.$axios.$put(`/categories/${category.slug}`, this.category)
        //     .then(response => {
        //         localStorage.removeItem('category');
        //         this.newKeywords = '';
        //         this.$toast.info('Category Updated');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         if (error.response.status !== 422) throw error

        //         this.errors = Object.values(error.response.data.errors).flat();
        //     })

        // },
        // mergePrevKeywordsWithNew() {
        //     let newKeywordsArray = this.newKeywords.split(',');
        //     let keywordsArray = newKeywordsArray;

        //     if (Array.isArray(this.category.meta.keywords) && this.category.meta.keywords.length > 0 ) {
        //         keywordsArray = [...new Set([...this.category.meta.keywords, ...newKeywordsArray])];
        //     }
        //     return keywordsArray;
        // },
        // remove(index) {
        //     // console.log('idx', index);
        //     this.category.meta.keywords.splice(index, 1);
        // }
    }
}
</script>

<style>

</style>