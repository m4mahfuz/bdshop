<template>
    <div class="has-tooltip">
        <slot></slot>
        <span 
            class="tooltip rounded-lg px-3 py-2 bg-gray-500 text-white text-sm"
            :class="[mTop, mLeft]"
        >
            <slot name="message"></slot>  
        </span>
    </div>
</template>

<script>
export default {
    props: {
        mTop: {
            type: String,
            default: 'mt-12'
        },
        mLeft: {
            type: String,
            default: '-ml-3'
        },
    },
}
</script>

<style scoped>    
    .tooltip {
        /* @apply invisible absolute; */
        visibility: hidden;
        position: absolute;
    }

    .has-tooltip .tooltip::after {
        content: "";
        position: absolute;
        /* top: 100%; */
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #6b7280 transparent;

    }

    .has-tooltip:hover .tooltip {
        /* @apply visible z-50 */
        visibility: visible;
    }

</style>