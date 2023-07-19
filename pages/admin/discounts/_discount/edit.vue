<template>
  <div>    
        <div 
          class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg"          
        >
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
                <button @click.prevent="update(discount)" type="button" :disabled="!isValid" class="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300">Update</button>
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
					id: '',
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
    //   this.discount.type = localStorage.getItem('offerType');
    let discount = JSON.parse(localStorage.getItem('discount'));    
    this.fillupFormByFound(discount);        
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
      fillupFormByFound(discount) {
        this.discount = {
          id: discount.id,
          active: discount.active ? 1 : 0,
          name: discount.name,
          description: discount.description,
          amount: discount.amount,          
          limit: discount.limit,          
          starting: this.convertDateFormat(discount.starting),
          ending: this.convertDateFormat(discount.ending),
        }
      },  
      convertDateFormat(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();        
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      },    
      
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
      update(discount) {
        this.loader = true;        
        if (this.any()) {
					this.resetErrors();
        }
        this.$axios.$put(`/admin/discounts/${discount.id}`, discount)
        .then(response => {
            this.loader = false;
            this.updateLocalStorage(discount);            
            this.$toast.info('Offer Updated');
            // this.reset();
        })
        .catch(error => {
            this.loader = false;
            this.setErrors(error.response.data.errors);
        });
      },
      updateLocalStorage(discount) {
        localStorage.setItem('discount', JSON.stringify(discount));
      }
    }
}
</script>