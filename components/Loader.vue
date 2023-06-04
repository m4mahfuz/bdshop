<template>
  <div v-if="active" class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
	  <div 
      class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"
      :style="loaderColor"
    ></div>
	  
    <h2 v-if="actionAvailable" class="text-center text-white text-xl font-semibold capitalize">{{action}}...</h2>
	  
    <p v-if="message" class="w-1/2 text-center text-white">This may take a few seconds, please don't close this page.</p>
</div>
</template>

<script>
export default {
  name: "loader",
  props: {
    action: {    //loading/ saving/ deleting/ updating
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: 'green',
    },
    active: {
      type: Boolean,
      default: false
    },
    message: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    actionAvailable() {
      return (this.action !== null) ? true : false;
    },
    loaderColor() {
      return {
        borderTopColor: this.color,
      }
    }    
  }
}
</script>

<style scoped>
  .loader {
	/* border-top-color: green;  */
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
