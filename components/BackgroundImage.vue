<template>
    <div class="w-full h-44 lg:h-60 xl:h-72 bg-cover bg-center rounded-md relative bg-green-100" 
        :style="{'background-image': `url(${imageUrl})`}"
    >
    <slot> </slot>    
  </div>
</template>

<script>
export default {
    props: {
        imageUrl: {
            type: String,
            required: true
        }
    }
}
</script>