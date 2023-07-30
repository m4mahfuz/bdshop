<template>
    <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 
            class="pb-2 text-lg text-gray-400 capitalize dark:text-white border-b border-orange-100"            
        >
            <span 
                class="border-b-4 border-orange-400 pb-2 pr-1"
            > 
                Edit Product
            </span>
        </h2>
        
        <form>
            <div class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
                <div class="grow">
                    <label for="productLevel" class=" text-gray-600 dark:text-gray-400 text-sm">Select Category</label>
                    <select 
                        v-model="product.category" id="productLevel" 
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
                    
                    <div v-if="existingCategory !== ''" class="p-2 mt-1 rounded text-xs text-sky-500 bg-cyan-50">Existing: 
                        <span class="text-cyan-700">{{existingCategory.name}} </span>
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
                    <div v-if="selectedTags.length > 0" class="p-2 text-xs text-red-500">
                        Selected:
                        <span v-for="(tag, index) in selectedTags" :key="index" class="ml-0.5 first:ml-0 after:content-[','] last:after:content-['\0020'] text-blue-700">
                            {{tag.name}}
                        </span>
                    </div>
                    <div v-if="existingTags.length > 0" class="p-2 mt-1 rounded text-xs text-sky-500 bg-cyan-50">
                        Existing:
                        <span v-for="(tag, index) in existingTags" :key="index" class="ml-0.5 first:ml-0 after:content-[','] last:after:content-['\0020'] text-sky-700">
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
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        placeholder="Enter product name"
												readonly
                    >
                </div>

                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="sku">SKU</label>
                    <input 
                        v-model="product.sku"
                        id="sku" 
                        type="text" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-yellow-50 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
                            class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-yellow-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-yellow-50 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder="Enter unit qty"
                        >
                    </div>

                    <div class="col-span-2">
                        <label class="text-gray-600 dark:text-gray-200 text-sm" for="price">Price of <span v-if="product.unit_quantity" class="ml-1 text-blue-600 font-semibold">{{product.unit_quantity}} {{product.unit}} </span> </label>
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
                            class="block w-full px-14 py-2 mt-1 mb-2 text-sm text-gray-900 bg-yellow-50 border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder="Enter product price"
                        >
												</div>	
                    </div>                    
                </div>

                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label class="text-gray-600 dark:text-gray-200 text-sm" for="quantity">Stock Quantity</label>
                        <input 
                            v-model="product.quantity"
                            id="quantity" 
                            type="number" 
                            class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-yellow-50 border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-yellow-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter product description"></textarea>
                </div>
                
                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="title">Meta Title</label>                 
                    <textarea 											
                        v-model="product.meta.title"
                        id="title" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-yellow-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
												:class="[has('meta.title') ? 'border-pink-600 text-pink-600' : 'border-gray-300']"
												placeholder="Enter meta title"></textarea>
												<p 
													class="mb-2 text-pink-600 text-sm" 
													v-if="has('meta.title')"
													v-text="get('meta.title')"
												></p>
                </div>
                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="metaDescription">Meta Description</label>
                 
                    <textarea 												
                        v-model="product.meta.description"
                        id="metaDescription" 
                        rows="2" 
                        class="block mt-2 p-2.5 w-full text-sm text-gray-900 bg-yellow-50 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
												:class="[has('meta.description') ? 'border-pink-600 text-pink-600' : 'border-gray-300']"
												placeholder="Enter meta description"></textarea>
												<p 
													class="mb-2 text-pink-600 text-sm" 
													v-if="has('meta.description')"
													v-text="get('meta.description')"
												></p>
                </div>    
                 <div>
                    <label class="text-gray-500 dark:text-gray-200 text-sm" for="addNewMetaKeywords">Meta Keywords</label>
										<div class="flex h-100 mt-2 flex-wrap border rounded-md">
												<div class="flex justify-between items-center w-full bg-green-100 p-2 mx-0 mb-2">
														<span
															v-show="product.meta.keywords.length > 0" 
															class="text-sm font-semibold text-blue-500">[{{ product.meta.keywords.length }}] </span>
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
												<div 
													class="p-2 w-full flex justify-start flex-wrap gap-3">
														<span 
																v-for="(keyword, index) in product.meta.keywords" 
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
										<p 
											class="mb-2 text-pink-600 text-sm" 
											v-if="has('meta.keywords')"
											v-text="get('meta.keywords')"
										></p>
                </div>                
            </div>
            <div class="mt-10 flex justify-between">
							<div>
								<button @click.prevent="$router.back()" class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Back</button>
							</div>
              <div class="flex gap-4">
                  <button @click.prevent="reset()" type="button" class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Reset</button>
                  <button @click.prevent="update(product)" type="button" :disabled="!isValid" class="px-10 py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 disabled:bg-orange-300">Update</button>
              </div>
            </div>
        </form>
        <loader action="updating" :active="loader" />            
    </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import units from 'assets/units.json';
export default {
    layout: 'dashboard',
    head() {
        return {
            title: 'Edit Product',            
        }
    },
    data() {
        return {
						existingTags: [],
						existingCategory: '',
            selectedTags: [],
            isImagesSaved: false,
            product: {
                id: '',
                name: '',
                slug: '',
                description: '',
                sku: '',
                price: '',
                unit: '',
                unit_quantity: '',
                quantity: '',
                discount_id: null,
                // categories: [],
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
    async mounted() {
			await this.getProduct(this.$route.params.product);
      this.units = units;
      this.getCategories();
      this.getTags();
      this.getDiscounts();        
			this.fillupFormByFound(this.productAtStore);
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
				...mapState('errors', [
					'errors',
				]),
				...mapGetters('products', ['productAtStore']),
        ...mapGetters('errors', [
            'has',
            'get',
            'any'
        ]),
        isValid() {            
            return (this.product.name !== '' &&
            this.product.description !== '' &&
            this.product.quantity !== '' &&
						this.product.meta.title !== '' &&
						this.product.meta.description !== '' &&
						this.product.meta.keywords.length !== 0

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
            'getProduct', 'remove'           
        ]),     
        ...mapActions('tags', [
            'getTags',           
        ]),     
        ...mapActions('discounts', [
            'getDiscounts',           
        ]),
				...mapActions('errors', ['setErrors', 'resetErrors']),     
				fillupFormByFound(product) {
					this.product = {
                id: product.id,
                name: product.name,
                slug: product.slug,
                description: product.description,
                sku: product.sku,
                price: product.original_price,
                unit: product.unit,
                unit_quantity: product.unit_quantity,
                quantity: product.quantity,
                discount_id: null,
                category: product.category.id, 
                tags: [],
                active: true,
                directory: null,
								meta: {
                    title: '',
                    description: '',
                    keywords: ''
                }
            }
						if (product.meta !== null) {							
							this.product.meta = {
                    title: product.meta.title,
                    description: product.meta.description,
                    keywords: product.meta.keywords
                }
						}

						if (product.tags !== null) {
							product.tags.forEach(tag => {
								this.existingTags.push({
									id: tag.id,
									name: tag.name
								})
							})
						}					
						if (this.productAtStore.category !== '') {
							this.existingCategory = this.productAtStore.category; 
            }
				},
        toggleNewKeywords() {
            this.isNewKeywords = !this.isNewKeywords;
        },
        getSelected(item) {
					let arr = [];            
					this.selectedTags.forEach(element => {
						arr.push(element.id);
					});
					return arr;
        },
        
        reset() {
						this.resetErrors();
        },
        update(product) {
					this.loader = true;
					if (this.any()) {
						this.resetErrors();
					}
					if (this.newKeywords !== '') {
							let keywordsArray = this.mergePrevKeywordsWithNew();
							this.product.meta.keywords = keywordsArray;
					}
					this.$axios.$put(`/products/${product.slug}`, product)
					.then(response => {
							localStorage.removeItem('product');
							this.newKeywords = '';
							this.loader = false;
							this.$toast.info('Product Updated');
					})
					.catch(error => {
							this.loader = false;
							this.setErrors(error.response.data.errors);
					})
        },                
        mergePrevKeywordsWithNew() {            
            let newKeywordsArray = [];
            this.newKeywords.split(',').forEach((element) => {
              newKeywordsArray.push(this.ucfirst(element.trim()));
            });            

            let keywordsArray = newKeywordsArray;

            if (Array.isArray(this.product.meta.keywords) && this.product.meta.keywords.length > 0 ) {
                keywordsArray = [...new Set([...this.product.meta.keywords, ...newKeywordsArray])];
            }
            return keywordsArray;
        },
        ucfirst(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        },
        // remove(index) {
        //     console.log('idx', index);
        //     this.product.meta.keywords.splice(index, 1);
        // }
    }
}
</script>