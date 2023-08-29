<template>    
    <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 
            class="pb-2 text-lg text-gray-400 capitalize dark:text-white border-b border-green-100"            
        >
            <span 
                class="border-b-4 border-green-400 pb-2 pr-1"
            > 
                Shipping Partner
            </span>
        </h2>
        
        <form autoComplete="off" class="mt-8">
            <div class="flex justify-center gap-4">
							<div class="grid grid-cols-12 gap-4">                
                                
                <div class="col-span-8">
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="name">Name</label>
                    <input 
                        v-model="shipper.name"
                        id="name" 
                        type="text" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring"
												:class="[has('name') ? 'border-pink-600 text-pink-600 focus:border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-300']"
                        placeholder="Courier name"                        
                    >
										<p 
											class="mb-2 text-pink-600 text-sm" 
											v-if="has('name')"
											v-text="get('name')"
										></p>
                </div>
                <div class="col-span-12">
                    <label class="text-gray-600 dark:text-gray-200 text-sm" for="address">Address</label>
                    <input 
                        v-model="shipper.address"
                        id="address" 
                        type="text" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring"
												:class="[has('address') ? 'border-pink-600 text-pink-600 focus:border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-300']"
                        placeholder="Courier address"                        
                    >
										<p 
											class="mb-2 text-pink-600 text-sm" 
											v-if="has('address')"
											v-text="get('address')"
										></p>
                </div>
                
                <div class="col-span-6 relative">
                  <label class="text-gray-600 text-sm" for="phone">Phone</label>
                  <input 
                  v-model="shipper.phone"
                  id="phone" 
                  type="number" 
                  class="block w-full px-6 py-2 mt-2 ml-6 text-sm text-gray-900 bg-white border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring"
                  :class="[has('phone') ? 'border-pink-600 text-pink-600 focus:border-red-400 focus:ring-red-300' : 'border-gray-200 focus:border-blue-400 focus:ring-blue-300']"
                  placeholder="Enter phone"
                  >
                  <span 
                    class="absolute left-0 top-8 p-1.5 text-gray-500 bg-gray-200 border border-r-0 rounded-l-md"										
                  >+88										
                  </span>
                  <p 
											class="mb-2 text-pink-600 text-sm" 
											v-if="has('phone')"
											v-text="get('phone')"
										></p>
                </div>
                <div class="col-span-8">
                  <label class="text-blue-600 text-sm" for="url">Web Address</label>
                  <input 
                        v-model="shipper.url"
                        id="url" 
                        type="text" 
                        class="block w-full px-4 py-2 mt-2 text-sm text-gray-900 bg-white border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring border-gray-200 focus:border-blue-400 focus:ring-blue-300"												
                        placeholder="Enter url"
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
            title: 'Add Shipping Partner',            
        }
    },
    data() {
        return {            
            shipper: {
            // id: '',
              active: true,
              name: '',
              address: '',
              phone: '',
              url: ''                  
            },  
            loader: false,
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
            return (this.shipper.name !== '' &&
                  this.address !== '' &&
                  this.phone !== ''  &&
                  this.url !== ''            
            ) ? true : false;
        },        
    },
    methods: {        
				...mapActions('errors', ['setErrors', 'resetErrors']),
        
				back() {
					this.$router.back();
				},
        save() {
            this.loader = true;            
            this.$axios.$post('/admin/shippers', this.shipper)
            .then(response => {
                this.$toast.info('New Shipping Partner Added');
                this.loader = false;
                this.reset();								
            })
            .catch(error => {                
                this.loader = false;
                this.setErrors(error.response.data.errors);
            })            
        },
        reset() {
            this.shipper = {                    					
                shipper: {
                  active: true,
                  name: '',
                  address: '',
                  phone: '',
                  url: ''
                }
            };
            this.resetErrors()
        }        
    }
}
</script>