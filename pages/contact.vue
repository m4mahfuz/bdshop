<template>
    <section class="py-12">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-semibold mb-6">Contact Us</h2>
            <transition name="fade">
                <div v-if="show" class="my-4 bg-red-500 text-white max-w-md mx-auto px-4 py-2 rounded-lg">
                {{ showMessage }}
                </div>
            </transition>
            <form @submit.prevent="handleSubmit" class="border p-5 lg:p-10 rounded-md max-w-md mx-auto bg-slate-100">
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 font-semibold mb-2">Your Name</label>
                    <input v-model="contact.name" type="text" id="name" name="name" required placeholder="John Doe" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500">
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-gray-700 font-semibold mb-2">Email Address</label>
                    <input v-model="contact.email" type="email" id="email" name="email" required placeholder="johndoe@example.com" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500">
                </div>

                <div class="mb-4">
                    <label for="message" class="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea v-model="contact.message" id="message" name="message" rows="5" required placeholder="Write your message here" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"></textarea>
                </div>

                <!-- Google reCAPTCHA widget -->
                <div class="mb-4">           
                    <vue-recaptcha  @verify="onCaptchaVerified" sitekey="6LdsiEAnAAAAAP5w7uPfoOVhzptHrJsDg4aEmKLS"
                    :loadRecaptchaScript="true"
                    ></vue-recaptcha>
                </div>

                <div class="mb-4">
                    <button type="submit" class="px-10 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300" :disabled="!isValid">Submit</button>
                </div>
            </form>
        </div>
        <loader action="submitting" :active="loader" />            
    </section>    
  </template>
  
  <script>
  import VueRecaptcha from "vue-recaptcha";
  
  export default {    
    components: {
      VueRecaptcha,
    },
    data() {
      return {
        loader: false,
        contact: {
          name: "",
          email: "",
          message: "",
        },
        response: null,
        show: false,
        showMessage: "Thank you for contacting with us.",
        timer: null,
        timerDuration: 3000  // 5 seconds
      };
    },    
    computed: {
        isValid() {
            return (
                this.contact.name !== '' &&
                this.contact.email !== '' &&
                this.contact.message !== '' &&
                this.response !== null
            ) ? true : false;
        }
    },
    methods: {
      handleSubmit() {
        // this.show = true;
        //submit code to server
        this.save();        
      },
      save() {
            this.loader = true;            
            this.$axios.$post('/contacts', this.contact)
            .then(response => {
								// this.reset();
                this.loader = false;
                this.show = true;
                this.startTimer();
            })
            .catch(error => {                
                this.loader = false;
                console.log(error.response);
            })            
        },

      onCaptchaVerified(response) {
        // Handle the form submission after successful reCAPTCHA verification
        this.response = response;
        // console.log("reCAPTCHA response:", response);        
      },
      startTimer() {
            this.show = true;
            this.timer = setTimeout(() => {
                this.show = false;
            }, this.timerDuration);
        },
        clearTimer() {
            clearTimeout(this.timer);
            this.show = false;
      },
      reset() {
        this.contact.name = '';
        this.contact.email = '';
        this.contact.message = '';
        this.response = null;
      }
    },
    beforeDestroy() {
        this.clearTimer();
    },
  };
  </script>
  <style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0;
    }
  </style>
  