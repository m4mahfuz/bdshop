<template>
  <section>
    <div class="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
      <button 
        @click.prevent="toggleTabs(1, 'all')"
        class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
        :class="openTab == 1 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
        >
          All
      </button>        
      <button 
        @click.prevent="toggleTabs(2, 'regular')"
        class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
        :class="openTab == 2 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
        >
          Regular(Percentage/Fixed)
      </button>        
      <button 
        @click.prevent="toggleTabs(3, 'bogo')"
        class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
        :class="openTab == 3 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'"
        >
          Buy 1 Get 1 Free
      </button>

      <button @click.prevent="toggleTabs(4, 'btgo')"
        class="inline-flex items-center h-10 px-4 -mb-px text-sm text-center bg-transparent border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
        :class="openTab == 4 ? 'text-blue-600 border-blue-500' : 'text-gray-700 border-transparent hover:border-gray-400'">
          Buy 2 Get 1 Free
      </button>
    </div>

    
    <div class="px-4 pt-4 pb-2 flex justify-end items-center bg-slate-50 mb-2 rounded-lg">
      <button @click.prevent="addOffer()" type="button" class="px-6 py-2 bg-blue-700 hover:bg-blue-600 rounded-full text-white text-sm">Add New Offer</button>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-slate-100 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" class="px-4 py-3">
      Offer# 
      </th>
      <th scope="col" class="px-4 py-3">
      Name
      </th>      
      <th scope="col" class="px-4 py-3">
      Type
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
        v-for="(offer, index) in offers" class="border-b odd:bg-white even:bg-gray-50"
        :key="index"
      >
      <td scope="row" class="px-4 py-4 whitespace-nowrap">
        <!-- {{index+1}} -->
        <button
          type="button"
          @click.prevent="showDetailsOf(offer)"                  
          class="text-cyan-500 font-medium cursor-pointer"
        >{{offer.id}}
        </button>
      </td>
      <td class="border-b p-2">
        {{offer.name}}
      </td>
      
      <!-- <td scope="row" class="px-4 text-gray-900 whitespace-nowrap">
          <span 
            class="uppercase text-xs px-2 text-white rounded-lg"
            :class="[(offerType === 'all') ? 'bg-green-600' : 'bg-sky-500']"
          > {{offer.amount_type}} </span>
      </td> -->
      <td class="px-2 py-2">
        <span class="px-2 py-1 text-xs bg-sky-500 text-white rounded-lg">{{offer.type}}</span>
      </td>
      <td class="px-4 py-4 font-semibold">
        <span v-if="offer.type === 'Percentage'">
          {{offer.amount}}%
        </span>
        <span v-else>
          <p v-if="offer.amount !==0">
            <HelperTkSymbol /> {{offer.amount}}
          </p>
        </span>
      </td>      
      <td class="px-4 py-4">
        {{offer.starting}}
      </td>
      <td class="px-4 py-4">
        {{offer.ending}}
      </td>      
      <td class="px-4 py-4">
          <ToggleInput 
            :item="offer" 
            :status="offer.active" 
            @toggleInput="handleToggleInput"
          />
      </td>  
      <td class="px-4 py-2">
        <button type="button" @click.prevent="edit(offer)"> 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button type="button" @click.prevent="remove(offer)"> 
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
        <span class="pl-2 text-xl font-semibold"> {{ meta.totalOffers }} </span> offers.
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
          // offerType: 'daily',
          offerType: '',
          loader: false,
          page: 0,
          openTab: '',
          offersPerPage: 10,
      }
    },
    async mounted() {
      // console.log('dt', localStorage.getItem('offerType'))
      this.offerType = localStorage.getItem('offerType') ?? 'all';
      this.openTab = this.setTabBasedOn(this.offerType);
      this.loader = true;
      if(this.offerType === 'all') {
        await this.getOffers();
      } else {
        const offerUrl = `admin/offers/${this.offerType}`;
        await this.getOffers(offerUrl);
      }
      this.page++;
      this.loader = false;
    },
	  computed: {
        ...mapState('offers', [
            'offers',
            'meta',
            'links',
        ]), // ...mapGetters('coupons', 
        //   ['amount']
        // )
        totalPages() {
          return (this.meta.totalOffers >= this.offersPerPage) ? Math.ceil(this.meta.totalOffers / this.offersPerPage) : 1;
        }
    },
    methods: {
      ...mapActions('offers', [
          'getOffers',
          'deleteOffer'
      ]),
      showDetailsOf(offer) {      
        this.saveToLocalStorage(offer);
        this.$router.push(`/admin/offers/${offer.id}`);
      },
      saveToLocalStorage(offer) {
        localStorage.setItem('offerToView', JSON.stringify(offer));
        localStorage.setItem('openTabNumber', this.openTab);
        // localStorage.setItem('orderStatus', this.orderStatus);
    },
      setTabBasedOn(offerType) {
        let tab;
        switch (offerType) {
          case 'all':
            tab = 1;
            break;
          case 'regular':
            tab = 2;
            break;
          case 'bogo':
            tab = 3;
            break;
          case 'btgo':
            tab = 4;
            break;        
          default:
            tab = 1;
            break;
        }
        return tab;
      },
      addOffer() {
        localStorage.setItem('offerType', this.offerType);
        this.$router.push('/admin/offers/add');
      },
      async toggleTabs(tabNumber, type){
        this.loader = true;      
        this.offerType = type; 
        this.page = 0;
        this.openTab = tabNumber;
        const offerUrl = `admin/offers/types/${this.offerType}`;
      // if (status === 'all') {
      //   await this.fetchOrders(`/admin/orders`);
      // } else {
      //   await this.fetchOrders(`/admin/orders/${status}`);
      // }
      await this.getOffers(offerUrl);
      this.page++;
      this.loader = false;
    },
        async previous() {
            this.loader = true;
            await this.getoffers(this.links.prev);
            this.page--;
            this.loader = false;
        },
        async next() {
            this.loader = true;
            await this.getoffers(this.links.next);
            this.page++;
            this.loader = false;
        },
      edit(offer) {
        this.action = 'updating';
        localStorage.setItem('offerType', this.offerType);
        localStorage.setItem('offer', JSON.stringify(offer))
        this.$router.push(`/admin/offers/${offer.id}/edit`)
      },
      remove(offer) {
        swal({
            title: "Are you sure?",
            text: `This offer #${offer.id} will be deleted!`,
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
              offer.offer_type = this.offerType; 
              await this.deleteoffer(offer);

              this.loader = false;
              swal("offer has been deleted!", {
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
        const offer = event.item;
        // console.log(this.convertOfferToNumber(offer.type))
        console.log('receiving..');
        this.$axios.$patch(`admin/offers/${offer.id}`, {
          type: this.convertOfferToNumber(offer.type),
          amount: offer.amount, 
          name: offer.name,         
          starting: offer.starting,        
          ending: offer.ending,        
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
      convertOfferToNumber(type) {
        let typeInNumber;
        switch (type) {
          case 'Percentage':
            typeInNumber = 1;
            break;
          case 'Fixed':
            typeInNumber = 2;
            break;
          case 'Buy 1 Get 1 Free':
            typeInNumber = 3;
            break;
          case 'Buy 2 Get 1 Free':
            typeInNumber = 4;
            break;        
          default:
            typeInNumber = 1;
            break;
        }
        return typeInNumber;
      }
      // imageLink(image) {
      //     let path = `/storage/images/products/medium/${image.name}`;
      //     return `${this.$config.baseURL}${path}`;
      // },
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