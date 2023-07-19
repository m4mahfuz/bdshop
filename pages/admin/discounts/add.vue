<template>
  <div>    
        <div 
          class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg"          
        >
          <div class="col-span-1">
            <label for="discountActive" class=" text-gray-600 dark:text-gray-400 text-sm">Discount Status</label>
            <select 
                v-model="discount.active" id="discountActive" 
                class="block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option disabled value="">Please select one</option>
                <option :value="1">Active</option> 
                <option :value="0">Inactive</option> 
            </select>                    
          </div>
         
          <div class="col-span-2">
            <label
                for="discountName"
                class="form-label inline-block mb-2 text-blue-600 font-medium"
                >Discount Name</label
            >
            <input
                type="text"
                v-model="discount.name"
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
                id="discountName"
                placeholder="Enter here"
            />
          </div>
          <div class="col-span-2">
            <label
                for="discountName"
                class="form-label inline-block mb-2 text-blue-600 font-medium"
                >Discount Description</label
            >
            <textarea
                rows="2" 
                v-model="discount.description"
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
                id="discountDescription"
                placeholder="Enter here"
            />
          </div>
          <div class="col-span-1">
            <label
                for="discountAmount"
                class="form-label inline-block mb-2 text-blue-600 font-medium"
                >Amount(%)</label
            >
            <input
                type="text"
                v-model="discount.amount"
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
                id="discountAmount"
                placeholder="Enter here"
            />
          </div>
          <div class="col-span-1">
            <label
                for="amountLimit"
                class="form-label inline-block mb-2 text-blue-600 font-medium"
                >Amount Limit(Tk)</label
            >
            <input
                type="text"
                v-model="discount.limit"
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
                id="amountLimit"
                placeholder="Enter here"
            />
          </div>

          <div>
                <label class="block">
                <span class="text-gray-700">Starting</span>
                <input 
                    type="date" 
                    v-model="discount.starting"
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
                    v-model="discount.ending"
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
        discount: {
          active: 1,
          name: '',
          description: '',
          amount: null,          
          limit: null,
          starting: '',
          ending: ''
        },
        loader: false
      }
    },
    mounted() {    
    },
    computed: {
      ...mapGetters('errors', [
        'has',
        'get',
        'any'
      ]),      
      isValid() {                        
            return (this.discount.active !== '' &&
            this.discount.amount !== ''  &&
            this.discount.limit !== ''  &&
            this.discount.name !== '' &&
            this.discount.description !== '' &&
            this.discount.starting !== '' &&           
            this.discount.ending !== ''            
            ) ? true : false;
        },
    },
    methods: {
      ...mapActions('errors', [
        'setErrors',      
        'resetErrors'
      ]),
      
      back() {
        this.$router.push('/admin/discounts');
      },
      reset() {
        this.discount.active = 1;
        this.discount.amount = null;
        this.discount.limit = null;
        this.discount.name = '';
        this.discount.description = '';
        this.discount.starting = '';           
        this.discount.ending = '';  
        this.resetErrors();          
      },
      save() {
        this.loader = true;        
        this.$axios.$post(`/admin/discounts`, this.discount)
        .then(response => {
            this.loader = false;
            this.$toast.info('New Discount Created');
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