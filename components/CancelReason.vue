<template>
    <div>
        <label for="countries" class="block my-1.5 text-xs font-medium text-gray-900 dark:text-gray-400">Reason for cancellation</label>
        <select 
            v-model="selectedReason"
            @change="dispatchEvent"
            
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1.5"
        >
            <option disabled value="">Please select one</option>
            <option v-for="(option, index) in options" :value="option.text" :key="index">
                {{ option.text }}
            </option>
        </select>

    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
         return {
            selectedReason: '',
             options: [
                { text: 'Order created by mistake'},
                { text: 'Item(s) would not arrive on time'},
                { text: 'Item price too high'},
                { text: 'Found cheaper somewhere else'},
                { text: 'Need to change shipping address'},
                { text: 'Need to change payment method'},
                { text: 'Other'},
            ]
         }
    },
    methods: {
        dispatchEvent() {
            this.$emit('selected', {
                id: this.id,
                reason: this.selectedReason
            });
        },        
    }     
}
</script>
