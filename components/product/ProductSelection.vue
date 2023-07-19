<template>
  <div>
    <form>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-4">
                <div class="grow">
                    <label for="categoryLevel" class=" text-gray-600 dark:text-gray-400 text-sm">Select Category</label>
                    <select 
                        v-model="selectedCategory" id="categoryLevel" 
                        class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option disabled value="">Please select one</option>
                        <optgroup 
                            v-for="category in categories" :key="category.id" 
                            :label="category.name"
                        >
                            <option v-for="child in category.children" :key="child.id" :value="child.slug"
                            >                           
                            {{ child.name }}                            
                            </option> 
                        </optgroup>                   
                    </select>                    
                </div>                            
            </div>            
        </div>          
        <div class="my-4 flex gap-4 items-start">
					<div v-show="products.length > 0" class="p-2 rounded-lg flex-auto w-64">
						<h1 class="text-gray-600 mb-2 font-semibold">Select Product</h1>
						<ul class="rounded-lg h-96 overflow-y-auto bg-slate-100">
								<li 
										v-for="product in products" 
										:key="product.id"										
								>        
									<div class="grid grid-cols-5 gap-2 border-b p-2">
										<div class="col-span-3">
											{{ product.name }}- {{ product.unit_quantity}} {{ product.unit }}										
										</div>
										<div>
											<img :src="url(product.featured_image)"  class="h-12" alt="Image">          
										</div>
										<div>
											<button class="float-right" @click.prevent="addProduct(product)"                 >
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-700">
													<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>
											</button>
										</div>
									</div>                									
								</li> 
						</ul>                    
					</div>        
					<div v-show="products.length > 0" class="p-2 rounded-lg flex-auto w-64">
							<h1 class="text-gray-600 mb-2 font-semibold">Selected Products 
								<span class="font-bold" v-show="selectedProducts.length >0">[{{selectedProducts.length}}]</span>
							</h1>
							<Alert :show="showWarning" @close="showWarning = false">
								{{this.warningMsg}}
							</Alert>
						<ul class="rounded-lg h-96 overflow-y-auto bg-cyan-50">
								<li 										
										v-for="selectedProduct in selectedProducts" :key="selectedProduct.id"
								>        
									<div class="grid grid-cols-5 gap-2 border-b p-2">
										<div class="col-span-3">
											{{ selectedProduct.name }}- {{ selectedProduct.unit_quantity}} {{ selectedProduct.unit }}										
										</div>
										<div>
											<img :src="url(selectedProduct.featured_image)"  class="h-12" alt="Image">          
										</div>
										<div>
											<button class="float-right" @click.prevent="removeProduct(selectedProduct)"                 >
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
													<path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>

											</button>
										</div>
									</div>                									
								</li> 
						</ul>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
			loader: false,
            selectedCategory: '',
			offer: {},
            products: [],
            product: '',
            productClicked: '',
			selectedProducts: [],
			showWarning: false,
			warningMsg: '',            
        }
    },    
    mounted() {
		this.offer = JSON.parse(localStorage.getItem('offer'));
        this.getCategories();
    },
    watch: {
        selectedCategory(value) {
            if (value !== '') {
                this.product = '';
                this.getProductsByCategory();
            }
        },        
    },
    computed: {
        ...mapState('categories', ['categories']),
		isValid() {
			return this.selectedProducts.length !== 0;
		},
    },
    methods: {
        ...mapActions('categories', [
            'getCategories',
        ]),   
				addProduct(product) {
					if (this.selectedProducts.length > 0) {
						const found = this.selectedProducts.find(element => element === product);
						if (found === product) {
							this.warningMsg = "Product already selected!"
							this.showWarning = true;
							return;
						}
					}
					//check if product already exists in the offer
					if (this.offer.products.length > 0) {
						const found = this.offer.products.find(element => element.id === product.id);
						if (found) {
							this.warningMsg = "Already exists in the offer!"
							this.showWarning = true;
							return;
						}
					}
					this.selectedProducts.push(product);
				},
				removeProduct(product) {
					const index = this.selectedProducts.indexOf(product);
					if (index !== -1) {
						this.selectedProducts.splice(index, 1);
					}
				},
        
        getProductsByCategory() {            
            this.$axios.$get(`/admin/categories/${this.selectedCategory}/products`)
            .then(response => {
                this.products = [];
                this.products.push(...response.data);
            })
            .catch(error => {
                console.log(error)
            })
        },
				back() {
					this.$router.go(-1);
				},
				save() {
					this.loader = true;					
					this.$axios.$post(`/admin/offer/products`, {
						offer: this.offer.id,
						products: this.selectedProducts,
						})
					.then(response => {
							this.loader = false;
							this.$toast.info('New Product Added');
							this.reset();
					})
					.catch(error => {
							this.loader = false;
							this.setErrors(error.response.data.errors);
					});
				},
				reset() {
					// this.selectedCategory = '';
					this.selectedProducts = [];					
				},
        url(image) {            
            if (typeof image === 'object' && image !== null) {
                let path = `/storage/images/products/small/${image.name}`;
                return `${this.$config.baseURL}${path}`;
            }
            // return 'https://picsum.photos/200/300';
        },        
    },
}
</script>
