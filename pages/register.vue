<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <div class="flex justify-center py-4">                        
            <Logo :logo-text="false" />
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
                <span v-show="user.password_confirmation !==''" class="text-xs text-red-400">Password must be same!</span>
                <div class="flex">
                    <button 
                        @click.prevent="register"
                        class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create
                        Account
                    </button>
                </div>
                <div class="mt-6 text-grey-dark">
                    Already have an account?
                    <nuxt-link to="/login" class="text-blue-600 hover:underline">
                        Log in
                    </nuxt-link>
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