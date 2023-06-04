<template>
    <Transition name="fade">
    <div v-if="elementVisible" class="bg-emerald-200 p-8 mb-4 rounded-md relative">        
        <button
        aria-label="close"
        class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4 w-6 h-6 hover:border hover:border-gray-500 rounded-full flex justify-center items-center"
        @click.prevent="close"
      >
        ×
      </button>
        <slot />
    </div>
    </Transition>
</template>    
<script>
    export default {
        props: {
            time: {
                type: Number,
                default: 3
            } ,
            show: {
                type: Boolean,
                required: true
            }
        },
        data () {
            return {
                elementVisible: false  //true,
            }
        },
        watch: {
            show(value) {
                console.log(value)
                if (value) {
                    this.addOverFlowHiddenClass();
                    this.elementVisible = value;
                    setTimeout(() => this.elementVisible = false, this.time*1000);
                    this.close();
                }
                this.removeOverFlowHiddenClass();
            }
        },        
        methods: {
            close() {
                this.$emit('close', false);
            },
            addOverFlowHiddenClass() {
                return document.querySelector('body').classList.add('overflow-hidden');
            },
            removeOverFlowHiddenClass() {
                document.querySelector('body').classList.remove('overflow-hidden');
            }
        }            
    }
</script>
<style scoped>
    .fade-leave-active {
  	transition: all 0.5s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>