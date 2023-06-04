<template>
    <input        
        class="block
            w-full 
            px-3
            py-1.5
            text-sm
            font-normal
            text-gray-700            
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "            
        :value="value"
        @input="$emit('input', $event.target.value)"
    />
</template>


<script>
export default {
    props: {
        value: {
            type: String,
            required: true,
        },
    },
}
</script>