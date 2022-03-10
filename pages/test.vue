<template>
  <div class="mx-8 my-8">
      <h1> Counter Value from State: {{counter}}</h1>
      <h1> Counter Value from Getters: {{getCounter}}</h1>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click.prevent="increaseCounter()"> + </button>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="decreaseCounter"> - </button>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from "vuex";

export default {
    data()  {
        return {
            myCounter: '',
        }        
    },

    mounted() {
        console.log(this.$auth.user)
    },

    computed: {
        ...mapState('moduleOne', [
            'counter'
        ]),
        
        ...mapGetters('moduleOne', [
            'getCounter'
        ])
    },

    methods: {
        ...mapActions('moduleOne', [
            'increaseCounter',
            'decreaseCounter'        ])
    }

}
</script>

<style>

</style>