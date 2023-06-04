<template>
	<Transition name="fade">
		<div 
			v-if="showing"
			class="fixed inset-0 w-full h-screen flex items-center justify-center bg-gray-900/75 z-20"
			@click.self="close"
		>
			<div class="relative max-w-2xl bg-white shadow-lg rounded-lg p-8">
				<button
					aria-label="close"
					class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4"
					@click.prevent="close"
				>
					×
				</button>
				<slot />
			</div>
		</div>
	</Transition>
</template>
 
<script>
export default {
  props: {
    showing: {
      required: true,
      type: Boolean
    }
  },
	 methods: {
    close() {
      this.$emit('close');
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