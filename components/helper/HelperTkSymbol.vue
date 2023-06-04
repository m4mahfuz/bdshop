<template>
  <span :class="text" v-text="tkSymbol" /> 
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: 'text-xl'
        }
    },
    data() {
        return {
            tkSymbol: '\u09F3'
        }
    }
}
</script>

