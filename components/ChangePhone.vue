<template>
    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm relative text-sm">
      <button
        v-if="entity !== 'admin'" 
        aria-label="close"
        class="absolute top-0 right-0 text-xl text-gray-500 my-2 mx-4 w-6 h-6 hover:border hover:border-gray-500 rounded-full flex justify-center items-center"
        @click.prevent="close"
      >
        ×
      </button>
        <loader :active="loader" action="loading" />
        <form @submit.prevent="submitForm">
            <div class="mt-2 mb-6">
                <Label html-for="phone">Phone</Label>    
                <Input
                    id="phone"
                    v-model="phone"
                    type="phone"
                    auto-focus                     
                    required
                    placeholder="Phone"
                    :class="[has('phone') ? 'border-pink-600 text-pink-600' : 'border-gray-200']"
                />            
                <p 
                    class="my-2 text-pink-600 text-sm" 
                    v-if="has('phone')"
                    v-text="get('phone')"
                ></p>
            </div>
                        
            <button 
                type="submit" 
                class="
                w-full
                px-6
                py-2.5
                bg-blue-600
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out
                disabled:bg-blue-300
                disabled:cursor-not-allowed
                " 
                :disabled="!isValid"
            >Submit
           </button>   
            <button 
                type="button" 
                @click.prevent="reset()"
                class="
                w-full
                px-6
                py-2.5
                mt-3
                bg-gray-300
                text-gray-700
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-gray-500 hover:text-white hover:shadow-lg
                focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-gray-500 active:text-white active:shadow-lg
                transition
                duration-150
                ease-in-out"          
            >Cancel
           </button>   
        </form>        
    </div>
</template>

<script>
import Input from './Input.vue';
import Loader from './Loader.vue';
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: { Input, Loader },
    props: {
        entity: {
            type: String,
            required: true
        }
    },
    data() {
        return {            
            loader: false,
            phone: '',
            warning: false,
        }
    },    
    mounted() {
        // this.userEmail();
    },
    watch: {
        'phone'(value) {
            if (value === '') {
                this.resetErrors();
            }
        },
    },
    computed: {
        ...mapGetters('errors', [
            'has',
            'get',
        ]),  
        isValid() {
            return (
                this.phone !== '' &&
                this.warning !== true 
            ) ?
            true : false;
        },        
    },
    methods: {
        ...mapActions('errors', [
            'setErrors',      
            'resetErrors'
        ]),
        close() {
            this.reset();
            this.$emit('close', false);
        },                
        submitForm() {
            this.loader = true;            
            let url = `/${this.entity}/phone`;
            this.$axios.$post(url, {
              phone: this.phone,             
         }).then(response => {
                this.$emit('changed', {phone: this.phone})
                this.reset();
                this.loader = false;
                this.$toast.success(response.data);
            })
            .catch(error => {
                this.setErrors(error.response.data.errors);
                this.loader = false;
            })   
        },        
        reset() {
            this.phone = '';            
            this.warning = false;
        }
    },
}
</script>