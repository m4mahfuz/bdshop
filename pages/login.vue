<template>
    <div class="flex justify-center w-full bg-gray-200">    
        <div v-if="$auth.loggedIn" class="py-20">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 inline-block mb-2" fill="none" viewBox="0 0 24 24" stroke="green" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> <span class="text-3xl text-green-600">Already Logged In!</span>
        </div>
        <div v-else class="w-1/3 mx-auto bg-white p-5 rounded-lg my-10">
        <!-- <Errors class="mb-5" :errors="errors"></Errors> -->

        <form autoComplete="off" @submit.prevent="submitForm">
            <div>
                <Label html-for="email">Email</Label>
    
                <Input
                    id="email"
                    v-model="email"
                    type="email"
                    class="block mt-1 w-full"
                    required
                    auto-focus
                    auto-complete="off"
                />
            </div>

            <div class="mt-4">
                <Label html-for="password">Password</Label>

                <Input
                    id="password"
                    v-model="password"
                    type="password"
                    class="block mt-1 w-full"
                    required
                    auto-complete="current-password"
                />
            </div>

            <div class="block mt-4">
                <label
                    htmlFor="remember_me"
                    class="inline-flex items-center">
                    <input
                        id="remember_me"
                        v-model="remember"
                        type="checkbox"
                        name="remember"
                        class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />

                    <span class="ml-2 text-gray-600">Remember me</span>
                </label>                
            </div>

            <div class="text-center mt-6">
                <button
                class="bg-gray-600 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                type="submit"
                style="transition: all 0.15s ease 0s;"
                >
                Sign In
                </button>
            </div>

            <div v-if="errors.length > 0" class="mt-4 text-red-500">
                <small>*{{errors[0]}}</small>
            </div>
            
            <div class="flex items-center justify-start mt-6">
                <NuxtLink to="/forgot-password" class="text-sm text-gray-600 hover:text-gray-900">
                    Forgot your password?
                </NuxtLink>
            </div>

            <div class="flex items-center justify-start mt-4">
                <NuxtLink to="/forgot-password" class="text-sm text-gray-600 hover:text-gray-900">
                    Create new one
                </NuxtLink>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {    
        // middleware: 'auth',
        auth: 'guest',

        data: () => ({
            errors: [],
            email: '',
            password: '',
            remember: false,
        }),

        head() {
            return {
                title: 'Sign In — bdshop',
            }
        },      
        
        computed: {
            ...mapState('cart', [
                'cart'
            ]),         
        },

        methods: {
            ...mapActions('cart', [
                'getCart',
            ]),
            ...mapActions('wishlists', ['getWishlists']),
            submitForm(event) {
                this.errors = [];
                // localStorage.setItem('redirect', this.$route.path);
                this.$auth.loginWith('cookie', {
                    data: {
                        email: this.email,
                        password: this.password,
                        remember: this.remember
                    },
                }).then(() => {
                        this.handleCart();        
                        this.getWishlists();
                        let redirectPath =  localStorage.getItem('redirect');               
                        if (redirectPath !== null) {
                            if (redirectPath === '/login') {
                                this.$router.push('/');
                                return;
                            }
                            this.$router.push(localStorage.getItem('redirect'));
                        }
                        // this.$router.push('/')
                        // console.log('user', this.$auth.user);
                        this.$toast.success('Logged In!')
                    })
                    .catch(error => {
                        if (error.response.status !== 422) throw error

                        this.errors = Object.values(error.response.data.errors).flat();
                    })
            },           
            async handleCart() {
                const cart = this.cart;
                if (cart.length) {                    
                    for (let element of cart) {
                        await this.saveToDatabase(element);
                    }
                }
                console.log('CartHandleDone');
                this.getCart();
            },            
            saveToDatabase(product) {
                return this.$axios.$post('/carts', {
                    product_id: product.id,
                    user_id: this.$auth.user.id,
                    // name: data.product.name,
                    // image: data.product.featured_image,
                    // price: product.price,
                    price: product.original_price,
                    quantity: product.quantity,
                    action: product.action
                })
                .then(respons => {
                    console.log('product saved in db cart')
                }).catch(error => {
                    console.log(error);
                });
            },
            // clearCartAtLocalStorage() {
            //     localStorage.setItem('cart', '[]');
            //     console.log('cartAtLocalStorageCleared');
            // }
            // setCartAtLocalStorage() {
            //     console.log('CLS', this.cart.length);
            //     localStorage.setItem('cart', JSON.stringify(this.cart))
            //     console.log('cartAtLocalStorageFilld');
            // }
        }
    }
</script>