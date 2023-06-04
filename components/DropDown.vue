<template>
  <div v-if="show" class="dropdown absolute z-50 mt-3 rounded-md shadow-lg w-48 right-0 py-2 bg-gradient-to-r from-white to-gray-200">
    <div class="px-6 py-2 text-sm text-sky-500">
        {{$auth.$state.user.name}}
    </div>
    <!-- <nuxt-link to="/dashboard/profile" class="block px-6 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 transition">Profile</nuxt-link> -->
    <slot />
    <div class="border-t border-gray-100"></div>
    <div @click.prevent="logout" class="cursor-pointer block px-6 py-2 text-sm leading-5 text-red-600 hover:bg-gray-100 transition">Signout</div>            
    </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // strategy: {
    //   type: String,
    //   default: 'cookie'
    // }
  },
  methods:{
    async logout() {
      let strategy = this.$auth.$state.strategy;
      await this.$auth.logout(strategy)
        .then(() => {
          this.$toast.warning('Logged Out!')
          return (strategy === 'admin') ? 
            this.$router.push('/admin/login') :
            this.$router.push('/login');
        })
    }
  } 
}
</script>
