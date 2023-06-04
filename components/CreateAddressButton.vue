<template>
  <button @click.prevent="createNewAddressUrl" type="button" class="px-4 py-1 rounded bg-blue-500 hover:bg-blue-600 hover:ring-2 text-sm text-white text-center uppercase">Add new Address
  </button>
</template>

<script>
export default {
  methods: {
    createNewAddressUrl() {
      localStorage.setItem('redirect', this.$route.path);
      this.$router.push('/user/addressbook/add');
    }, 
  }
}
</script>

