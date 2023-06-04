<template>
  <section>
    <div class="px-4 pt-4 pb-2 flex justify-end items-center bg-slate-50 mb-2 rounded-lg">
      <button @click.prevent="addDiscount()" type="button" class="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-white text-sm">Add New Discount</button>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-slate-100 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" class="px-4 py-3">
      Discount# 
      </th>
      <th scope="col" class="px-4 py-3">
      Name
      </th>            
      <th scope="col" class="px-4 py-3">
      Amount(%)
      </th>
      <th scope="col" class="px-4 py-3">
      Limit(Tk)
      </th>
      <th scope="col" class="px-4 py-3">
        Starting
      </th>  
      <th scope="col" class="px-4 py-3">
        Ending
      </th>  
      <th scope="col" class="px-4 py-3">
        Active
      </th>  
      <th scope="col" class="px-4 py-3">
        <span class="sr-only">Action</span>
      </th>
      </tr>
      </thead>
      <tbody>
      <tr 
        v-for="(discount, index) in discounts" class="border-b odd:bg-white even:bg-gray-50"
        :key="index"
      >
      <td scope="row" class="px-4 py-4 whitespace-nowrap">
        <!-- {{index+1}} -->
        <button
          type="button"
          @click.prevent="showDetailsOf(discount)"                  
          class="text-cyan-500 font-medium cursor-pointer"
        >{{discount.id}}
        </button>
      </td>
      <td class="border-b p-2">
        {{discount.name}}
      </td>            
      <td class="px-4 py-4 font-semibold">
        <span class="text-blue-600">
          {{discount.amount}}%
        </span>        
      </td>      
      <td class="px-4 py-4">
        <span v-if="discount.limit === null">
          -
        </span>
        <span v-else>
          {{discount.limit}}
        </span>
      </td>
      <td class="px-4 py-4">
        {{discount.starting}}
      </td>
      <td class="px-4 py-4">
        {{discount.ending}}
      </td>      
      <td class="px-4 py-4">
          <ToggleInput 
            :item="discount" 
            :status="discount.active" 
            @toggleInput="handleToggleInput"
          />
      </td>  
      <td class="px-4 py-2">
        <button type="button" @click.prevent="edit(discount)"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button type="button" @click.prevent="remove(discount)"> 
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
        <span class="pl-2 text-xl font-semibold"> {{ meta.totalDiscounts }} </span> discounts.
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
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    layout: 'dashboard',
    data() {
        return {
          action: '',
          loader: false,
          page: 0,
          discountsPerPage: 10,
      }
    },
    async mounted() {      
      await this.getDiscounts('/admin/discounts');      
      this.page++;
      this.loader = false;
    },
	  computed: {
        ...mapState('discounts', [
            'discounts',
            'meta',
            'links',
        ]),
        totalPages() {
          return (this.meta.totalDiscounts >= this.discountsPerPage) ? Math.ceil(this.meta.totalDiscounts / this.discountsPerPage) : 1;
        }
    },
    methods: {
      ...mapActions('discounts', [
          'getDiscounts',
          'deleteDiscount'
      ]),
      showDetailsOf(discount) {      
        this.saveToLocalStorage(discount);
        this.$router.push(`/admin/discounts/${discount.id}`);
      },
      saveToLocalStorage(discount) {
        localStorage.setItem('discount', JSON.stringify(discount));
        // localStorage.setItem('orderStatus', this.orderStatus);
    },      
      addDiscount() {        
        this.$router.push('/admin/discounts/add');
      },      
        async previous() {
            this.loader = true;
            await this.getDiscounts(this.links.prev);
            this.page--;
            this.loader = false;
        },
        async next() {
            this.loader = true;
            await this.getDiscounts(this.links.next);
            this.page++;
            this.loader = false;
        },
      edit(discount) {
        this.action = 'updating';
        localStorage.setItem('discount', JSON.stringify(discount))
        this.$router.push(`/admin/discounts/${discount.id}/edit`)
      },
      remove(discount) {
        swal({
            title: "Are you sure?",
            text: `This discount #${discount.id} will be deleted!`,
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
              discount.discount_type = this.discountType; 
              await this.deletediscount(discount);

              this.loader = false;
              swal("discount has been deleted!", {
                icon: 'success',
                // buttons: false,
                timer: 3000,
              });
            }                   
          });
      },        
      handleToggleInput(event) {
        console.log(event)
        this.loader = true;
        const discount = event.item;
        // console.log(this.convertDiscountToNumber(discount.type))
        console.log('receiving..');
        this.$axios.$patch(`admin/discounts/${discount.id}`, {
          type: this.convertDiscountToNumber(discount.type),
          amount: discount.amount, 
          name: discount.name,         
          starting: discount.starting,        
          ending: discount.ending,        
          active: event.value
        }).then(response => {
              this.loader = false;
              this.$toast.success('updated');
          })
          .catch(error => {
              if (error.response.status !== 422) throw error

              this.errors = Object.values(error.response.data.errors).flat();
              this.loader = false;
          })                    
      },
     
      // url(image) {        
      // //    let name = image.name;
      //   if (typeof image === 'object' && image !== null) {
      //     let path = `/storage/images/products/small/${image.name}`;
      //     return `${this.$config.baseURL}${path}`;
      //   }
      // return; 
      // },
    }

}
</script>

<style>

</style>