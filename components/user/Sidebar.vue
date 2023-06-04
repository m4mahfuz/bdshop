<template>
    <!-- <aside class="w-64 bg-gray-600" aria-label="Sidebar"> -->
    <div class="overflow-y-auto px-0">        
        <div class="flex flex-col px-8 py-2">
            <div class="text-lg text-gray-500">Hello, {{$auth.$state.user.name}}</div>            
        </div>
        <div class="px-3">        
            <ul class="space-y-2">
                <li @click.prevent="toggleActive(1)">
                    <nuxt-link 
                        to="/manage-account" 
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                        :class="{'text-sky-500': navItem === 1}"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                        </svg>

                        <span class="ml-3">Manage Account</span>
                    </nuxt-link>
                    <ul class="ml-10 text-sm text-gray-500">
                        <li @click.stop.prevent="toggleActive(11)">
                            <nuxt-link 
                                to="/user/profile"
                                class="block px-4 py-1 rounded hover:bg-gray-100 hover:text-gray-700"
                                :class="{'text-sky-500': navItem === 11}"
                            >
                                Profile
                            </nuxt-link>
                        </li>
                        <li @click.stop.prevent="toggleActive(12)">
                            <nuxt-link
                                to="/user/addressbook"
                                class="block px-4 py-1 rounded hover:bg-gray-100 hover:text-gray-700"
                                :class="{'text-sky-500': navItem === 12}"
                            >
                            Address Book
                            </nuxt-link>
                        </li>                        
                        <li @click.stop.prevent="toggleActive(13)"  class="block px-4 py-1 rounded hover:bg-gray-100 hover:text-gray-700">Payment Options</li>                        
                        <li @click.stop.prevent="toggleActive(14)">
                            <nuxt-link
                                to="/user/addressbook"
                                class="block px-4 py-1 rounded hover:bg-gray-100 hover:text-gray-700"
                                :class="{'text-sky-500': navItem === 14}"
                            >
                            My Balance
                            </nuxt-link>
                        </li>                        
                    </ul>
                </li>
                <li @click.prevent="toggleActive(2)">
                <nuxt-link 
                    to="/orders"
                    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                    :class="{'text-sky-500': navItem === 2}"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    <span class="flex-1 ml-3 whitespace-nowrap font-medium">Orders</span>                    
                </nuxt-link>
                    <ul class="space-y-2 ml-12 text-sm text-gray-500">
                        <li @click.stop.prevent="toggleActive(21)">
                            <nuxt-link
                                to="/user/returns"
                                class="block px-4 py-1 rounded hover:bg-gray-100 hover:text-gray-700"
                                :class="{'text-sky-500': navItem === 21}"
                            >
                            Returns
                            </nuxt-link>
                        </li>
                        <li @click.stop.prevent="toggleActive(22)">
                            <nuxt-link
                                to="/user/cancellations"
                                class="block px-4 py-1 rounded hover:bg-gray-100 hover:text-gray-700"
                                :class="{'text-sky-500': navItem === 22}"
                            >                            
                            Cancellations
                            </nuxt-link>
                        </li>                        
                    </ul>
                </li>
                <li>
                    <nuxt-link 
                        to="/user/wishlist"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>

                        <span class="flex-1 ml-3 whitespace-nowrap">Wishlist</span>
                        <span class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-red-600 bg-red-200 rounded-full">{{ getWishlistsCount }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link 
                        to="/cart"
                        class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <span class="flex-1 ml-3 whitespace-nowrap">Cart</span>
                        <span class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-cyan-600 bg-cyan-200 rounded-full">{{ getCartItemsQty }}</span>
                    </nuxt-link>
                </li>
                <li>
                    <button
                        @click.prevent="logout()"
                        class="w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd" />
                        </svg>
                        <span class="ml-3 font-semibold">Signout</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
    <!-- </aside> -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            navItem: '',
        }
    },
    mounted() {
        if (this.getWishlistsCount == '') {
            this.getWishlists();
        }
        if (this.getCartItemsQty == '') {
            this.getCart();
        }
    },
    computed: {
        ...mapGetters('wishlists', ['getWishlistsCount']),
        ...mapGetters('cart', ['getCartItemsQty']),
    },
    methods: {
        ...mapActions('wishlists', ['getWishlists']),
        ...mapActions('cart', ['getCart']),
        toggleActive(activeSelection) {
          this.navItem = activeSelection;                    
        },
        async logout() {
            await this.$auth.logout('cookie')
            .then(() => {
                this.$toast.warning('Logged Out!');
                return this.$router.push('/login');
            })
        }
    } 
}

</script>

