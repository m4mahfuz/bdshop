<template>
  <div>               
        <div 
          class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg"          
        >
          <div class="col-span-1">
            <label for="dealActive" class=" text-gray-600 dark:text-gray-400 text-sm">Offer Status</label>
            <select 
                v-model="offer.active" id="dealActive" 
                class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option disabled value="">Please select one</option>
                <option :value="1">Active</option> 
                <option :value="0">Inactive</option> 
            </select>                    
          </div>

          <div>
            <label for="offerType" class=" text-gray-600 dark:text-gray-400 text-sm">Offer Type</label>
            <select 
                v-model="offer.type" id="offerType" 
                class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option disabled value="">Please select one</option>
                <option :value="1">Percentage</option> 
                <option :value="2">Fixed</option> 
                <option :value="3">Buy 1 Get 1 Free</option> 
                <option :value="4">Buy 2 Get 1 Free</option> 
            </select>                    
          </div>          
          <div class="col-span-2">
            <label
                for="offerName"
                class="form-label inline-block mb-2 text-blue-600 font-medium"
                >Offer Name</label
            >
            <input
                type="text"
                v-model="offer.name"
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
                id="offerName"
                placeholder="Enter here"
            />
            </div>

          <div>
                <label class="block">
                <span class="text-gray-700">Starting</span>
                <input 
                    type="date" 
                    v-model="offer.starting"
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

            <div>
                <label class="block">
                <span class="text-gray-700">Ending</span>
                <input 
                    type="date" 
                    v-model="offer.ending"
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
            <div class="col-span-2" v-if="offer.type === 1 || offer.type === 2">
            <label
                for="dealAmount"
                class="form-label inline-block mb-2 text-blue-600 font-medium"
                >Offer Amount <span v-if="offer.type === 1">(%)</span></label
            >
            <input
                type="text"
                v-model="offer.amount"
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
        offer: {
          active: 1,
          name: '',
          amount: null,          
          type: '',
          starting: '',
          ending: ''
        },
        loader: false
      }
    },
    mounted() {
    //   this.offer.type = localStorage.getItem('offerType');
    },
    computed: {
      ...mapGetters('errors', [
        'has',
        'get',
        'any'
      ]),
      amountChecking() {        
        if (this.offer.type === 1 || this.offer.type === 2) {
          if (this.offer.amount === '') {
            return false;
          }
        }
        return true;
      },
      isValid() {                        
            return (this.offer.active !== '' &&
            this.amountChecking  &&
            this.offer.name !== '' &&
            this.offer.type !== '' &&
            this.offer.starting !== '' &&           
            this.offer.ending !== ''            
            ) ? true : false;
        },
    },
    methods: {
      ...mapActions('errors', [
        'setErrors',      
        'resetErrors'
      ]),
      
      back() {
        this.$router.push('/admin/offers');
      },
      reset() {
        this.offer.active = '';
        this.offer.amount = '';
        this.offer.type = '';
        // this.offer.product_id = '';
        // this.offer.price = '';
        this.offer.starting = '';           
        this.offer.ending = '';  
        this.resetErrors();          
      },
      save() {
        this.loader = true;        
        this.$axios.$post(`/admin/offers`, this.offer)
        .then(response => {
            this.loader = false;
            this.$toast.info('New Offer Created');
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