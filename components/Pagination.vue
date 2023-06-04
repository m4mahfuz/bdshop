<template>
    <ul class="flex list-reset border border-grey-light rounded-md w-auto font-sans">
        <li v-if="pagination.current_page > 1">
            <button type="button" class="block hover:text-white hover:bg-blue-600 text-blue-700 border-r border-grey-light px-3 py-2" 
                @click.prevent="change(pagination.current_page -1)"
            >
                Previous
            </button>
        </li>
        <li v-for="page in pages" :key="page" >
            <button type="button" :class="[page == pagination.current_page ? 'text-white bg-blue-700 border-r border-blue-700':'hover:text-white hover:bg-blue-600 text-blue-700 border-r border-grey-light', 'block px-3 py-2']" 
               
               @click.stop="change(page)"
            >
                {{ page }}
            </button>
        </li>
        <li v-if="pagination.current_page < pagination.last_page">
            <button type="button" class="block hover:text-white hover:bg-blue-600 text-blue-700 px-3 py-2" 
               
               @click.prevent="change(pagination.current_page + 1)"
            >
                Next
            </button>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            pagination: {
                type: Object,
                required: true
            },
            offset: {
                type: Number,
                default: 4
            }
        },

        computed: {
            pages() {
                if (!this.pagination.to) {
                    return null;
                }

                let from = this.pagination.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }

                let to = from + (this.offset * 2);
                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page;
                }

                let pages = [];
                for (let page = from; page <= to; page++) {
                    pages.push(page);
                }

                return pages;
            },
        },

        methods: {
            change(page) {
                // console.log('p', page)
                // this.pagination.current_page = page;
                // this.$emit('paginate');
                this.$emit('paginate', page);
            }
        }
    }
</script>