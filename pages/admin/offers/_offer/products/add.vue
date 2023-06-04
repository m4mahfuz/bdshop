<template>
  <div>
    <!-- <h1 class="text-2xl">
      Add Deal
    </h1> -->
      <!-- <CategoryProducts @productSelected="handleProductSelected" class="bg-slate-100 rounded-lg p-4" /> -->

      <ProductSelection />
      
        <!-- <div class="my-8 flex justify-between">
                <div>
                  <button @click.prevent="back()" class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Back</button>
                </div>
                <div class="flex gap-4">
                <button @click.prevent="reset()" class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Cancel</button>
                <button @click.prevent="save()" type="button" :disabled="!isValid" class="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300">Save</button>
                </div>
        </div> -->
        <!-- <loader action="saving" :active="loader" />             -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    layout: 'dashboard',
    // data() {
    //   return {        
    //     offer: {
    //       active: 1,
    //       name: '',
    //       amount: '',          
    //       offer_type: '',
    //       starting: '',
    //       ending: ''
    //     },
    //     loader: false
    //   }
    // },
    mounted() {
    //   this.offer.offer_type = localStorage.getItem('offerType');
    },
    // computed: {
    //   ...mapGetters('errors', [
    //     'has',
    //     'get',
    //     'any'
    //   ]),
    //   isValid() {                        
    //         return (this.offer.active !== '' &&
    //         this.offer.amount !== '' &&
    //         this.offer.name !== '' &&
    //         this.offer.offer_type !== '' &&
    //         this.offer.starting !== '' &&           
    //         this.offer.ending !== ''            
    //         ) ? true : false;
    //     },
    // },
    // methods: {
    //   ...mapActions('errors', [
    //     'setErrors',      
    //     'resetErrors'
    //   ]),
    //   handleProductSelected(product) {
    //     this.deal.product_id = product.id;
    //     this.deal.price = product.price;
    //   },
    //   back() {
    //     this.$router.push('/admin/deals');
    //   },
    //   reset() {
    //     this.deal.active = '';
    //     this.deal.amount = '';
    //     this.deal.amount_type = '';
    //     // this.deal.offer_type = '';
    //     this.deal.product_id = '';
    //     this.deal.price = '';
    //     this.deal.starting = '';           
    //     this.deal.ending = '';  
    //     this.resetErrors();          
    //   },
    //   save() {
    //     this.loader = true;
    //     if (this.deal.offer_type === 'daily') {
    //       this.deal.ending = this.deal.starting;
    //     }
    //     this.$axios.$post(`/admin/${this.deal.offer_type}/deals`, this.deal)
    //     .then(response => {
    //         this.loader = false;
    //         this.$toast.info('New Deal Created');
    //         this.reset();
    //     })
    //     .catch(error => {
    //         this.loader = false;
    //         this.setErrors(error.response.data.errors);
    //     });
    //   }
    // }
}
</script>