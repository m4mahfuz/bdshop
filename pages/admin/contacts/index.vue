<template>
  <section>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" class="px-6 py-3">
      Name
      </th>
      <th scope="col" class="px-4 py-3">
      Email
      </th>      
      <th scope="col" class="px-4 py-3">
        Message
      </th>          
      <th scope="col" class="px-4 py-3">
        <span class="sr-only">Action</span>
      </th>
      </tr>
      </thead>
      <tbody>
      <tr 
        v-for="(contact, index) in contacts" class="border-b odd:bg-white even:bg-gray-50"
        :key="index"
      >
      <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {{ contact.name }}
      </td>      
      <td class="px-4 py-4">        
          {{contact.email}}
      </td>
      <td class="px-4 py-4">
        <span :class="contact.read===false ? 'font-semibold' : ''">
          <Excerpt 
            :content="contact" 
            :max-length="100" 
            @readmore-clicked="hadndleReadmoreClicked"
          />
        </span>
      </td>
      <td class="px-4 py-2">
        
        <button type="button" @click.prevent="edit(contact)" :disabled="contact.read" class="text-blue-600 disabled:text-blue-300">           
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>

        </button>
        
        <button type="button" @click.prevent="remove(contact)"> 
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
        <span class="pl-2 text-xl font-semibold"> {{ meta.totalContacts }} </span> contacts.
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
      contactsPerPage: 10
    }
  },
  async mounted() {
    this.loader = true;
    await this.getContacts();
    this.page++;
    this.loader = false;
    
  },
  computed: {
        ...mapState('contacts', [
            'contacts',
            'meta',
            'links',
        ]),
        totalPages() {
          return (this.meta.totalContacts >= this.contactsPerPage) ? Math.ceil(this.meta.totalContacts / this.contactsPerPage) : 1;
        }
    },
    methods: {
        ...mapActions('contacts', [
            'getContacts',
            'deleteContact',
            'updateContact'
        ]),
        async previous() {
            this.loader = true;
            await this.getContacts(this.links.prev);
            this.page--;
            this.loader = false;
        },
        async next() {
            this.loader = true;
            await this.getContacts(this.links.next);
            this.page++;
            this.loader = false;
        },
        hadndleReadmoreClicked(contact){
          // console.log(contact)
          this.edit(contact)
        },
      edit(contact) {
        this.action = 'updating';
        this.loader = true;
        this.updateContact(contact);        
        this.$axios.$patch(`/admin/contacts/${contact.id}`, contact)
          .then(response => {            
              this.loader = false;
          })
          .catch(error => {                
              this.loader = false;
              // this.setErrors(error.response.data.errors);
          })
      },
      
      remove(contact) {
        swal({
            title: "Are you sure?",
            text: `This '${contact.name}' contact will be deleted!`,
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
              await this.deleteContact(contact);

              this.loader = false;
              swal("Contact has been deleted!", {
                icon: 'success',
                // buttons: false,
                timer: 3000,
              });
            }                   
          });
      },        
     
    }

}
</script>

<style>

</style>