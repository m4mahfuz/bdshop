<template>
  <section class="bg-white min-h-screen dark:bg-gray-900">
      <div class="container flex items-center justify-center h-screen bg-slate-300">
        
        <loader action="loading" :active="loader" />            
        
        <form v-if="invitee !==null" class="w-full max-w-md   bg-slate-100 px-12 py-8 rounded-md" autocomplete="off">
            <div class="flex justify-center mx-auto">
                <img class="w-auto h-10 sm:h-12" src="~/assets/img/logo.png" alt="">
            </div>

            <div class="relative flex items-center mt-6">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

                <input v-model="user.email" type="email" class="block w-full py-3 text-gray-700 bg-gray-100 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                readonly
                placeholder="Email address"
                >
            </div>

            <div class="relative flex items-center mt-8">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>

                <input v-model="user.name" type="text" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username">
            </div>
            <div class="relative flex items-center mt-8">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span>

                <input v-model="user.phone" type="number" class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Phone">
            </div>              
            <div class="relative flex items-center mt-4">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input v-model="user.password" type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password">
            </div>

            <div class="relative flex items-center mt-4">
                <span class="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input v-model="user.password_confirmation" type="password" class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password">
            </div>

            <div class="mt-6">
                <button @click.prevent="register()" type="button" class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign Up
                </button>
            </div>
            <div v-if="isError" class="my-2 sm:my-4 text-xs text-red-500">
							*Something went wrong! Please contact with admin. 
            </div>
        </form>
        
        <div v-else class="w-full max-w-md bg-slate-100 text-blue-700 text-large px-12 py-8 rounded-md">
            <span class="bg-yellow-100 text-red-500 px-4 mr-2 text-xl">Oops!</span> You are not allowed to continue the process.
        </div>
      </div>
  </section>
</template>

<script>
export default {
    layout: 'blank',
    data() {
        return {
            user: {
                email: '',
                name: '',
                phone: '',
                password: '',
                password_confirmation: '',
                type_id: '',
                token: ''
            },
            invitee: '',
            loader: true,
            isError: false,
        }
    },
    mounted() {
        this.invitee = this.getIviteeBy(this.$route.params.token);
        this.user.token = this.$route.params.token;
    },
    methods: {
        getIviteeBy(token) {
            this.$axios.$get(`/admin/invite/${token}`)
            .then(response => {
							this.loader = false;                
							this.invitee = response.data;
							if (response.data !== null) {
                this.user.email = this.invitee.email;
							}
            })
            .catch(error => {
                console.log(error);
            })
        },
        register() {
            this.loader = true;
            this.user.type_id = this.invitee.type_id;
            this.$axios.$post('/admin/register', this.user)
            .then(response => {                
                this.loader = false;                
                if (response.data === 'success') {
                    this.$router.push('/admin/dashboard')
                    return;
                }
            })
            .catch(error => {
                console.log(error.response);
                this.loader = false;
                this.isError = true;
            })
        }
    }
}
</script>

<style>

</style>