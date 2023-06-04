<template>
	<!-- <div class="md:grid md:grid-cols-3 md:gap-6 bg-red-200"> -->
	<div class="md:grid md:grid-cols-4 md:gap-6">
    <div class="mt-5 p-6 md:col-span-2 md:mt-0 bg-slate-100 rounded-md">
			<h3 class="text-xl font-bold mb-4 border-b border-gray-300 pb-2">
				<span class="border-b-4 border-gray-400 pb-1 pr-1"> New Invite</span> 
			</h3>
      <form>
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="bg-white px-4 py-5 sm:p-6">
            <div class="grid grid-cols-6 gap-6">              
              <div class="col-span-6 sm:col-span-5">
                <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                <input v-model="user.email" type="email" name="email-address" id="email-address" autocomplete="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="Email address here"
								>
              </div>

              <div class="col-span-6 sm:col-span-4">
                <label for="type" class="block text-sm font-medium text-gray-700">Admin Types</label>
                <select v-model="user.type" id="type" name="type" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <option disabled :value="null">Please select one</option>
									<option
										v-for="(type, index) in types" :key="index"
										:value="type.id"
									>
									{{type.name}}
									</option>
                </select>
              </div>
						</div>
          <div class="flex gap-4 mt-8 py-3">
						<button @click.prevent="" type="button" class="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">Cancel</button>
            <button @click.prevent="save()" type="button" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-10 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
          </div>
					</div>
				</div>
      </form>
    </div>

    <div class="mt-5 p-6 md:col-span-2 md:mt-0 bg-slate-100 rounded-md">
      <h3 class="text-xl font-bold mb-4 border-b border-gray-300 pb-2">
				<span class="border-b-4 border-gray-400 pb-1 pr-1">Available Invites</span> 
			</h3>
      <overlay-scrollbars 
          :key="scroll"          
          class="h-96"
        >
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" class="px-4 py-2">#</th>
                  <th scope="col" class="px-4 py-2">Email</th>
                  <th scope="col" class="px-4 py-2">Type</th>
                  <th colspan="2" scope="col" class="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(invite, index) in invites" :key="index"
                class="odd:bg-white even:bg-gray-50 hover:bg-green-50"
              >
                  <th scope="row" class="px-4 py-2">{{index+1}}</th>
                  <td class="px-4 py-2">
                    {{ invite.email }}
                  </td>
                  <td class="px-4 py-2">
                    {{ invite.type }}
                  </td> 
                  <td class="px-4 py-2">
                    <button @click.prevent="remove(invite)" class="text-red-400 hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button> 
                   
                  </td>                
              </tr>              
            </tbody>
          </table>       
        </div>                              
        </overlay-scrollbars>
    </div>

		<loader action="saving" :active="loader" />
  </div>
</template>

<script>
import swal from 'sweetalert';
export default {
    middleware: 'superAdmin',
    layout: 'dashboard',
    data() {
        return {
            scroll: '',
            types: [],
            user: {
                email: '',
                type: null
            },
            invites: [],
            loader: false
        }
    },
    mounted() {
        this.getTypes();
        this.getInvites();
    },
    methods: {
        getTypes() {
            this.loader = true;
            this.$axios.$get('/admin/types')
            .then(response => {
                this.types = response.data;
                this.loader = false;
            })
            .catch(error => {
                console.log(error);
                this.loader = false;
            })
        },
        getInvites() {
            this.loader = true;
            this.$axios.$get('/admin/invites')
            .then(response => {
                this.invites = response.data;
                this.loader = false;
            })
            .catch(error => {
                console.log(error);
                this.loader = false;
            })
        },        
        remove(invite) {
          swal({
            title: "Are you sure?",
            text: `Invite for this email(${invite.email}) owner will be deleted!`,
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
          .then((value) => {
            if (value) {
              this.loader = true;

              this.$axios.$delete(`/admin/invites/${invite.id}`)
              .then(response => {
                this.removeFromInvites(invite);
                this.loader = false;
                this.$toast.warning('Removed successfully!')
              })
              .catch(error => {
                this.loader = false;
              });
            }
          });            
        },

        removeFromInvites(invite) {
          let index = this.invites.findIndex(element => element.id === invite.id);
          this.invites.splice(index, 1);
        },
        save() {
          this.loader = true;
          this.$axios.$post('/admin/invite', this.user)
          .then(response => {
              this.$toast.success('Invite Saved');
              this.invites.push(response.data);
              this.reset();
              this.loader = false;
          })
          .catch(error => {
              console.log(error);
              this.loader = false;
          })
        },
        reset() {
          this.user.email = '';
          this.user.type = null;
        }
    }
}
</script>

<style>

</style>