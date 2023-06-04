<template>
    <!-- <div id="mySidenav" class="sidenav"> -->
    <div v-if="show" class="sidenav h-full bg-slate-50" :class="{ 'sidenav-extend': show }">
        <!-- <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a> -->
        <div class="flex bg-gray-100 pt-14 pb-6 text-center">
            <div class="flex-none pl-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="flex-auto">
                <span class="font-bold text-xl mr-1">{{count}}</span>Quantity of
                <span class="text-lg">{{getCartLength}}</span> 
                Items
            </div>
            <div class="flex-none">
                <button class="bg-gray-400 hover:bg-gray-600 hover:text-white text-xs px-2 py-2 mr-1 rounded-full" @click.prevent="$emit('close', false)">Close</button>
            </div>
        </div>
        <div class="p-0">           
            <div v-for="product in cart" :key="product.id" class="flex justify-between py-3 border-b text-xs">                                
                <div class="basis-1/5 pl-2">
                    <img class="w-10" :src="url(product.image)" :alt="product.name">
                </div>
                <div class="basis-1/2 px-2 font-light">
                    <span class="font-medium">{{ product.name }}</span>
                    <p>{{product.unit_quantity}} {{ product.unit }}</p>
                    <p><HelperTkSymbol text="text-sm"/>  <span class="font-normal" v-text="priceOf(product)" /></p>
                </div>
                <div class="basis-1/5">
                    x {{product.quantity}}
                </div>
                <div class="basis-1/5 text-center">
                    <HelperTkSymbol text="text-sm"/> 
                    <span class="pr-1" v-text="totalPrice(product)" />
                </div>
                <div class="basis-1/5 text-center">
                    <button @click.prevent="removeFromCart(product)" class=" transition delay-300 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                </div>
            </div>
            
        </div>
        <div class="absolute inset-x-0 bottom-0 bs-light-green-bg p-1">           
            <div class="flex items-center mt-3">
                <div class="basis-1/3 text-lg bg-green-300 text-right px-2 py-2.5 rounded-l-md">
                    Total:
                </div>
                <div class="basis-2/3 text-xl text-gray-900 bg-green-200 px-3 py-2 rounded-r-md">
                    <HelperTkSymbol /> {{netTotalPrice}}
                </div>
            </div>
            <div class="py-4 w-full flex flex-col justify-center items-center gap-1">
                <button @click.prevent="goto('cart')" type="button" class="bg-green-500 text-gray-800 hover:bg-green-600 hover:text-gray-900 rounded-full w-full px-2 py-1">Cart</button>
                <button @click.prevent="goto('checkout')" type="button" class="bg-orange-500 text-gray-800 hover:bg-orange-600 hover:text-gray-900 rounded-full w-full px-2 py-1">Checkout</button>
            </div>
        </div>

        <!-- <div class="relative py-4 mt-2">
            <div class="absolute inset-x-0 bs-light-green-bg p-2">
                <div class="text-xl my-2 text-center">Total: 
                    <span class="ml-2"><HelperTkSymbol /> {{totalPrice}}</span>
                </div>
                <div class="py-4 w-full mb-3">
                    <button class="rounded-full w-full p-2 bg-yellow-200">Place Order</button>
                </div>
            </div>
        </div> -->

    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from "vuex";
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            count: Number
        },
        data() {
            return {
                // 'sidenav-extend': this.show,
            }
        },
        mounted() {
            console.log('Mini Cart Mounted');
            // console.log(this.show)
        },
        watch: {
            show(value) {
                if(value===true) {
                    document.getElementById("app").style.marginRight = "320px";
                    return;
                }
                    document.getElementById("app").style.marginRight = "0";
            }
        },
        computed: {
            ...mapState('cart', [
                'cart'
            ]),
            ...mapGetters('cart', [
                'getCartLength'
            ]),            
            netTotalPrice() {
                let total = 0;
                for (let product of this.cart) {
                    total += this.priceOf(product) * product.quantity;
                }
                return total.toFixed(2);
            }
            
        },
        methods: {
            ...mapActions('cart', [
                'removeFromCart'
            ]),
            goto(page) {
                if (page === 'cart') {
                    this.$router.push('/cart')
                    return;
                }
                this.$router.push('/checkout')
            },
            priceOf(product) {
                return product.price ?? product.original_price;
            },
            totalPrice(product) {
                return parseInt(this.priceOf(product) * product.quantity);
            },
            url(image) {        
                let path = `/storage/images/products/small/${image}`;
                // return `${this.$config.baseURL}${path}`;
                if (typeof image === 'object' && image !== null) {
                    path = `/storage/images/products/small/${image.name}`;                    
                }
                return `${this.$config.baseURL}${path}`;              
            },            
        }    
    }
</script>

<style scoped>
    .sidenav {
        /* height: 100%; */
        /* height: calc(100vh - 10px); */
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        /* left: 0; */
        right: 0;
        /* background-color: rgb(174, 158, 158); */
        overflow-x: hidden;
        transition: 0.5s;
        /* padding-top: 60px; */        
    }

    .sidenav-extend {
        width: 320px;
        box-sizing: border-box;
        box-shadow: -2px 0 12px 0 rgba(143,143,143,.38);
    }

    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }

    .sidenav a:hover {
        color: #f1f1f1;
    }

    .sidenav .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
    }

    /* #main {
        transition: margin-left .5s;
        padding: 16px;
    } */

    @media screen and (max-height: 450px) {
        .sidenav {padding-top: 15px;}
        .sidenav a {font-size: 18px;}
    }
    /* button svg:hover {
    stroke:#ef4444;
    transition: all ease 0.3s;
    }

    button svg path {
    transition: all ease 0.3s;
    } */
</style>