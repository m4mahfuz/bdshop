<template>
<div>
  <h3 class="text-2xl font-bold mb-8 border-b border-sky-100 pb-2">
    <span class="border-b-4 border-sky-400 pb-1 pr-1">My Account</span> 
  </h3>
  <div class="w-full lg:flex lg:gap-4">
    <div class="basis-1/3 px-6 py-2 bg-slate-100 rounded-md">
      <span class="font-semibold">Personal Profile | 
        <nuxt-link to="/user/profile/edit" class="text-sky-500 font-normal">EDIT </nuxt-link>
      </span>
      <ul class="text-xs text-gray-700 my-2 space-y-2">
        <li> {{$auth.$state.user.name}} </li>
        <li>{{$auth.$state.user.email}}</li> 
        <li>{{$auth.$state.user.phone}}</li>
      </ul> 
    </div>
    <div class="mt-2 lg:mt-0 basis-2/3 px-6 py-2 bg-slate-100 rounded-md">
      <span class="font-semibold">Address Book | 
        <span v-if="!isEmptyAddress" @click.prevent="goToEdit" class="text-sky-500 font-normal cursor-pointer">EDIT </span>
        <nuxt-link v-if="isEmptyAddress" to="/user/addressbook/add" class="text-sky-500 font-normal">ADD </nuxt-link>
      </span>
      <div class="py-2 text-xs lg:flex gap-4">
        <div class="py-2 mb-2 border-b lg:border-b-0 border-slate-300 lg:border-r lg:pr-4">
          <span class="text-gray-400 uppercase"> Default Shipping Address </span>
          <ul v-if="!isEmptyAddress" class="mt-2 space-y-2">
            <li class="font-semibold">{{shippingAddress.name}}</li>            
            <li>{{shippingAddress.address_line}}</li>            
            <li>{{shippingAddress.city}}</li>            
            <li>{{shippingAddress.phone}}</li>            
          </ul>
        </div>
        <div class="pl-1">
          <span class="text-gray-400 uppercase"> Default Billing Address</span>
          <ul v-if="!isEmptyAddress" class="mt-2 space-y-2">
            <li class="font-semibold">{{shippingAddress.name}}</li>            
            <li>{{shippingAddress.address_line}}</li>            
            <li>{{shippingAddress.city}}</li>            
            <li>{{shippingAddress.phone}}</li>            
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  layout: 'userdashboard',
  name: "manage-account",
  async mounted() {
    this.getShippingAddress();
  },
  computed: {
    ...mapState('shipping', ['shippingAddress']),
    isEmptyAddress() {
      return Object.keys(this.shippingAddress).length === 0;
    }
  },
  methods: {
    ...mapActions('shipping', [
      'getShippingAddress'
    ]),
    goToEdit() {
      localStorage.setItem('addressToEdit', JSON.stringify(this.shippingAddress));
      this.$router.push('/user/addressbook/edit');
    }
  }
}
</script>