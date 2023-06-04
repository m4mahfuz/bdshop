<template>
  <div>cat</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    layout: 'dashboard',
    data() {
        return {
        slug: this.$route.params.category,
        }
    },
    mounted() {
        this.getCategory(this.slug)
    },
    computed: {
        ...mapState('categories', [
            'category'
        ]),
    },
    methods: {
        ...mapActions('categories', [
            'getCategory'		
        ]),
    }

}
</script>

<style>

</style>