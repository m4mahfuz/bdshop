<template>
  <div>
    <!-- <h1 class="text-2xl">
      Add Deal
    </h1> -->
      <CategoryProducts @productSelected="handleProductSelected" class="bg-slate-100 rounded-lg p-4" />
      <h1 class="my-4 text-xl text-gray-600">Details</h1>
        <div 
          class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg"
          :class="[deal.deal_type === 'daily' ? 'bg-green-100' : 'bg-sky-100']"
        >
          <div class="col-span-2">
            <label for="dealActive" class=" text-gray-600 dark:text-gray-400 text-sm">Deal Status</label>
            <select 
                v-model="deal.active" id="dealActive" 
                class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option disabled value="">Please select one</option>
                <option :value="1">Active</option> 
                <option :value="0">Inactive</option> 
            </select>                    
          </div>

          <div>
            <label for="dealType" class=" text-gray-600 dark:text-gray-400 text-sm">Deal Type</label>
            <select 
                v-model="deal.deal_type" id="dealType" 
                class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option disabled value="">Please select one</option>
                <option value="daily">Daily</option> 
                <option value="weekly">Weekly</option> 
            </select>                    
          </div>
          
          <div>
            <label for="discountlType" class=" text-gray-600 dark:text-gray-400 text-sm">Discount Type</label>
            <select 
                v-model="deal.amount_type" id="discountlType" 
                class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option disabled value="">Please select one</option>
                <option :value="1">Percentage</option> 
                <option :value="2">Fixed</option> 
            </select>                    
          </div>

          <div>
                <label class="block">
                <span class="text-gray-700">Starting</span>
                <input 
                    type="date" 
                    v-model="deal.starting"
                    class="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  ">
              </label>              
            </div>

            <div v-show="deal.deal_type !== 'daily'">
                <label class="block">
                <span class="text-gray-700">Ending</span>
                <input 
                    type="date" 
                    v-model="deal.ending"
                    class="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  :class="[has('ending') ? 'border-pink-600 text-pink-600' : 'border-gray-200']"
                >
              </label>
              <p 
                class="mb-2 text-pink-600 text-sm" 
                v-if="has('ending')"
                v-text="get('ending')"
              ></p>
            </div>

            <div class="col-span-2">
            <label
                for="dealAmount"
                class="form-label inline-block mb-2 text-blue-600 font-medium"
                >Deal Amount</label
            >
            <input
                type="text"
                v-model="deal.amount"
                class="
                form-control
                block
                w-full
                px-2
                py-2
                text-sm
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                id="dealAmount"
                placeholder="Enter here"
            />
            </div>
            <div class="col-span-2">
              <p 
                class="mb-2 text-pink-600 text-sm" 
                v-if="has('product_id')"
                v-text="get('product_id')"
              ></p>
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
        <loader action="saving" :active="loader" />            
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    layout: 'dashboard',
    data() {
      return {        
        deal: {
          active: 1,
          amount_type: 1,
          amount: '',          
          deal_type: '',
          product_id: '',
          price: '',
          starting: '',
          ending: ''
        },
        loader: false
      }
    },
    mounted() {
      this.deal.deal_type = localStorage.getItem('dealType');
    },
    computed: {
      ...mapGetters('errors', [
        'has',
        'get',
        'any'
      ]),
      isValid() {                        
            return (this.deal.active !== '' &&
            this.deal.amount !== '' &&
            this.deal.amount_type !== '' &&
            this.deal.deal_type !== '' &&
            this.deal.product_id !== '' &&
            this.deal.price !== '' &&
            this.deal.starting !== '' &&           
            this.deal.ending !== ''            
            ) ? true : false;
        },
    },
    methods: {
      ...mapActions('errors', [
        'setErrors',      
        'resetErrors'
      ]),
      handleProductSelected(product) {
        this.deal.product_id = product.id;
        this.deal.price = product.price;
      },
      back() {
        this.$router.push('/admin/deals');
      },
      reset() {
        this.deal.active = '';
        this.deal.amount = '';
        this.deal.amount_type = '';
        // this.deal.deal_type = '';
        this.deal.product_id = '';
        this.deal.price = '';
        this.deal.starting = '';           
        this.deal.ending = '';  
        this.resetErrors();          
      },
      save() {
        this.loader = true;
        if (this.deal.deal_type === 'daily') {
          this.deal.ending = this.deal.starting;
        }
        this.$axios.$post(`/admin/${this.deal.deal_type}/deals`, this.deal)
        .then(response => {
            this.loader = false;
            this.$toast.info('New Deal Created');
            this.reset();
        })
        .catch(error => {
            this.loader = false;
            this.setErrors(error.response.data.errors);
        });
      }
    }
}
</script>