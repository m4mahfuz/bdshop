<template>
    <div>
        <h2 class="text-lg font-semibold text-gray-700 capitalize mb-2">Add New Address</h2>
        <loader :active="loader" action="loading" />
        <section class="max-w-4xl p-2 md:p-6 mx-auto bg-slate-50 rounded-md shadow-md">
          
          <form>
              <div class="grid grid-cols-12 gap-6 mt-4">
                  <div class="col-span-8 md:col-span-6 lg:col-span-4">
                      <label class="text-gray-700" for="title">Title</label>
                      <input v-model="address.title" id="title" type="text" class="block w-full px-4 py-1.5 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      placeholder="Home, Office etc."
                      >
                  </div>
                  <div class="col-start-1 col-span-10 md:col-span-8">
                      <label class="text-gray-700" for="name">Full Name</label>
                      <input v-model="address.name" id="name" type="text" class="block w-full px-4 py-1.5 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      placeholder="Name"
                      >
                  </div>
                  <div class="col-span-10 lg:col-span-8">
                      <label class="text-gray-700" for="address_line">Address</label>
                      <input v-model="address.address_line" id="address_line" type="text" class="block w-full px-4 py-1.5 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      placeholder="Address"
                      >
                  </div>
                  <div class="col-span-8 lg:col-span-4">
                      <label class="text-gray-700" for="city">City</label>
                      <input v-model="address.city" id="city" type="text" class="block w-full px-4 py-1.5 mt-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                      placeholder="City"
                      >
                  </div>
                  <div class="col-span-8">
                      <label class="text-gray-700" for="phone">Phone</label>
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
                  <div class="col-span-6 lg:col-span-4">
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

                  <div class="col-span-10 md:col-span-12">
                    <div class="flex items-center">
                        <input 
                        v-model="address.default_shipping_address"
                        id="default-shipping-address" name="default-shipping-address" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <label for="default-shipping-address" class="ml-2 block text-sm text-gray-700">Set as default shipping address</label>
                    </div>
                  </div>
              </div>

              <div class="md:flex md:gap-6 mt-8">
                  <button 
                    type="button" 
                    @click.prevent="reset()"
                    class="
                    w-full
                    mb-4                    
                    md:w-auto
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
                  >Cancel
                  </button>   

                  <button 
                    @click.prevent="save()"
                    type="button"
                    class="w-full md:w-auto
                    mb-4 px-12 py-2.5 
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
                  >Save</button>
              </div>
          </form>
      </section>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    layout: 'userDashboard',
    data() {
        return {
            address: {
                title: '',
                name: '',
                address_line: '',
                city: '',
                phone: '',
                postal_code: '',
                active: true,
                default_shipping_address: false
            },
            loader: false
        }
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
        ...mapActions('errors', [
            'setErrors',      
            'resetErrors'
        ]),
        save() {
            this.loader = true;     
            this.$axios.$post('/user/addresses', this.address)
            .then(response => {
                this.reset();
                this.loader = false;
                this.$toast.info('New Address Created');
                this.$router.push(localStorage.getItem('redirect'))
            })
            .catch(error => {
                this.setErrors(error.response.data.errors);
                this.loader = false;
            })            
        },
        reset() {
            this.address = {
                title: '',
                name: '',
                address_line: '',
                city: '',
                phone: '',
                active: true
            }
        }
    }
}
</script>