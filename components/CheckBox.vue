<template>
  <div>
    <input 
        v-model="checkedValue"         
        type="checkbox" 
        :id="product.id"        
        class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
    >
    <div v-if="checkedValue">
        <CancelReason 
            :id="product.pivot.id" 
            @selected="handleSelectedEvent"
        />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        product: Object,
    },
    data() {
        return {
            checkedValue: '',
            selectedValue: {}
        }
    },
    watch: {
        checkedValue(value) {
            if (value === false) {
                this.dispatchEvent('unchecked', this.selectedValue);
            }
        }
    },
    methods: {
        handleSelectedEvent(event) {
            this.selectedValue = event;
            this.dispatchEvent('checked');
        },
        dispatchEvent(type) {
            this.$emit(type, this.selectedValue);
        }
    }

}
</script>

<style>

</style>