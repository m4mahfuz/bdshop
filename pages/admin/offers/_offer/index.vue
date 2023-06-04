<template>
    <div class="container">            
      <!-- <div class="grid grid-cols-2 gap-2 items-start"> -->
      <Alert :show="showAlert">
       Status updated to '{{status}}' successfully!
      </Alert>
      <Loader :active="loader" />
      <div class="flex gap-4">        
        <div class="basis-1/2 flex-col">
         <!-- <div class="bg-red-100"> -->
          <Card class="p-3 bg-white">
            <h1 class="mb-3 border-b pb-1"><span class="border-b-2 border-gray-500 pb-1">Offer Details</span></h1>
            <div class="grid grid-cols-6 text-xs">
              <span class="col-span-2 border p-2 rounded-tl">Name</span>
              <span class="col-span-4 border border-l-0 p-2 rounded-tr">{{offer.name}}</span>
              <span class="col-span-2 border border-t-0 p-2">Type</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2">{{offer.type}}</span>
              <span class="col-span-2 border border-t-0 p-2">Amount</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2 font-semibold text-red-500"                
              >{{offer.amount}}</span>
              
              <span class="col-span-2 border border-t-0 p-2">Starting</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2">{{offer.starting}}</span>

              <span class="col-span-2 border border-t-0 p-2">Ending</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2">{{offer.ending}}</span>              
              <span class="col-span-2 border border-t-0 p-2">Active</span>
              <span 
                class="col-span-4 border border-t-0 border-l-0 p-2 uppercase"
                :class="offer.active === true ? 'text-red-600' : 'text-blue-600'"              
              >{{offer.active}}</span>              
            </div>
          </Card>       
        </div>
        <div class="basis-1/2 flex-col">
          <Card class="p-4 bg-cyan-50 flex justify-center">
            <button type="button" @click.prevent="addOfferProducts()" class="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white text-sm">Add New Offer Products</button>
          </Card>
        </div>        
      </div>  
  
    <div class="my-4 overflow-x-auto relative shadow-md sm:rounded-lg">
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
                    <th scope="col" class="py-2 px-6">
                        Stock QTY
                    </th>  
                    <th scope="col" class="py-2 px-6">
                        Category
                    </th>
                    <th scope="col" class="py-2 px-6">
                        Status
                    </th>
                    <th scope="col" class="py-2 px-6">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr 
                  v-for="(product, index) in offer.products"
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
                        <div>{{product.name}}</div>
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
                    </td>
                    <td class="py-2 px-6 text-gray-600">
                        {{product.stock_quantity}}
                    </td>
                    <td class="py-2 px-6 text-gray-600">
                      <span v-if="product.category">
                        {{product.category.name}}
                      </span> 
                    </td>
                    <!-- <td class="py-2 px-6 uppercase" :class="product.active === true ? 'text-pink-600' : 'text-blue-600'">
                        {{product.active}}
                    </td> -->
                    <td class="py-2 px-6">
                        <ToggleInput 
                          :item="product" 
                          :status="product.active" 
                          @toggleInput="handleToggleInput"
                        />
                    </td>
                    <td class="py-2 px-6">
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
        id: this.$route.params.offer,
        // offer: {},
        status: '',
        loader: false,
        showAlert: false,
      }
    },
    async mounted() {
      this.loader = true
      // this.offer = JSON.parse(localStorage.getItem('offerToView'));
      // this.status = this.order.status;
      await this.getOffer(this.$route.params.offer)      
      this.loader = false
    },
    computed: {
      ...mapState('offers', ['offer']),
    },    
    methods: {
      ...mapActions('offers', ['getOffer', 'deleteProductFromOffer']),
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
              await this.$axios.$delete(`admin/offers/${this.offer.id}/products/${product.id}`).
              then(respons => {
                this.deleteProductFromOffer(product);
                this.loader = false;
                swal("offer has been deleted!", {
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
        console.log(event)
        // return;
        this.loader = true;
        const product = event.item;
        // console.log(this.convertOfferToNumber(offer.type))
        console.log('receiving..');
        this.$axios.$patch(`admin/offers/${this.offer.id}/products/${product.id}`, {
          // type: this.convertOfferToNumber(offer.type),
          // amount: offer.amount, 
          // name: offer.name,         
          // starting: offer.starting,        
          // ending: offer.ending,                  
          // product: product.id,
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
      addOfferProducts() {
        localStorage.setItem('offer', JSON.stringify(this.offer));
        this.$router.push(`/admin/offers/${this.offer.id}/products/add`);
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