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
                <div class="grow">
                        <label for="productLevel" class=" text-gray-600 dark:text-gray-400 text-sm">Select Product</label>
                        <select 
                            v-model="product" id="productLevel" 
                            class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option disabled value="">Please select one</option>
                            <option 
                                v-for="product in products" 
                                :key="product.id"
                                :value="product"                             
                            >                        
                                {{ product.name }}- {{ product.unit_quantity}} {{ product.unit }}                             
                            </option> 
                        </select>                    
                </div>
            </div>
            <div v-if="product !== ''" class="border px-4 py-4 mt-8">
                <div class="grid grid-cols-2 gap-1">
                    <div>
                        <ul class="space-y-1">
                            <li class="font-semibold">{{product.name}} - {{product.unit_quantity}} {{product.unit}} </li>
                            <li class="text-sm mb-2"><HelperTkSymbol /> {{product.price}}</li>
                            <li v-if="product" class="text-gray-500 text-sm">
                                Available stock: <span class="font-semibold">{{product.inventory.quantity}} </span>                               
                            </li>
                            <li v-if="product" class="text-gray-500 text-sm">SKU: {{product.inventory.sku}}</li>
                        </ul>
                    </div>
                    <div>
                        <img :src="url(product.featured_image)"  class="h-full" alt="Product's Image">
                    </div>
                </div>
            </div>
        </div>                
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            selectedCategory: '',
            products: [],
            product: '',
        }
    },    
    mounted() {
        this.getCategories();
    },
    watch: {
        selectedCategory(value) {
            if (value !== '') {
                this.product = '';
                this.getProductsByCategory();
            }
        },
        product(value) {
            if (value !== '') {                
                this.emitProduct(value);
            }
        }
    },
    computed: {
        ...mapState('categories', ['categories']),
    },
    methods: {
        ...mapActions('categories', [
            'getCategories',
        ]),   
        emitProduct(product) {
            this.$emit('productSelected', product);
        },
        getProductsByCategory() {            
            this.$axios.$get(`/admin/categories/${this.selectedCategory}/products`)
            .then(response => {
                console.log(response.data)
                this.products = [];
                this.products.push(...response.data);
            })
            .catch(error => {
                console.log(error)
            })
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

<style>

</style>