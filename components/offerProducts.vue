<template>
  <div class="flex gap-4 overflow-y-scroll">
                
    <div 
        v-for="offer in offers" :key="offer.id"                 
        class="flex justify-center"
    >
        <div 
        v-for="product in offer.products" :key="product.id"
        class="relative p-2 rounded-lg w-48"
        >
            <ProductCard :product="product"/>

            <div
                v-if="offer.type === 'Percentage' || offer.type === 'Fixed Amount'" 
                class="absolute flex right-0 bottom-0 p-3 gap-4"
            >
                <!-- discount percent -->
                <div class="flex flex-col justify-center text-gray-100 text-center h-12 w-12 rounded-full bg-gradient-to-r from-red-700 to-orange-500 rotate-12">
                <span class="text-xl">{{ offer.amount }}%</span>
                <span class="-mt-1 text-xs">off</span>
                </div>
            </div>
        
            <div v-else class="absolute top-0">
            <div class="pl-0 flex justify-end translate-x-28 translate-y-14 rotate-90">
                <span 
                class="pl-2 pr-2 text text-white"
                :class="offer.type === 'Buy 1 Get 1' ? 'bg-gradient-to-r from-green-700 to-green-500' : 'bg-gradient-to-r from-orange-700 to-orange-500'"
                >
                    {{offer.type}} 
                    <span class="uppercase">free</span>
                </span>
            </div>
            </div> 
        </div>
    </div>
    </div>
</template>

<script>
export default {
    props: {
        offers: {
            type: Array
        }
    }
}
</script>

<style>

</style>