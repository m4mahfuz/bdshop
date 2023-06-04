<template>
    <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 
            class="pb-2 text-lg text-gray-400 capitalize dark:text-white border-b border-blue-100"            
        >
            <span 
                class="border-b-4 border-blue-400 pb-2 pr-1"
            >View Category
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
                        readonly                        
                    >
                </div>
                <div class="grow">
                    <label for="categoryLevel" class=" text-gray-500 dark:text-gray-400 text-sm">Parent Category</label>                    
                        <!-- v-model="category.parent" -->
                    <input 
                        id="name" 
                        type="text" 
                        :value="parentCategory"
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        readonly                        
                    >
                </div>
                
                <div>
                    <label class="text-gray-500 dark:text-gray-200 text-sm" for="description">Description</label>                 
                    <textarea 
                        v-model="category.description"
                        id="description" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly></textarea>
                </div>
                
                <div>
                    <label class="text-gray-500 dark:text-gray-200 text-sm" for="title">Meta Title</label>                 
                    <textarea 
                        v-model="category.meta.title"
                        id="title" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        readonly
                        >
                      </textarea>
                </div>
                <div>
                    <label class="text-gray-500 dark:text-gray-200 text-sm" for="metaDescription">Meta Description</label>
                 
                    <textarea 
                        v-model="category.meta.description"
                        id="metaDescription" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly></textarea>
                </div>                                
                <div>
                    <label class="text-gray-500 dark:text-gray-200 text-sm">Available Meta Keywords</label>
                        <div class="flex h-100 mt-2 flex-wrap border rounded-md">
                            <div class="flex justify-between items-center w-full bg-green-100 p-2 mx-0 mb-2">
                                <span class="text-sm font-semibold text-blue-500">[{{ category.meta.keywords.length }}] </span>
                                
                            </div>
                            <div class="p-2 w-full flex justify-start flex-wrap gap-3">
                                <span 
                                    v-for="(keyword, index) in category.meta.keywords" 
                                    :key="index"
                                    class="px-3 py-1 text-xs bg-green-300 shadow rounded-md relative"
                                >
                                    {{keyword}}
                                </span>
                            </div>                            
                        </div>
                </div>
            </div>

            <div class="flex justify-center mt-8 gap-4">
                <button @click.prevent="back" class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Back</button>
                <button @click.prevent="goToEdit(category)" class="px-10 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Edit</button>
            </div>
        </form>
    </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    layout: 'dashboard',
    head() {
        return {
            title: 'View Category',            
        }
    },
    data() {
        return {
            category: {
                id: '',
                name: '',
                slug: '',
                description: '',
                parent: '',
                parent_id: null,
                active: true,
                meta: {
                    title: '',
                    description: '',
                    keywords: ''
                } 
            },      
            // isNewKeywords: false,
            // newKeywords: '',
            errors: [],
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
        parentCategory() {
          return (this.category.parent !== '') ? this.category.parent : 'Main Category';
        }
    },
    methods: {
        ...mapActions('categories', [
            'getCategories',
        ]),                
        getCategoryBy(slug) {
            let category = this.categoryBy(slug);
            if (category === undefined) {
                category = JSON.parse(localStorage.getItem('category'));
            }
            return category;
        },
        back() {
          this.$router.push('/admin/categories');
        },
        goToEdit(category) {
          localStorage.setItem('category', JSON.stringify(category))
          this.$router.push(`/admin/categories/${category.slug}/edit`)
        },
        fillupFormByFound(category) {            
            this.category.id = category.id;
            this.category.name = category.name;
            this.category.slug = category.slug;
            this.category.description = category.description;
            this.category.parent = category.parent;
            this.category.parent_id = category.parent_id;

            this.category.active = category.active;              
            
            this.category.meta.title = category.meta.title;
            this.category.meta.description = category.meta.description;
            this.category.meta.keywords = category.meta.keywords
        },
    }
}
</script>

<style>

</style>