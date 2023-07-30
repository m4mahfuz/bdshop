<template>    
    <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 
            class="pb-2 text-lg text-gray-400 capitalize dark:text-white border-b border-green-100"            
        >
            <span 
                class="border-b-4 border-green-400 pb-2 pr-1"
            > 
                Add Tag
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
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring"
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
                <button @click.prevent="reset()" class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Cancel</button>
                <button @click.prevent="save()" type="button" :disabled="!isValid" class="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300">Save</button>
							</div>
            </div>
        </form>
        <loader action="saving" :active="loader" />            
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
            tag: {
                // id: '',
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
            this.tag.category !== '' 
            ) ? true : false;
        },
    },
    methods: {
        ...mapActions('categories', [
            'getCategories',
        ]),   
        ...mapActions('tags', [
            'getTagsByCategory',
        ]),   
				...mapActions('errors', ['setErrors']),

				back() {
					this.$router.back();
				},
        save() {
            this.loader = true;
            this.tag.slug = this.tag.name;            
            
            this.$axios.$post('/admin/tags', this.tag)
            .then(response => {
                this.$toast.info('New Tag Created');
                this.loader = false;
                // this.reset();
								this.tag.name = '';
								this.tag.slug = '';
            })
            .catch(error => {                
                this.loader = false;
                this.setErrors(error.response.data.errors);
            })            
        },
        reset() {
            this.tag = {
                name: '',
                slug: '',                
                category: '',                
            }
        }        
    }
}
</script>