<template>
  <section>
    <div class="px-4 py-4 flex justify-end items-center bg-slate-50 mb-2 rounded-lg">
	 	<!-- <span class="text-sm">Products: <span class="font-semibold text-blue-600">{{categoriesFlat.length}} </span></span> -->
      <nuxt-link to="/admin/products/add" class="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-white text-sm">Add Product</nuxt-link>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" class="px-6 py-3">
      Name
      </th>
      <th scope="col" class="px-4 py-3">
      Description
      </th>
      <th scope="col" class="px-4 py-3">
      Image
      </th>
      <th scope="col" class="px-4 py-3">
        Category
      </th>  
      <th scope="col" class="px-4 py-3">
        Active
      </th>  
      <th scope="col" class="px-4 py-3">
        <span class="sr-only">Action</span>
      </th>
      </tr>
      </thead>
      <tbody>
      <tr 
        v-for="(product, index) in products" class="border-b odd:bg-white even:bg-gray-50"
        :key="index"
      >
      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          <nuxt-link
            :to="`/admin/products/${product.slug}`"
          >{{product.name}}
          </nuxt-link>
      </td>
      <td class="px-4 py-4">
        {{product.description}}
      </td>
      <td class="px-4 py-4">
        <div v-if="product.featured_image !== null">
          <a :href="imageLink(product.featured_image)" target="_blank" rel="noopener noreferrer"> 
            <img :src="url(product.featured_image)"  class="h-full" alt="Product's Image">
          </a>
        </div>
      </td>
      <td class="px-4 py-4">
        <span v-for="(category, index) in product.categories" :key="index" class="ml-1 first:ml-0 after:content-[','] last:after:content-['\0020']">
            {{category.name}}
        </span>
      </td>
      <td class="px-4 py-4">
          <ToggleInput 
            :item="product" 
            :status="product.active" 
            @toggleInput="handleToggleInput"
          />
      </td>  
      <td class="px-4 py-2">
        <button type="button" @click.prevent="uploadImages(product)"> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-sky-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </button>

        <button type="button" @click.prevent="edit(product)"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        
        <button type="button" @click.prevent="remove(product)"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>        
      </td>
      </tr>
      </tbody>
      </table>
    </div>
    <div class="flex justify-end gap-4 mt-6">
        {{page}}
      <button @click.prevent="previous" type="button" :disabled="links.prev===null" class="w-32 text-center py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300">Previous</button>

      <button @click.prevent="next" type="button" :disabled="links.next===null" class="w-32 text-center py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 disabled:bg-orange-300">Next</button>      
    </div>
    <loader :action="action" :active="loader" />
  </section>
</template>

<script>
import swal from 'sweetalert';
import { mapState, mapGetters, mapActions } from "vuex";
import Loader from '../../../components/Loader.vue';
import ToggleInput from '../../../components/ToggleInput.vue';

export default {
  components: { ToggleInput, Loader },
    layout: 'dashboard',
    data() {
        return {
			action: '',
			loader: false,
            page: 0
        }
    },
    async mounted() {
      this.loader = true;
      await this.getProducts();
      this.page++;
      this.loader = false;
      
    },
	  computed: {
        ...mapState('products', [
            'products',
            'meta',
            'links',
        ]),
    },
    methods: {
        ...mapActions('products', [
            'getProducts',
            'deleteCategory'		
        ]),
        async previous() {
            this.loader = true;
            await this.getProducts(this.links.prev);
            this.page--;
            this.loader = false;
        },
        async next() {
            this.loader = true;
            await this.getProducts(this.links.next);
            this.page++;
            this.loader = false;
        },
      edit(product) {
        this.action = 'updating';
        localStorage.setItem('product', JSON.stringify(product))
        this.$router.push(`/admin/products/${product.slug}/edit`)
      },
      uploadImages(product) {
        localStorage.setItem('product', JSON.stringify(product))
        this.$router.push(`/admin/products/${product.slug}/images`)
      },
      remove(product) {
        swal({
            title: "Are you sure?",
            text: `This '${product.name}' product will be deleted!`,
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
              this.action = 'deleting';
              this.loader = true;					
              await this.deleteCategory(product);

              this.loader = false;
              swal("Category has been deleted!", {
                icon: 'success',
                // buttons: false,
                timer: 3000,
              });
            }                   
          });
      },        
      handleToggleInput(event) {
        // console.log(event)
        this.loader = true;
        const product = event.item;
        console.log('receiving..');
        this.$axios.$patch(`/products/${product.slug}`, {
          name: product.name,
          slug: product.slug,
          price: product.price?? product.original_price,
        unit: product.unit,
          unit_quantity: product.unit_quantity,
          quantity: product.quantity,
          category: product.category.id,
          description: product.description,
          active: event.value
        }).then(response => {
              this.loader = false;
              this.$toast.success('updated');
          })
          .catch(error => {
              if (error.response.status !== 422) throw error

              this.errors = Object.values(error.response.data.errors).flat();
              this.loader = false;
          })                    
      },
      imageLink(image) {
          let path = `/storage/images/products/medium/${image.name}`;
          return `${this.$config.baseURL}${path}`;
      },
      url(image) {        
      //    let name = image.name;
        if (typeof image === 'object' && image !== null) {
          let path = `/storage/images/products/small/${image.name}`;
          return `${this.$config.baseURL}${path}`;
        }
      return; 
      },
    }

}
</script>

<style>

</style>