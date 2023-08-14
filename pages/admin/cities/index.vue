<template>
    <section>
      <div class="px-4 py-4 flex justify-end items-center bg-slate-50 mb-2 rounded-lg">	 	
        <nuxt-link to="/admin/cities/add" class="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-white text-sm">Add Shipping City</nuxt-link>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        <th scope="col" class="px-4 py-3">
        City
        </th>
        <th scope="col" class="px-4 py-3">
          Active
        </th>
        <th scope="col" class="px-4 py-3">
        Shipping Details
        </th>                        
        <th scope="col" class="px-4 py-3">
          <span class="sr-only">Action</span>
        </th>
        </tr>
        </thead>
        <tbody>
        <tr 
          v-for="city in cities" class="border-b odd:bg-white even:bg-gray-50"
          :key="city.id"
        >
          <td scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ city.city }}
          </td>              
          <td class="px-4 py-4">
              <ToggleInput 
                :item="city" 
                :status="city.active" 
                @toggleInput="handleToggleInput"
              />
          </td>
          <td class="px-4 py-4">
            <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-slate-100">
            <tr>
            <th scope="col" class="px-4 py-3">
            Type
            </th>
            <th scope="col" class="px-4 py-3">
            Charge
            </th>
            <th scope="col" class="px-4 py-3">
            Delivery
            </th>
            <th scope="col" class="px-4 py-3">
            Active
            </th>
            </tr>
            </thead>
            <tbody>
              <tr 
              v-for="shipping in city.shipping_types" class="border-b odd:bg-green-50 even:bg-green-100"
              :key="`shipping-${shipping.id}`"
              >
                <td scope="row" class="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ shipping.name }}
                </td>      
                <td scope="row" class="px-4 py-4  text-gray-700 whitespace-nowrap bg-emerald-100">
                    <HelperTkSymbol /> {{ shipping.shipping_charge.charge }}
                    <p class="p-2">
                      <ToggleInput 
                        name="shipping-charge"
                        :item="shipping.shipping_charge" 
                        :status="shipping.shipping_charge.active"  
                        @toggleInput="handleToggleInput"
                      />
                    </p>
                </td>      
                <td scope="row" class="px-4 py-4 text-xs text-gray-700 whitespace-nowrap">
                    Min: {{ shipping.delivery_time_min }} {{ shipping.delivery_time_unit }}
                  <p class="border-t mt-1 pt-1">
                    Max: {{ shipping.delivery_time_max }} {{ shipping.delivery_time_unit }}
                    </p> 
                </td>
                <td class="px-4 py-4">
                  <ToggleInput 
                    name="shipping"
                    :item="shipping" 
                    :status="shipping.active" 
                    @toggleInput="handleToggleInput"
                  />
                </td>
              </tr>
              </tbody>
            </table>
          </td>        
          <td class="px-4 py-2">                      
            <button type="button" @click.prevent="remove(city)"> 
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>        
          </td>              
        </tr>
        </tbody>
        </table>
      </div>    
      <div class="my-6 flex justify-between items-center">
        <div>
          <span class="pl-2 text-xl font-semibold"> {{ meta.totalCities }} </span> cities.
        </div>
        <div class="flex justify-end items-center gap-4">
            {{page}} of {{totalPages}}
          <button @click.prevent="previous" type="button" :disabled="links.prev===null" class="w-32 text-center py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300">Previous</button>
  
          <button @click.prevent="next" type="button" :disabled="links.next===null" class="w-32 text-center py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 disabled:bg-orange-300">Next</button>      
        </div>
      </div>
      <loader :action="action" :active="loader" />
    </section>
  </template>
  
  <script>
  import swal from 'sweetalert';
  import { mapState, mapActions } from "vuex";
  
  export default {
      layout: 'dashboard',
      data() {
          return {
            action: '',
            loader: false,
            page: 0,
            citiesPerPage: 10,
            itemToUpdate: null,
          }
      },
      async mounted() {
        this.loader = true;
        await this.getCities();
        this.page++;
        this.loader = false;
        
      },
        computed: {
          ...mapState('cities', [
              'cities',
              'meta',
              'links',
          ]),
          totalPages() {
            return (this.meta.totalCities >= this.citiesPerPage) ? Math.ceil(this.meta.totalCities / this.citiesPerPage) : 1;
          }
      },
      methods: {
          ...mapActions('cities', [
              'getCities',
              'deleteCity'		
          ]),          
          async previous() {
              this.loader = true;
              await this.getCities(this.links.prev);
              this.page--;
              this.loader = false;
          },
          async next() {
              this.loader = true;
              await this.getCities(this.links.next);
              this.page++;
              this.loader = false;
          },        
        remove(city) {
          swal({
              title: "Are you sure?",
              text: `This '${city.name}' city will be deleted!`,
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
                await this.deleteCity(city);
  
                this.loader = false;
                swal("City has been deleted!", {
                  icon: 'success',
                  // buttons: false,
                  timer: 3000,
                });
              }                   
            });
        },        
        handleToggleInput(event) {
          this.loader = true;
          const shipping = event.item;
          let url = `/admin/shippings/${shipping.id}`;     
          let data = {active: event.value};     
          
          if (shipping.hasOwnProperty('type')) {
            url = `/admin/shippings/types/${shipping.id}`; 
            data = {
              shipping_types: {
                active: event.value
              }
            }
          } 

          if (shipping.hasOwnProperty('charge')) {
            url = `/admin/shippings/charges/${shipping.id}`; 
            data = {
              shipping_types: {
                shipping_charge: {
                  active: event.value
                }
              }
            }
          } 
          
          this.$axios.$patch(url, data).then(response => {
                this.loader = false;
                this.$toast.success('updated');
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
  
                this.errors = Object.values(error.response.data.errors).flat();
                this.loader = false;
            })                    
        },      
      }
  
  }
  </script>