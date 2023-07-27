<template>
  <section>
    <div class="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
      <button 
        @click.prevent="toggleTabs(1, 'daily')"
        class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
        :class="openTab == 1 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
        >
          Daily
      </button>

      <button @click.prevent="toggleTabs(2, 'weekly')"
        class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
        :class="openTab == 2 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'">
          Weekly
      </button>
    </div>

    <div class="px-4 pt-4 pb-2 flex justify-end items-center bg-slate-50 mb-2 rounded-lg">
      <button @click.prevent="addDeal()" type="button" class="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-white text-sm">Add New Deal</button>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-slate-100 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" class="px-4 py-3">
      Deal# 
      </th>
      <th scope="col" class="px-4 py-3">
      Image
      </th>
      <th scope="col" class="px-4 py-3">
      Product
      </th>
      <th scope="col" class="px-4 py-3">
      Type
      </th>
      <th scope="col" class="px-4 py-3">
      Amount Type
      </th>
      <th scope="col" class="px-4 py-3">
      Amount
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
        v-for="(deal, index) in deals" class="border-b odd:bg-white even:bg-gray-50"
        :key="index"
      >
      <td class="px-4 py-4">
        <!-- {{index+1}} -->
        {{deal.id}}
      </td>
      <td class="w-16 border-b p-2">
        <img :src="url(deal.product.featured_image)" :alt="deal.product.name">
      </td>
      <td class="border-b p-2">
        <span class="font-medium">{{ deal.product.name }}</span>
        <p class="text-xs">{{deal.product.unit_quantity}} {{ deal.product.unit }}</p>
        <div class="text-orange-500 text-xs mt-2">
          <HelperTkSymbol text="text-sm" /> {{deal.price}}
        </div>
        <del class="text-gray-400 text-xs">
          <HelperTkSymbol text="text-sm" /> {{deal.original_price}}
        </del>                      
      </td>
      <td scope="row" class="px-4 text-gray-900 whitespace-nowrap">
          <span 
            class="uppercase text-xs px-2 text-white rounded-lg"
            :class="[(dealType === 'daily') ? 'bg-green-600' : 'bg-sky-500']"
          > {{dealType}} </span>
      </td>
      <td class="px-4 py-4">
        <span class="text-xs">{{deal.amount_type}}</span>
      </td>
      <td class="px-4 py-4">
        <span v-if="deal.amount_type === 'Percentage'">
          {{deal.amount}}%
        </span>
        <span v-else>
          <HelperTkSymbol /> {{deal.amount}}
        </span>
      </td>      
      <td class="px-4 py-4">
        {{deal.starting}}
      </td>
      <td class="px-4 py-4">
        {{deal.ending}}
      </td>      
      <td class="px-4 py-4">
          <ToggleInput 
            :item="deal" 
            :status="deal.active" 
            @toggleInput="handleToggleInput"
          />
      </td>  
      <td class="px-4 py-2">
        <button type="button" @click.prevent="edit(deal)"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button type="button" @click.prevent="remove(deal)"> 
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
        <span class="pl-2 text-xl font-semibold"> {{ meta.totalDeals }} </span> deals.
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
          // dealType: 'daily',
          dealType: '',
          loader: false,
          page: 0,
          openTab: '',
          dealsPerPage: 10,
          errors: {}
      }
    },
    async mounted() {
      // console.log('dt', localStorage.getItem('dealType'))
      this.dealType = localStorage.getItem('dealType') ?? 'daily';
      this.openTab = (this.dealType === 'daily') ? 1 : 2;

      this.loader = true;
      const dealUrl = `admin/${this.dealType}/deals`;
      await this.getDeals(dealUrl);
      this.page++;
      this.loader = false;
    },
	  computed: {
        ...mapState('deals', [
            'deals',
            'meta',
            'links',
        ]),
        totalPages() {
          return (this.meta.totalDeals >= this.dealsPerPage) ? Math.ceil(this.meta.totalDeals / this.dealsPerPage) : 1;
        }       
    },
    methods: {
      ...mapActions('deals', [
          'getDeals',
          'deleteDeal'
      ]),
      addDeal() {
        localStorage.setItem('dealType', this.dealType);
        this.$router.push('/admin/deals/add');
      },
      async toggleTabs(tabNumber, type){
        this.loader = true;      
        this.dealType = type;
        this.page = 0;
        this.openTab = tabNumber;
        const dealUrl = `admin/${this.dealType}/deals`;      
      await this.getDeals(dealUrl);
      this.page++;
      this.loader = false;
    },
        async previous() {
            this.loader = true;
            await this.getDeals(this.links.prev);
            this.page--;
            this.loader = false;
        },
        async next() {
            this.loader = true;
            await this.getDeals(this.links.next);
            this.page++;
            this.loader = false;
        },
      edit(deal) {
        this.action = 'updating';
        localStorage.setItem('dealType', this.dealType);
        localStorage.setItem('deal', JSON.stringify(deal))
        this.$router.push(`/admin/deals/${deal.id}/edit`)
      },
      remove(deal) {
        swal({
            title: "Are you sure?",
            text: `This deal #${deal.id} will be deleted!`,
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
              deal.deal_type = this.dealType; 
              await this.deleteDeal(deal);

              this.loader = false;
              swal("Deal has been deleted!", {
                icon: 'success',
                // buttons: false,
                timer: 3000,
              });
            }                   
          });
      },        
      handleToggleInput(event) {
        // console.log(event)
        this.loader = true;
        const deal = event.item;
        console.log('receiving..');
        this.$axios.$patch(`admin/${this.dealType}/deals/${deal.id}`, {
          amount_type: (deal.amount_type === 'Percentage') ? 1: 2,
          amount: deal.amount,
          deal_type: this.dealType,
          // starting: deal.starting,        
          // ending: deal.ending,        
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
      imageLink(image) {
          let path = `/storage/images/products/medium/${image.name}`;
          return `${this.$config.baseURL}${path}`;
      },
      url(image) {        
      //    let name = image.name;
        if (typeof image === 'object' && image !== null) {
          let path = `/storage/images/products/small/${image.name}`;
          return `${this.$config.baseURL}${path}`;
        }
      return; 
      },
    }

}
</script>