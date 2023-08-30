<template>
    <div>
        <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-2">Edit Address</h2>
        <loader :active="loader" :action="action" />
        <section class="max-w-4xl p-6 mx-auto bg-slate-50 rounded-md shadow-md dark:bg-gray-800">
          
          <form>
              <div class="grid grid-cols-12 gap-6 mt-4">
                  <div class="col-span-4">
                      <label class="text-gray-700 dark:text-gray-200" for="title">Title</label>
                      <input v-model="address.title" id="title" type="text" class="block w-full px-4 py-1.5 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      placeholder="Home, Office etc."
                      >
                  </div>
                  <div class="col-start-1 col-span-8">
                      <label class="text-gray-700 dark:text-gray-200" for="name">Full Name</label>
                      <input v-model="address.name" id="name" type="text" class="block w-full px-4 py-1.5 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      placeholder="Name"
                      >
                  </div>
                  <div class="col-span-8">
                      <label class="text-gray-700 dark:text-gray-200" for="address_line">Address</label>
                      <input v-model="address.address_line" id="address_line" type="text" class="block w-full px-4 py-1.5 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      placeholder="Address"
                      >
                  </div>
                  <div class="col-span-4">
                      <label class="text-gray-700 dark:text-gray-200" for="city">City</label>
                      <select
                        v-model="address.city"
                        class="form-select block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" id="city"        
                    >
                        <option value="" :disabled="true">Please select one</option>         
                        <option v-for="city in cities" :value="city.city" :key="city.id">
                            {{ city.city }}
                        </option>                             
                    </select>
                  </div>
                  <div class="col-span-8">
                      <label class="text-gray-700 dark:text-gray-200" for="phone">Phone</label>
                      <input v-model="address.phone" id="phone" type="text" class="block w-full px-4 py-1.5 mt-2 text-sm text-gray-700 bg-white border rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      :class="[has('phone') ? 'border-pink-600 text-pink-600' : 'border-gray-200']"
                      placeholder="Phone"
                      >
                      <p 
                          class="my-2 text-pink-600 text-sm" 
                          v-if="has('phone')"
                          v-text="get('phone')"
                      ></p>
                  </div>
                  <div class="col-span-4">
                      <label class="text-gray-700" for="postal_code">Postal Code</label>
                      <input v-model="address.postal_code" id="postal_code" type="text" class="block w-full px-4 py-1.5 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      :class="[has('postal_code') ? 'border-pink-600 text-pink-600' : 'border-gray-200']"
                      placeholder="Postal Code"
                      >
                      <p 
                          class="my-2 text-pink-600 text-sm" 
                          v-if="has('postal_code')"
                          v-text="get('postal_code')"
                      ></p>
                  </div>

                  <div class="col-span-12">
                    <div class="flex items-center">
                        <input 
                        v-model="address.default_shipping_address"
                        id="default-shipping-address" name="default-shipping-address" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label for="default-shipping-address" class="ml-2 block text-sm text-gray-700">Set as default shipping address</label>
                    </div>
                  </div>
              </div>

              <div class="flex justify-end gap-6 mt-8">
                  <button 
                    type="button" 
                    @click.prevent="back()"
                    class="
                    px-6
                    py-2.5                    
                    bg-gray-300
                    text-gray-700
                    font-medium
                    text-sm
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-gray-500 hover:text-white hover:shadow-lg
                    focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-gray-500 active:text-white active:shadow-lg
                    transition
                    duration-150
                    ease-in-out"          
                  >Back
                  </button>   

                  <button 
                    @click.prevent="update(address)"
                    type="button"
                    class="px-12 py-2.5 
                    bg-blue-600
                    text-white
                    font-medium
                    text-sm
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out
                    disabled:bg-blue-300
                    disabled:cursor-not-allowed"
                  :disabled="!isValid"
                  >Update</button>
              </div>
          </form>
      </section>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    layout: 'userdashboard',
    data() {
        return {
            address: {
                id: '',
                title: '',
                name: '',
                address_line: '',
                city: '',
                phone: '',
                postal_code: '',
                active: true,
                default_shipping_address: false
            },
            action: 'loading',
            loader: false
        }
    },
    mounted() {
      this.getShippingCities();
      let address = JSON.parse(localStorage.getItem('addressToEdit'));
      this.fillupFormBy(address);
    },
    watch: {     
      'address.phone'(value) {
          if (value === '' && this.has('phone')) {
              this.resetErrors();
          }        
      },
      'address.postal_code'(value) {
          if (value === '' && this.has('postal_code')) {
              this.resetErrors();
          }        
      }
    },
    computed: {
        ...mapState('cities', ['cities']),
        ...mapGetters('errors', [
            'has',
            'get',
        ]),  
        isValid() {
            return (
                this.address.title !== '' &&                
                this.address.name !== '' &&                
                this.address.address_line !== '' &&                
                this.address.city !== '' &&                
                this.address.phone !== '' &&                
                this.address.postal_code !== ''                
            ) ?
            true : false;
        },
    },
    methods: { 
        ...mapActions('cities', ['getShippingCities']),       
        ...mapActions('errors', [
            'setErrors',      
            'resetErrors'
        ]),
        back() {
          localStorage.removeItem('addressToEdit');  
          this.$router.push('/user/addressbook');
        },
        fillupFormBy(address) {
            this.address.id = address.id
            this.address.title = address.title
            this.address.name = address.name
            this.address.address_line = address.address_line
            this.address.city = address.city
            this.address.phone = address.phone
            this.address.postal_code = address.postal_code
            this.address.active = address.active
            this.address.default_shipping_address = (address.id === this.$auth.$state.user.default_shipping_address)?? false
        },
        update(address) {
            this.action = 'updating'
            this.loader = true;                 
            this.$axios.$patch(`/user/addresses/${address.id}`, address)
            .then(response => {
                this.back();
                this.loader = false;                
                this.$toast.info('Address Updated Successfully!');
            })
            .catch(error => {
                this.setErrors(error.response.data.errors);
                this.loader = false;
            })            
        },        
    }
}
</script>