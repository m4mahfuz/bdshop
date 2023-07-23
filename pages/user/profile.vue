<template>
  <div>
      <h3 class="text-2xl font-bold mb-8 border-b border-sky-100 pb-2">
        <span class="border-b-4 border-sky-400 pb-1 pr-1">Profile</span> 
      </h3>
      <div class="w-full lg:flex text-sm lg:gap-4">
        <div class="basis-1/3 px-6 py-2 bg-yellow-100 rounded-md">
          <span class="text-sky-500 font-medium">Full name</span>
          <p class="py-1">{{$auth.$state.user.name}}</p>      
        </div>
        <div class="my-2 lg:my-0 basis-1/3 px-6 py-2 bg-yellow-100 rounded-md">
          <span class="text-sky-500 font-medium">Email</span>      
          <p class="p-1 text-ellipsis overflow-hidden">{{$auth.$state.user.email}}</p>      
        </div>
        <div class="basis-1/3 px-6 py-2 bg-yellow-100 rounded-md">
          <span class="text-sky-500 font-medium">Phone | <span @click.prevent="showPhoneChangeForm = true" class="text-sky-600 font-normal hover:cursor-pointer hover:underline uppercase">Change</span></span>      
          <p class="py-1">{{userPhone}}</p>      
        </div>
      </div>
      <div v-if="showPhoneChangeForm" class="my-4">
        <ChangePhone 
          @close="showPhoneChangeForm = false" 
          @changed="handlePhoneChanged"
          class="mx-auto bg-slate-50" 
          entity="user" 
        />
      </div>
      <div v-if="showPasswordChangeForm" class="my-4">
        <ChangePassword @close="showPasswordChangeForm = false" class="mx-auto bg-slate-50" entity="user" />
      </div>

      <div v-if="!showPasswordChangeForm && !showPhoneChangeForm" class="mt-12 flex flex-col items-center gap-4">
        <button class="w-full md:w-64 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded uppercase">Edit Pofile</button>
        <button @click.prevent="showPasswordChangeForm = true" class="w-full md:w-64 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded uppercase">Change Password</button>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: 'userDashboard',
  name: "manage-account",
  data() {
    return {
      showPasswordChangeForm: false,
      showPhoneChangeForm: false,
      userPhone: ''
    }
  },
  async mounted() {
    this.userPhone = this.$auth.$state.user.phone;
    this.getShippingAddress();
  },
  computed: {
    ...mapState('shipping', ['shippingAddress']),    
  },
  methods: {
    ...mapActions('shipping', [
      'getShippingAddress'
    ]),
    handlePhoneChanged(event) {
      this.userPhone = event.phone;
    }
  }
}
</script>