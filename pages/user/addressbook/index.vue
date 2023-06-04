<template>
  <div>
      <h3 class="text-2xl font-bold mb-8 border-b border-sky-100 pb-2 capitalize">
        <span class="border-b-4 border-sky-400 pb-1 pr-1">address book</span> 
      </h3>
      <div class="my-4 flex justify-end">
        <CreateAddressButton />
      </div>
      <Alert :show="showAlert" @close="showAlert = false">{{alertMessage}}</Alert>

      <loader :active="loader" :action="action" />
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-2 py-2">Full Name</th>
              <th scope="col" class="px-2 py-2">Address</th>
              <!-- <th scope="col" class="px-4 py-2">City</th> -->
              <th scope="col" class="px-2 py-2">Phone Number</th>
              <th scope="col" class="px-2 py-2 text-center">Active</th>
              <th scope="col" class="px-2 py-2 text-center">Default</th>
              <th scope="col" class="px-2 py-2">Action</th>              
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="address in addresses" :key="address.id"
              class="odd:bg-white even:bg-gray-50 hover:bg-green-50"
            >
            <!-- <tr> -->              
              <td class="border-b p-2">{{address.name}}</td>
              <td class="border-b p-2">
                <span class="rounded bg-blue-300 px-1 text-xs text-white">{{address.title}}</span>  <p> {{address.address_line}} </p>
                <p> {{address.city}}-{{address.postal_code}}</p>
              </td>
              <td class="border-b p-2">{{address.phone}}</td>
              <td class="border-b p-2 text-center">
                    <ToggleInput 
                      :item="address" 
                      :status="address.active" 
                      @toggleInput="handleToggleInput"
                    />
              </td>
              <td class="border-b p-2 text-center"><span v-if="address.id === $auth.$state.user.default_shipping_address">YES</span></td>
              <td class="border-b p-2">
                <div class="flex gap-2">
                  <button @click.prevent="edit(address)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500 hover:text-blue-700">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button @click.prevent="remove(address)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500 hover:text-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                  </button>                  
                </div>
              </td>
            </tr>                
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    layout: 'userDashboard',
    data() {
      return {
        action: 'loading',
        alertMessage: '',
        showAlert: false,
        loader: false
      }
    },
    async mounted() {
      this.loader = true;
      await this.getAddresses();
      this.loader = false;
    },
    computed: {
      ...mapState('user', [
        'addresses'
      ]),
    },
    methods: {
      ...mapActions('user', [
        'getAddresses',
        'deleteAddress'
      ]),
      edit(address) {
        localStorage.setItem('addressToEdit', JSON.stringify(address));
        this.$router.push('/user/addressbook/edit');
      },
      remove(address) {
        swal({
            title: "Are you sure?",
            text: `This '${address.title}' address will be deleted!`,
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
              await this.deleteAddress(address);

              this.loader = false;
              swal("Address has been deleted!", {
                icon: 'success',
                // buttons: false,
                timer: 3000,
              });
            }                   
          });
      },
      handleToggleInput(event) {
        // console.log(event)
        this.alertMessage = '';
        const address = event.item;
        console.log('receiving..');
        this.$axios.$patch(`/user/addresses/${address.id}`, {
          active: event.value,
          name: address.name,
          title: address.title,
          address_line: address.address_line,
          phone: address.phone,
          city: address.city,
          postal_code: address.postal_code,
        }).then(response => {
              this.loader = false;
              this.$toast.success('Address updated succesfully!');
          })
          .catch(error => {
              this.alertMessage = error.response.data.message;
              this.loader = false;
              this.showAlert = true;
          })                    
      },
    }
}
</script>