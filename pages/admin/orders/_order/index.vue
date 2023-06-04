<template>
    <div class="container">            
      <!-- <div class="grid grid-cols-2 gap-2 items-start"> -->
      <Alert :show="showAlert">
       Status updated to '{{status}}' successfully!
      </Alert>
      <Loader :active="loader" />
      <div class="flex gap-4 items-start">        
        <div class="basis-1/2 flex-col">
         <!-- <div class="bg-red-100"> -->
          <Card class="p-3 bg-white">
            <h1 class="mb-3 border-b pb-1"><span class="border-b-2 border-gray-500 pb-1">Order Details</span></h1>
            <div class="grid grid-cols-6 text-xs">
              <span class="col-span-2 border p-2 rounded-tl">Order Placed On</span>
              <span class="col-span-4 border border-l-0 p-2 rounded-tr">{{order.placed_on}}</span>
              <span class="col-span-2 border border-t-0 p-2">Est. Delivery</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2">{{order.delivery_earliest}} to {{order.delivery_latest}}</span>
              <span class="col-span-2 border border-t-0 p-2">Order Status</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2 font-semibold"
                :class="textColorBy(order.status)"
              >{{order.status}}</span>
              
              <span class="col-span-2 border border-t-0 p-2">Shipping Type</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2">{{order.shipping_type}}</span>

              <span class="col-span-2 border border-t-0 p-2">Shipping Charges</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2"><HelperTkSymbol text="text-sm"/> {{parseInt(order.shipping_charge)}}</span>

              <span class="col-span-2 border border-t-0 p-2">Coupon Code</span>
              <span v-if="order.coupon" class="col-span-4 border border-t-0 border-l-0 p-2">{{order.coupon.code}}</span>
              <span v-else class="col-span-4 border border-t-0 border-l-0 p-2"></span>
              <span class="col-span-2 border border-t-0 p-2">Coupon Amount</span>
              <span v-if="order.coupon" class="col-span-4 border border-t-0 border-l-0 p-2"><HelperTkSymbol text="text-xs" /> {{parseInt(order.coupon.discounted_amount)}}</span>              
              <span v-else class="col-span-4 border border-t-0 border-l-0 p-2"></span>
              <span class="col-span-2 border border-t-0 p-2">Order Total</span>
              <span class="col-span-4 border border-t-0 border-l-0 p-2 font-semibold"><HelperTkSymbol text="text-sm"/>  {{parseInt(order.total)}}</span>            
              <span class="col-span-2 border border-t-0 p-2 rounded-bl">Payment Method</span>
              <span class="text-red-500 col-span-4 border border-t-0 border-l-0 p-2 rounded-br">{{order.payment_method}}</span>
            </div>
          </Card>       

          <Card class="mt-3 p-3 bg-white">
            <h1 class="mb-3 border-b pb-1"><span class="border-b-2 border-gray-500 pb-1">Customer Details</span></h1>
            <div class="grid grid-cols-6 text-xs">
              <span class="col-span-2 border p-2 rounded-tl">Name</span>
              <span v-if="order.customer" class="col-span-4 border border-l-0 p-2 rounded-tr">
                {{order.customer.name}}              
              </span>
              <span class="col-span-2 border border-t-0 p-2">Phone</span>
              <span v-if="order.customer" class="col-span-4 border border-t-0 border-l-0 p-2">
                {{order.customer.phone}}              
              </span>
              <span class="col-span-2 border border-t-0 p-2 rounded-bl">Email</span>
              <span v-if="order.customer" class="col-span-4 border border-t-0 border-l-0 p-2 rounded-br">
                {{order.customer.email}}              
              </span>              
            </div>
          </Card>
        </div>

        <div class="basis-1/2 flex-col">                    
          <Card class="p-3 bg-white">
            <h1 class="mb-3 border-b pb-1"><span class="border-b-2 border-gray-500 pb-1">Shipping Details</span></h1>
            <div class="grid grid-cols-6 text-xs">
              <span class="col-span-2 border p-2 rounded-tl">Name</span>
              <span v-if="order.shipping_address" class="col-span-4 border border-l-0 p-2 rounded-tr">
                {{order.shipping_address.name}}              
              </span>
              <span class="col-span-2 border border-t-0 p-2">Address</span>
              <span v-if="order.shipping_address" class="col-span-4 border border-t-0 border-l-0 p-2">
                {{order.shipping_address.address_line}}              
              </span>
              <span class="col-span-2 border border-t-0 p-2">City</span>
              <span v-if="order.shipping_address" class="col-span-4 border border-t-0 border-l-0 p-2">
                {{order.shipping_address.city}}              
              </span>
              <span class="col-span-2 border border-t-0 p-2 rounded-bl">Phone</span>
              <span v-if="order.shipping_address" class="col-span-4 border border-t-0 border-l-0 p-2 rounded-br">
                {{order.shipping_address.phone}}              
              </span>
            </div>
          </Card>
          <Card v-if="order.status==='Shipped' || order.status==='Delivered'" class="mt-3 p-3 bg-white">
              <h1 class="mb-3 border-b pb-1"><span class="text-purple-700 border-b-2 border-purple-500 pb-1">Shipper Details</span></h1>
            <div class="grid grid-cols-6 text-xs">
              <span class="col-span-2 border p-2 rounded-tl">Name</span>
              <span v-if="order.shipping_address.shipment" class="col-span-4 border border-l-0 p-2 font-semibold rounded-tr">
                {{order.shipping_address.shipment.shipper.name}}              
              </span>
              <span class="col-span-2 border border-t-0 p-2">Address</span>
              <span v-if="order.shipping_address.shipment" class="col-span-4 border border-t-0 border-l-0 p-2">
                {{order.shipping_address.shipment.shipper.address}}              
              </span>
              <span class="col-span-2 border border-t-0 p-2">URL</span>
              <span v-if="order.shipping_address.shipment" class="col-span-4 border border-t-0 border-l-0 p-2">
                {{order.shipping_address.shipment.shipper.url}}              
              </span>
              <span class="col-span-2 border border-t-0 p-2 rounded-bl">Phone</span>
              <span v-if="order.shipping_address.shipment" class="col-span-4 border border-t-0 border-l-0 p-2 rounded-br">
                {{order.shipping_address.shipment.shipper.phone}}              
              </span>
              <span class="col-span-2 border border-t-0 p-2 rounded-bl">Tracking No</span>
              <span v-if="order.shipping_address.shipment" class="col-span-4 border border-t-0 border-l-0 p-2 text-pink-700 rounded-br">
                {{order.shipping_address.shipment.tracking_no}}              
              </span>
            </div>
          </Card>

          <Card v-if="showStatusUpdater" class="mt-3 p-3 bg-white">
            
            <h1 class="mb-3 border-b pb-1 text-blue-700"><span class="border-b-2 border-blue-500 pb-1">Update Order Status</span></h1>
            <form>
              <!-- <div class="flex-col space-y-2"> -->
              <div class="flex gap-2"
                :class="status==='Shipped' ? 'flex-col':''"
              >
                <!-- <div class="flex justify-between items-center gap-4"> -->
                <div
                  :class="status==='Shipped' ? 'flex justify-between items-center gap-4':''"
                >
                  <select v-model="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 px-2"
                  >
                    <option disabled value="">Please select status</option>
                    <option v-for="status in statuses" :key="status.id" :value="status.title" :disabled="isAlreadyUsed(status.title)"
                    :class="[isAlreadyUsed(status.title) ?'text-gray-400':'']"
                    >{{ status.title }}</option>              
                  </select>                  
                  <!-- <div v-if="status === 'Shipped'"> -->
                    <select v-model="shipper" v-if="status === 'Shipped'" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full">
                      <option disabled value="">Please select a shipper</option>
                      <option v-for="shipper in shippers" :key="shipper.id" :value="shipper">{{shipper.name}}</option>              
                    </select>                  
                </div> 
                <p v-if="shipper !== ''" class="px-2 pt-2 text-xs text-gray-400">
                <span>address: {{shipper.address}}</span>
                <span class="px-4">phone: {{shipper.phone}}</span>
              </p>
                <!-- <div class="flex flex-row justify-center items-center gap-2 space-y-2"> -->
                <div
                   :class="status==='Shipped' ? 'flex flex-row items-center gap-2 space-y-2':''"
                >
                  <input 
                    v-model="trackingNo"
                    v-if="status === 'Shipped'" id="trackingNo" type="text"
                    class="px-4 py-2.5 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring text-sm"
                    placeholder="Enter tracking number"
                  >                  
                  <button @click.prevent="update()" type="button" class="px-6 py-1.5 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 disabled:bg-blue-300 disabled:cursor-not-allowed" :disabled="!isValid">
                      Update
                  </button>  
                </div>
              </div>
            </form>  
            <ul class="my-3 border-t-2 py-2 space-y-2 text-xs">
              <li v-for="log in orderLogs" :key="log.id" class="flex flex-col gap-1 border-b pb-2">
                <span class="font-semibold">{{ log.status }}:</span>
                <span class="">{{ log.created_at}}</span>
              </li>
            </ul>
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
                        Total
                    </th>                                        
                </tr>
            </thead>
            <tbody>
                <tr 
                  v-for="(product, index) in products"
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
                        <div>{{product.pivot.name}}</div>
                        <p class="text-xs font-light text-gray-500">{{product.unit_quantity}} {{product.unit}}</p>
                        <p v-if="product.pivot.discounted_price !==null">
                          <span class="text-orange-500 text-xs">
                            Price: <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.discounted_price)}}
                          </span>
                          <del class="text-gray-300 text-xs">
                            <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.price)}}
                          </del>
                        </p>
                        <p v-else class="text-xs font-extralight">
                            <HelperTkSymbol text="text-sm" /> {{parseInt(product.pivot.price)}}
                        </p>
                        <p class="text-xs font-light text-gray-600">Qty: {{product.pivot.quantity}}</p>
                    </td>
                    <td class="py-2 px-6">
                        <p v-if="product.pivot.discounted_price !==null">
                          <HelperTkSymbol /> {{totalPriceOf(product.pivot.discounted_price, product.pivot.quantity)}}
                        </p>
                        <p v-else> 
                          <HelperTkSymbol /> {{totalPriceOf(product.pivot.price, product.pivot.quantity)}}
                        </p>
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
  import { mapState, mapActions, mapGetters} from "vuex";

  export default {
    layout: 'dashboard',
    data() {
      return {
        id: this.$route.params.order,
        order: {},
        status: '',
        loader: false,
        showAlert: false,
        shipper: '',
        trackingNo: ''
      }
    },
    async mounted() {
      this.loader = true
      this.order = JSON.parse(localStorage.getItem('orderToView'));
      // this.status = this.order.status;
      await this.getOrderProducts(this.$route.params.order)
      await this.getShippers();
      await this.getOrderStatuses();
      await this.getOrderLogsBy(this.$route.params.order);
      this.loader = false
    },
    
    computed: {    
      ...mapState('orders', ['statuses', 'orderLogs', 'products']),   
      ...mapState('shippers', ['shippers']),   
      ...mapGetters('orders', ['textColorBy']),       
      isValid() {
        if (this.status !== '') {
          if (this.status === 'Shipped') {
            return (this.shipper !=='' && this.trackingNo !== '') ? true : false; 
          }
          return true;
        }
        return false;
      },
      showStatusUpdater() {
        return (this.order.status === 'Cancelled' || this.order.status === 'Delivered') ? false : true;
      },
    },
    methods: {
      ...mapActions('orders', ['getOrderStatuses', 'getOrderLogsBy', 'getOrderProducts']),
      ...mapActions('shippers', ['getShippers']),
      totalPriceOf(price, quantity) {
          return (price * quantity);
      },
      isAlreadyUsed(title) {
        const found = this.orderLogs.find(element => element.status === title);
        return found ? true : false;
      },
      async update() {      
        this.showAlert = false;
        this.loader = true
        let data = {status: this.status};
        if (this.status === 'Shipped') {
          data.shipper_id = this.shipper.id,
          data.tracking_no = this.trackingNo
        }
        await this.$axios.$patch(`/admin/orders/update-status/${this.id}`, data)
        .then(async (response) => {
          this.order.status = data.status;
          if (data.status === 'Shipped') {
            this.order.shipping_address = response.data;
          }
          localStorage.setItem('orderToView', JSON.stringify(this.order));
          localStorage.setItem('updatedOrderStatus', data.status);
          await this.getOrderLogsBy(this.id);
          this.shipper = '',
          this.loader = false;
          this.showAlert = true;
        })
        .catch(error => {
          console.log(error)
          this.loader = false;
        });
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