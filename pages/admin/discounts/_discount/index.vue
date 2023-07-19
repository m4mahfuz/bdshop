<template>
    <div class="container">            
      <Alert :show="showAlert">
       Status updated to '{{status}}' successfully!
      </Alert>
      <Loader :active="loader" />
      <div class="flex gap-4">        
        <div class="basis-1/2 flex-col">
          <Card class="p-3 bg-white">
            <h1 class="mb-3 border-b pb-1"><span class="border-b-2 border-gray-500 pb-1">Discount Details</span></h1>
            <div class="grid grid-cols-6 text-xs">
              <span class="col-span-2 border p-2 rounded-tl">Name</span>
              <span class="col-span-4 border border-l-0 p-2 rounded-tr">{{discount.name}}</span>
              <span class="col-span-2 border border-t-0 p-2">Description</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2">{{discount.description}}</span>
              <span class="col-span-2 border border-t-0 p-2">Amount</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2 font-semibold text-red-500"                
              >{{discount.amount}}</span>

              <span class="col-span-2 border border-t-0 p-2">Limit</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2 font-semibold text-blue-500"                
              >{{discount.limit}}</span>
              
              <span class="col-span-2 border border-t-0 p-2">Starting</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2">{{discount.starting}}</span>

              <span class="col-span-2 border border-t-0 p-2">Ending</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2">{{discount.ending}}</span>              
              <span class="col-span-2 border border-t-0 p-2">Active</span>
              <span 
                class="col-span-4 border border-t-0 border-l-0 p-2 uppercase"
                :class="discount.active === true ? 'text-red-600' : 'text-blue-600'"              
              >{{discount.active}}</span>              
            </div>
          </Card>       
        </div>        
      </div>  
  
      <div class="flex gap-4">        
        <div class="basis-1/2 flex-col">
          <div class="my-4 h-80 overflow-x-auto overflow-y-scroll relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-blue-50">
                    <tr>
                        <th scope="col" class="py-2 pl-4">
                          #
                        </th>
                        <th scope="col" class="py-2 px-6">
                            Image
                        </th>
                        <th scope="col" class="py-2 px-6">
                            Product
                        </th>
                        <th scope="col" class="py-2 px-3">
                            Active
                        </th>
                        <th scope="col" class="py-2 px-3">
                            Category
                        </th>                                          
                    </tr>
                </thead>
                <tbody>
                    <tr 
                      v-for="(product, index) in discount.products"
                      :key="product.id"  
                      class="bg-white border-b"
                    >                    
                        <td class="py-2 pl-4">
                          {{ index+1 }}
                        </td>
                        <td class="w-16 py-2 px-6">
                            <img :src="url(product.featured_image)" alt="img">
                        </td>
                        <td class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap">
                            <div>
                              {{product.name}}
                            </div>
                            <p class="text-xs font-light text-gray-500">{{product.unit_quantity}} {{product.unit}}</p>
                            <p v-if="product.price !==null">
                              <span class="text-orange-500 text-xs">
                                <HelperTkSymbol text="text-sm" /> {{parseInt(product.price)}}
                              </span>
                              <del class="text-gray-300 text-xs">
                                <HelperTkSymbol text="text-sm" /> {{parseInt(product.original_price)}}
                              </del>
                            </p>
                            <p v-else class="text-xs font-extralight">
                                <HelperTkSymbol text="text-sm" /> {{parseInt(product.original_price)}}
                            </p>
                            <p class="font-normal text-gray-500">
                            Stock: 
                              <span class="font-semibold text-gray-700">{{product.stock_quantity}}
                              </span>
                            </p>                        
                        </td>
                        <td class="py-2 px-3 text-gray-600">
                          <span class="uppercase">{{product.active}}</span>                          
                        </td>
                        <td class="py-2 px-3 text-gray-600">
                            {{product.category}}
                        </td>                   
                    </tr>                
                </tbody>
            </table>
        </div>        
        </div>
        <div class="basis-1/2 flex-col">
          <div class="my-4 h-80 overflow-x-auto overflow-y-scroll relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-blue-50">
                    <tr>
                        <th scope="col" class="py-2 pl-4">
                          #
                        </th>
                        <th scope="col" class="py-2 px-6">
                            Image
                        </th>
                        <th scope="col" class="py-2 px-6">
                            Category
                        </th>
                        <th scope="col" class="py-2 px-3">
                            Active
                        </th>                                      
                    </tr>
                </thead>
                <tbody>
                    <tr 
                      v-for="(category, index) in discount.categories"
                      :key="category.id"  
                      class="bg-white border-b"
                    >                    
                        <td class="py-2 pl-4">
                          {{ index+1 }}
                        </td>
                        <td class="w-16 py-2 px-6">
                            <img :src="url(category.image)" alt="img">
                        </td>
                        <td class="py-2 px-6 font-medium text-gray-900 whitespace-nowrap">
                              {{category.name}}                            
                        </td>
                        <td class="py-2 px-3 text-gray-600">
                          <span class="uppercase">{{category.active}}</span>
                        </td>       
                    </tr>                
                </tbody>
            </table>
        </div>        
        </div>
      </div>
    
    <div class="flex justify-end">
      <button 
        type="button"
        @click="$router.go(-1)"
        class="px-6 py-2 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded-md  hover:bg-gray-500 uppercase"
      >back
      </button>
    </div>
  </div>
</template>

<script>
  import swal from 'sweetalert';
  import { mapState, mapActions, mapGetters} from "vuex";

  export default {
    layout: 'dashboard',
    data() {
      return {
        id: this.$route.params.discount,
        // discount: {},
        status: '',
        loader: false,
        showAlert: false,
      }
    },
    async mounted() {
      this.loader = true      
      await this.getDiscount(this.$route.params.discount)      
      this.loader = false
    },
    computed: {
      ...mapState('discounts', ['discount']),
    },    
    methods: {
      ...mapActions('discounts', ['getDiscount', 'deleteProductFromDiscount']),
      remove(product) {
        swal({
            title: "Are you sure?",
            text: `This product #${product.id} will be deleted!`,
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
              await this.$axios.$delete(`admin/discounts/${this.discount.id}/products/${product.id}`).
              then(respons => {
                this.deleteProductFromDiscount(product);
                this.loader = false;
                swal("discount has been deleted!", {
                  icon: 'success',
                  // buttons: false,
                  timer: 3000,
                });
              }).catch(error => {
                  this.loader = false;
                  console.log(error);
              });                
            }                   
          });
      },        
      handleToggleInput(event) {
        this.loader = true;
        const product = event.item;
        this.$axios.$patch(`admin/discounts/${this.discount.id}/products/${product.id}`, {          
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
      addDiscountProducts() {
        localStorage.setItem('discount', JSON.stringify(this.discount));
        this.$router.push(`/admin/discounts/${this.discount.id}/products/add`);
      },      
      url(image) {        
        let path = `/storage/images/products/small/${image}`;
        if (typeof image === 'object' && image !== null) {
          path = `/storage/images/products/small/${image.name}`;
        } 
        return `${this.$config.baseURL}${path}`;
      },    
    }
  }
</script>