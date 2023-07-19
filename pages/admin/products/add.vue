<template>    
    <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 
            class="pb-2 text-lg text-gray-400 capitalize dark:text-white border-b border-green-100"            
        >
            <span 
                class="border-b-4 border-green-400 pb-2 pr-1"
            > 
                Add Product
            </span>

        </h2>
        
        <form autoComplete="off">
            <div class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
                
                <div class="grow">
                    <label for="categoryLevel" class=" text-gray-600 dark:text-gray-400 text-sm">Select Category</label>
                    <select 
                        v-model="product.category" id="categoryLevel" 
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
                    <div v-if="selectedCategories.length > 0" class="py-4 text-xs text-red-500">
                        Selected:
                        <span v-for="(category, index) in selectedCategories" :key="index" class="ml-0.5 first:ml-0 after:content-[','] last:after:content-['\0020'] text-blue-700">
                            {{category.name}}
                        </span>
                    </div>
                </div>

                <div class="grow">
                    <label for="tagsLevel" class=" text-gray-600 dark:text-gray-400 text-sm">Select Tags</label>
                    <select 
                        v-model="selectedTags" id="tagsLevel" 
                        class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        multiple
                    >                        
                        <option v-for="tag in tags" :key="tag.id" :value="{id: tag.id, name: tag.name}"
                        >                           
                           {{ tag.name }}                      
                        </option>                  
                    </select>
                    <div v-if="selectedTags.length > 0" class="py-4 text-xs text-red-500">
                        Selected:
                        <span v-for="(tag, index) in selectedTags" :key="index" class="ml-0.5 first:ml-0 after:content-[','] last:after:content-['\0020'] text-blue-700">
                            {{tag.name}}
                        </span>
                    </div>
                </div>
                                
                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="name">Name</label>
                    <input 
                        v-model="product.name"
                        id="name" 
                        type="text" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        placeholder="Enter product name"
                    >
                </div>

                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="sku">SKU</label>
                    <input 
                        v-model="product.sku"
                        id="sku" 
                        type="text" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        placeholder="Enter product sku"
                    >
                    <span v-if="skuLength > 0" class="text-xs italic text-gray-500">Length: {{skuLength}}, Limit(12)</span>
                    <span v-else class="text-xs italic text-gray-500">*Leave blank will genarate automatically.</span>
                </div>
                <div class="grid grid-cols-2 gap-4 bg-slate-100 rounded-md p-2">
                    
                    <div>
                        <label for="unit" class=" text-gray-600 dark:text-gray-400 text-sm">Product Unit</label>
                        <select 
                            v-model="product.unit" id="unit" 
                            class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                             <option disabled value="">Please select one</option>
                            <optgroup 
                                v-for="unit in units" :key="unit.id" 
                                :label="unit.name"
                            >
                                <option v-for="child in unit.children" :key="child.id" :value="child.name"
                                >                           
                                {{ child.name }}                            
                                </option> 
                            </optgroup>                   
                        </select>                    
                    </div>
                    <div>
                        <label class="text-gray-600 dark:text-gray-200 text-sm" for="unit_quantity">Unit Quantity</label>
                        <input 
                            v-model="product.unit_quantity"
                            id="unit_quantity" 
                            type="text" 
                            class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder="Enter unit qty"
                        >
                    </div>

                    <div class="col-span-2">
                        <label class="text-gray-600 dark:text-gray-200 text-sm" for="name">Price of <span v-if="product.unit_quantity" class="ml-1 text-blue-600 font-semibold">{{product.unit_quantity}} {{product.unit}} </span> </label>
												<div class="relative flex items-center">
													<span class="pointer-events-none absolute left-0 top-1 py-2 flex items-center px-3 border border-r-0 rounded-l-md bg-gray-100 text-gray-600 sm:text-sm">
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
															<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 005.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg>
													</span>
                        <input 
                            v-model="product.price"
                            id="price" 
                            type="text" 
                            class="block w-full px-14 py-2 mt-1 mb-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder="Enter product price"
                        >
											</div>
                    </div>                    
                </div>

                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label class="text-gray-600 dark:text-gray-200 text-sm" for="name">Stock Quantity</label>
                        <input 
                            v-model="product.quantity"
                            id="quantity" 
                            type="number" 
                            class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder="Enter product quantity"
                            :class="[has('quantity') ? 'border-pink-600 text-pink-600' : 'border-gray-200']"
                        >
                        <p 
                            class="mb-2 text-pink-600 text-sm" 
                            v-if="has('quantity')"
                            v-text="get('quantity')"
                        ></p>
                    </div>
                    
                    <div>
                        <label for="discount_id" class=" text-red-400 dark:text-gray-400 text-sm">Discount</label>
                        <select 
                            v-model="product.discount_id" id="discount_id" 
                            class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                             <option disabled :value="null">Please select one</option>

                            <optgroup 
                                v-for="(discount, index) in discounts" :key="index" 
                                :label="discount.name"
                            >                   
                            <option v-if="discount.active" :value="discount.id"
                            >                           
                                starting: {{ discount.starting }} 
                                ending: {{ discount.ending }} 
                                rate: {{ discount.amount }} %                           

                            </option> 
                            </optgroup>
                        </select>                    
                    </div>
                </div>              

                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="description">Description</label>
                 
                    <textarea 
                        v-model="product.description"
                        id="description" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter product description"></textarea>
                </div>
                
                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="title">Meta Title</label>
                 
                    <textarea 
                        v-model="product.meta.title"
                        id="title" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter meta title"></textarea>
                </div>
                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="metaDescription">Meta Description</label>
                 
                    <textarea 
                        v-model="product.meta.description"
                        id="metaDescription" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter meta description"></textarea>
                </div>                
                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="metaKeywords">Meta Keywords</label>
                 
                    <textarea 
                        v-model="product.meta.keywords"
                        id="metaKeywords" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter meta keywords"></textarea>
                </div>
                 
                <ImageUpload
                    :saved="isImagesSaved" 
                    directory="products"
                    @uploaded="handleUploaded"
                    @removed="handleRemoved" 
                />
            </div>

            <div class="flex justify-center mt-8 gap-4">
                <button class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Cancel</button>
                <button @click.prevent="save" type="button" :disabled="!isValid" class="px-10 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300">Save</button>
            </div>
        </form>
        <loader action="saving" :active="loader" />            
    </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import units from '/assets/units.json';

export default {
    layout: 'dashboard',
    head() {
        return {
            title: 'Add Product',            
        }
    },
    data() {
        return {
            selectedCategories: [],
            selectedTags: [],
            isImagesSaved: false,        
            product: {
                // id: '',
                name: '',
                slug: '',
                description: '',
                sku: '',
                price: '',
                unit: '',
                unit_quantity: '',
                quantity: '',
                discount_id: null,
                category: '', 
                tags: [],
                active: true,
                image: null,
                directory: null,
                meta: {
                    title: '',
                    description: '',
                    keywords: ''
                } 
            },
            units: [],      
            isNewKeywords: false,
            newKeywords: '',
            loader: false,
        }
    },    
    mounted() {
      this.units = units;
      this.getCategories();
      this.getTags();
      this.getDiscounts();        
    },    
    computed: {
        ...mapState('categories', [
            'categories',
        ]),        
        ...mapState('tags', [
            'tags',
        ]),        
        ...mapState('discounts', [
            'discounts',
        ]),
        ...mapGetters('errors', [
            'has',
            'get',
            'any'
        ]),
        
        isValid() {            
            return (this.product.name !== '' &&
            this.product.description !== '' 
            ) ? true : false;
        },
        skuLength() {
            return this.product.sku.length;
        }
    },
    methods: {
        ...mapActions('categories', [
            'getCategories',
        ]),   
        ...mapActions('products', [
            'getProducts',           
        ]),     
        ...mapActions('tags', [
            'getTags',           
        ]),     
        ...mapActions('discounts', [
            'getDiscounts',           
        ]),     
        toggleNewKeywords() {
            this.isNewKeywords = !this.isNewKeywords;
        },        
        getSelected(item) {
            let arr = [];
            if (item==='categories') {
                this.selectedCategories.forEach(element => {
                        arr.push(element.id);
                });
                console.log('CatIDs', arr);
                return arr;
            }
            this.selectedTags.forEach(element => {
                        arr.push(element.id);
                });
                console.log('TagIDs', arr);
                return arr;
        },
        handleUploaded(image) {             
            this.product.image = image.name;
        },
        handleRemoved(image) {
            this.product.image = null;
        },      
        save() {
            this.loader = true;
            this.isImagesSaved = false;
            this.product.slug = this.product.name;
            this.product.tags = this.getSelected('tags');
            if (!Array.isArray(this.product.meta.keywords)) {
                let keywordsArray = this.product.meta.keywords.split(',');
                this.product.meta.keywords = keywordsArray;
            }
            
            this.$axios.$post('/products', this.product)
            .then(response => {
                this.isImagesSaved = true;
                this.$toast.info('New Product Created');
                this.loader = false;
                this.reset();
            })
            .catch(error => {                
                this.loader = false;
                this.setErrors(error.response.data.errors);
            })            
        },
        reset() {
            this.product = {
                name: '',
                slug: '',
                description: '',
                sku: '',
                price: '',
                unit: '',
                unit_quantity: '',
                quantity: '',
                discount_id: null,
                category: '',
                tags: [],
                active: true,
                image: null,
                directory: null,
                meta: {
                    title: '',
                    description: '',
                    keywords: ''
                } 
            }
        }        
    }
}
</script>