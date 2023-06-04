<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <div class="flex justify-center">            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-blue-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
        </div>
        <h3 class="text-2xl font-bold text-center">Join us</h3>
        <form action="">
            <div class="mt-4">
                <div>
                    <label class="block" for="Name">Name</label>
                        <input type="text" placeholder="Name"
                            v-model="user.name"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <div class="mt-4">
                    <label class="block" for="phone">Phone</label>
                        <input type="text" placeholder="Phone"
                            v-model="user.phone"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <div class="mt-4">
                    <label class="block" for="email">Email</label>
                        <input type="text" placeholder="Email"
                            v-model="user.email"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <div class="mt-4">
                    <label class="block">Password</label>
                        <input type="password" placeholder="Password"
                            v-model="user.password"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <div class="mt-4">
                    <label class="block">Confirm Password</label>
                        <input type="password" placeholder="Password"
                            v-model="user.password_confirmation"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
                </div>
                <span class="text-xs text-red-400">Password must be same!</span>
                <div class="flex">
                    <button 
                        @click.prevent="register"
                        class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create
                        Account
                    </button>
                </div>
                <div class="mt-6 text-grey-dark">
                    Already have an account?
                    <a class="text-blue-600 hover:underline" href="#">
                        Log in
                    </a>
                </div>
            </div>
        </form>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '',
                phone: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        }
    },
    mounted() {
        if (this.$auth.loggedIn) {
            this.$router.push('/')
        }
    },
    methods: {
        register(){
            this.$axios.$post('/register', this.user)
            .then(respons => {
                this.$toast.success('Registered successfully!');
                setTimeout(() => this.$router.push('login'), 3000);
            })
            .catch(error => {
                console.log(error);
            })
        },
    }
}
</script>