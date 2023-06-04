<template>
<div>
  <h1>About</h1>
  <loader 
    :active="activateLoader"
    action="loading.." color="#22c55e" :message="true" />

    <div class="my-5 flex gap-5 justify-center items-center"> 
      <div class="flex flex-col gap-5 justify-center bg-slate-200 p-5">
        <input type="text" v-model="key" class="h-10 px-5 rounded">
        <input type="text" v-model="value" class="h-10 px-5 rounded">
        <button class="bg-sky-200 rounded h-10 px-5" @click="setSession(key, value)">
          SET SOMETHING in SESSION
        </button>
      </div>
      
      <button class="bg-sky-200 rounded px-5 h-10 w-full" @click="getSession(key)">
        GET SOMETHING in SESSION
      </button>
      <button class="bg-red-200 rounded px-5 h-10 w-64" @click="clearSession(key)">
        CLEAR
      </button>
    </div>
</div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      key: 'something',
      value: '',
      something: '',
      activateLoader: false,
    }
  },
  mounted() {

  },
  methods: {
    clearSession() {
      this.$axios.$post('/clear', {
          key: this.key,
        }).then(response => {
          this.something = '';
          console.log('CV=', this.something);
          this.activateLoader = false;
          console.log(response)
        }).catch(error => {
          console.log(error)
        });
    },
    setSession(key, value) {
      if (this.$auth.loggedIn) {
        this.activateLoader = true;
        this.$axios.$post('/session', {
          key: key,
          value: value
        }).then(response => {
          this.something = response;
          console.log('SV=', this.something);
          this.activateLoader = false;
        }).catch(error => {
          console.log(error)
        });
      }
    },
    getSession(value) {
      this.something = '';
      this.$axios.$get('/session', {
        params: {
          key: value,
        }
      }).then(respons => {
        this.something = respons;
        console.log('GV=', this.something);
      });
    }
  }
}
</script>

<style scoped>
 
</style>
