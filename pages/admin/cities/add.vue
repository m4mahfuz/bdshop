<template>    
    <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 
            class="pb-2 text-lg text-gray-400 capitalize dark:text-white border-b border-green-100"            
        >
            <span 
                class="border-b-4 border-green-400 pb-2 pr-1"
            > 
                Shipping City
            </span>
        </h2>
        
        <form autoComplete="off" class="mt-8">
            <div class="flex justify-center gap-4">
							<div class="grid grid-cols-12 gap-4">
                <div class="col-span-6">
                  <Divisions @option-selected="handleOptionSelectedForDivision" />
                </div>                
                <div class="col-span-6">
                  <Districts 
                  @option-selected="handleOptionSelectedForDistrict"
                  :division="selectedDivision" 
                  />
                </div>
                                
                <div class="col-span-6">
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="name">Name</label>
                    <input 
                        v-model="shipping.city"
                        id="name" 
                        type="text" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-gray-50 border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring"
												:class="[has('city') ? 'border-pink-600 text-pink-600 focus:border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-300']"
                        placeholder="City name"
                        disabled
                    >
										<p 
											class="mb-2 text-pink-600 text-sm" 
											v-if="has('city')"
											v-text="get('city')"
										></p>
                </div>
                <div class="col-span-6">
                  <label for="type" class="text-gray-600 text-sm">Type</label>                       
                  <select 
                      v-model="shipping.shipping_types.type"
                      class="form-select block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" id="type"                      
                  >            
                      <option value="" disabled="true">Please select one</option>                          
                      <option :value="1">Standard</option> 
                      <option :value="2">Express</option> 
                  </select>
                </div>
                <div class="col-span-12 text-gray-600 font-semibold text-sm -mb-2" for="delivery">Delivery</div>
                <div class="col-span-12 border px-4 pt-2 pb-4 grid grid-cols-12 gap-4 bg-slate-50 rounded-md">
                  <div class="col-span-6">
                    <label class="text-gray-600 text-xs" for="delivery_time_min">Minimum <span v-if="shipping.shipping_types.type" class="pl-1 text-gray-500 text-xs">{{ deliveryUnit }}</span></label>
                    <input 
                        v-model="shipping.shipping_types.delivery_time_min"
                        id="delivery_time_min" 
                        type="number" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring"
												:class="[has('delivery_time_min') ? 'border-pink-600 text-pink-600 focus:border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-300']"
                        placeholder="Enter min delivery time "                        
                    >
										<p 
											class="mb-2 text-pink-600 text-sm" 
											v-if="has('delivery_time_min')"
											v-text="get('delivery_time_min')"
										></p>
                  </div>
                  <div class="col-span-6">
                    <label class="text-gray-600 text-xs" for="delivery_time_max">Maximum <span v-if="shipping.shipping_types.type" class="pl-1 text-gray-500 text-xs">{{ deliveryUnit }}</span></label>
                    <input 
                        v-model="shipping.shipping_types.delivery_time_max"
                        id="delivery_time_max" 
                        type="number" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring"
												:class="[has('delivery_time_max') ? 'border-pink-600 text-pink-600 focus:border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-300']"
                        placeholder="Enter max delivery time"                        
                    >
										<p 
											class="mb-2 text-pink-600 text-sm" 
											v-if="has('delivery_time_max')"
											v-text="get('delivery_time_max')"
										></p>
                  </div>
                    
                </div>
                <div class="col-span-6">
                  <label class="text-blue-600 text-sm" for="charge">Charge (<HelperTkSymbol />)</label>
                  <input 
                        v-model="shipping.shipping_types.shipping_charge.charge"
                        id="charge" 
                        type="number" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring border-gray-200 focus:border-blue-400 focus:ring-blue-300"												
                        placeholder="Enter charge"
                    >
                </div>
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
            title: 'Add Tag',            
        }
    },
    data() {
        return {            
            shipping: {
                // id: '',
                active: true,                 
                city: '',
                shipping_types: {
                  active: true,
                  type: '',
                  delivery_time_min: '',
                  delivery_time_max: '',
                  shipping_charge: {
                    active: true,
                    charge: ''
                  }
                }    					
            },  
            selectedDivision: '',
            // selectedDistrict: '',
            loader: false,
        }
    },    
    mounted() {
      this.getCategories();
    },        		
    computed: {        
        ...mapGetters('errors', [
            'has',
            'get',
            'any'
        ]),
        deliveryUnit() {
          return this.shipping.shipping_types.type === 1 ? 'Days' : 'Hours';
        },        
        isValid() {            
            return (this.shipping.city !== '' &&
                this.shipping.shipping_types.type !== '' && 
                this.shipping.shipping_types.delivery_time_min  !== '' && 
                this.shipping.shipping_types.delivery_time_max !== '' && 
                this.shipping.shipping_types.shipping_charge.charge !== '' &&
                this.validDelivery
            ) ? true : false;
        },
        validDelivery() {
          return (this.shipping.shipping_types.delivery_time_max > this.shipping.shipping_types.delivery_time_min) ? true : false;
        }
    },
    methods: {
        ...mapActions('categories', [
            'getCategories',
        ]),   
        ...mapActions('tags', [
            'getTagsByCategory',
        ]),   
				...mapActions('errors', ['setErrors', 'resetErrors']),
        handleOptionSelectedForDivision(option) {
          this.selectedDivision = option;
        },
        handleOptionSelectedForDistrict(option) {
          this.shipping.city = option;
        },
				back() {
					this.$router.back();
				},
        save() {
            this.loader = true;            
            this.$axios.$post('/admin/shippings', this.shipping)
            .then(response => {
                this.$toast.info('New Shipping City Created');
                this.loader = false;
                this.reset();								
            })
            .catch(error => {                
                this.loader = false;
                this.setErrors(error.response.data.errors);
            })            
        },
        reset() {
            this.shipping = {
                // city: '',
                shipping_types: {
                  type: '',
                  delivery_time_min: '',
                  delivery_time_max: '',
                  shipping_charge: {
                    charge: ''
                  }
                }    					
            };
            // this.selectedDivision = ''; 
            this.resetErrors()
        }        
    }
}
</script>