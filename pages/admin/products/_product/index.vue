<template>
    <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 
            class="pb-2 text-lg text-gray-400 capitalize dark:text-white border-b border-green-100"            
        >
            <span 
                class="border-b-4 border-green-400 pb-2 pr-1"
            > 
                View Product
            </span>
        </h2>
        
        <form>
          
            <div class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
                
                <div class="grow">                 
                  <label for="categoryLevel" class=" text-gray-600 text-sm">Category</label>   
                  <input 
                      v-if="product.category"
                      v-model="product.category.name" id="categoryLevel" 
                      class="block px-4 py-2 text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                      readonly
                  >
                </div>
    
                <div v-if="product.tags" class="grow">
                    <label for="tagsLevel" class=" text-gray-600 text-sm">Tags</label>
                    <div 
												v-if="product.tags.length > 0"
                        id="tagsLevel" 
                        class="block px-1.5 py-2 text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300"
                    > 
											<span											
												v-for="(tag, index) in product.tags"
												:key="index"
												class="px-2 py-1 mx-1 bg-slate-200 rounded"
											>
												{{tag.name}}
											</span>
                    </div>
										<div 
											v-else
											class="block px-4 py-2 text-sm mt-2 w-full text-gray-900 bg-red-50 rounded-md border border-gray-300"
										> Not Available
										</div>
                </div>
    
                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="name">Name</label>
                    <input 
                        v-model="product.name"
                        id="name" 
                        type="text" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring"
                        readonly
                    >
                </div>

                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="sku">SKU</label>
                    <input 
                        v-model="product.sku"
                        id="sku" 
                        type="text" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md"
                    >
                </div>

                <div class="grid grid-cols-2 gap-4 bg-slate-100 rounded-md p-2">                    
                    <div>
                        <label for="unit" class=" text-gray-600 text-sm">Product Unit</label>
                        <input 
                            v-model="product.unit" id="unit" 
                            type="text"
                            class="block px-4 py-2 text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                        >
                    </div>
                    <div>
                        <label class="text-gray-600 text-sm" for="unit_quantity">Unit Quantity</label>
                        <input 
                            v-model="product.unit_quantity"
                            id="unit_quantity" 
                            type="text" 
                            class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md"
                            readonly
                        >
                    </div>

                    <div class="col-span-2">
                        <label class="text-gray-600 dark:text-gray-200 text-sm" for="name">Price of <span v-if="product.unit_quantity" class="ml-1 text-blue-600 font-semibold">{{product.unit_quantity}} {{product.unit}} </span> </label>
                        <div                            
                            id="price" 
                            type="text" 
                            class="block w-full px-4 py-2 mt-1 mb-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md"                    
                        >
                        Tk {{price}} 
                        </div>
                    </div>                    
                </div>

                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <label class="text-gray-600 text-sm" for="name">Stock Quantity</label>
                        <input 
                            v-model="product.quantity"
                            id="quantity" 
                            type="number" 
                            class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-md"
                            readonly  
                        >                        
                    </div>
                    
                    <div>
                        <label for="discount_id" class=" text-red-400 dark:text-gray-400 text-sm">Discount</label>
                        <div 
                            v-if="product.price && product.discount"
                            id="discount_id" 
                            class="block px-4 py-2 text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ">  
                          {{  product.discount.amount }}
                        </div>   
                        <div 
                          v-else
                            id="discount_id" 
                            class="block px-4 py-2 text-sm mt-2 w-full text-gray-900 bg-red-50 rounded-md border border-gray-300"
                        > Not Available
                        </div>                        
                    </div>
                </div>              

                <div>
                    <label class="text-gray-600 text-sm" for="description">Description</label>
                    <div class="text-xs mt-2 p-2 text-gray-900 rounded-md border border-gray-300">
                      {{ product.description }}
                    </div>
                </div>
                
                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="title">Meta Title</label>
										<div v-if="product.meta" class="text-xs mt-2 p-2 text-gray-900 rounded-md border border-gray-300">
                      {{ product.meta.title }}
                    </div>
										<div 
											v-else
											class="block px-4 py-2 text-sm mt-2 w-full text-gray-900 bg-red-50 rounded-md border border-gray-300"
										> Not Available
										</div>
                </div>
                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="metaDescription">Meta Description</label>
										<div v-if="product.meta" class="flex text-xs mt-2 p-2 text-gray-900 rounded-md border border-gray-300">
                      {{ product.meta.description }}
                    </div>
										<div 
											v-else
											class="block px-4 py-2 text-sm mt-2 w-full text-gray-900 bg-red-50 rounded-md border border-gray-300"
										> Not Available
										</div>
                </div>                
                <div>
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="metaKeywords">Meta Keywords</label>
                    <div 
												v-if="product.meta && product.meta.keywords.length > 0"
                        id="tagsLevel" 
                        class="block px-1.5 py-2 text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300"
                    > 
											<span											
												v-for="(keyword, index) in product.meta.keywords"
												:key="index"
												class="px-2 py-1 mx-1 bg-sky-200 rounded"
											>
												{{ keyword }}
											</span>
                    </div>
										<div 
											v-else
											class="block px-4 py-2 text-sm mt-2 w-full text-gray-900 bg-red-50 rounded-md border border-gray-300"
										> Not Available
										</div>
                </div>
            </div>

            <div class="flex justify-center mt-8 gap-4">
                <button @click.prevent="back" class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Back</button>
                <button @click.prevent="goToEdit(product)" class="px-10 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Edit</button>
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
            title: 'View Product',            
        }
    },
    data() {
        return {            
            loader: false,
        }
    },    
    async mounted() {
			// const product = JSON.parse(localStorage.getItem('product'));
      await this.getProduct(this.$route.params.product);
			console.log(this.product);

      // this.fillupFormByFound(product);
      
    },    
    computed: {
      ...mapState('products', ['product']),
      price() {
        if (this.product.price !== null) {
          return this.product.price;
        }
        return this.product.original_price;
      }
    },
    methods: {
      ...mapActions('products', ['getProduct']),
			back() {
				this.$router.push('/admin/products');
			},	
			goToEdit(product) {
          localStorage.setItem('product', JSON.stringify(product))
          this.$router.push(`/admin/products/${product.slug}/edit`)
			},      
    }
        
}
</script>

<style>

</style>