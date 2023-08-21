<template>
  <section class="py-10">
    <div class="w-3/5 border p-4 rounded-lg">
       <p>
        <span class="font-semibold uppercase px-2">From:</span>{{ contact.name }}
        <span class="text-xs text-gray-400">({{ contact.email }})</span> 
       </p>
       <p class="text-sm my-2">
        <span class="font-semibold text-xs uppercase px-2">On:</span>{{ contact.received }}
       </p>
       <div class="my-3">
          <span class="px-2 font-semibold uppercase">Message:</span>
          <p class="min-h-max my-1 px-2 text-sm text-gray-600 rounded-md overflow-x-hidden overflow-y-auto">
            {{ contact.message }}
          </p>
       </div>
    </div>
    <div class="w-3/5 my-4 flex justify-end items-center">
       <button @click.prevent="$router.back()" class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Back</button>
     </div>
  </section>
</template>

<script>
export default {
    layout: 'dashboard',
    data() {
      return {
        contact: {}
      }
    },
    mounted() {
      this.contact = JSON.parse(localStorage.getItem('contact'));
    }
}
</script>

<style>

</style>