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
                <Label html-for="email">Email</Label>    
                <Input
                    id="email"
                    v-model="email"
                    type="email"
                    auto-focus 
                    disabled
                    required
                    placeholder="Email"
                />            
            </div>
            <div class="mb-6 relative">
                <Label html-for="current_password">Current Password</Label>    
                    <!-- type="password" -->
                <input
                    id="current_password"
                    :type="[activeInput === 1 ? 'text' : 'password']"
                    v-model.lazy="currentPassword"
                    @change="checkCurrentPassword"
                    auto-focus 
                    required
                    placeholder="Enter current password"
                    class="block w-full
                        px-3 py-1.5 
                        m-0
                        text-sm text-gray-700
                        font-normal                    
                        border border-solid border-gray-300
                        rounded                        
                        transition ease-in-out
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                    :class="{'border-red-500': warning}"
                />
                <span class="absolute top-9 right-2 cursor-pointer" @click.prevent="toggleActiveInput(1)"> 
                    <svg v-if="activeInput !==1" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-if="activeInput===1" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                </span>                        
                <p v-if="warning" class="text-sm text-red-500 mt-2">Password is not matched!</p>   
            </div>
            <div class="mb-6 relative">
                <Label html-for="new_password">New Password</Label>    
                <Input
                    id="new_password"
                    v-model="newPassword"
                    :type="[activeInput === 2 ? 'text' : 'password']"                    
                    auto-focus 
                    required
                    placeholder="Enter new password"
                />            
                <span class="absolute top-9 right-2 cursor-pointer" @click.prevent="toggleActiveInput(2)"> 
                    <svg v-if="activeInput !==2" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-if="activeInput===2" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                </span>                        
            </div>            
            <div class="mb-6 relative">
                <Label html-for="new_password_confirmation">Confirm Password</Label>    
                <Input
                    id="new_password_confirmation"
                    v-model="newPasswordConfirmation"
                    :type="[activeInput === 3 ? 'text' : 'password']"
                    auto-focus 
                    required
                    placeholder="Confirm password"
                />
                <span class="absolute top-9 right-2 cursor-pointer" @click.prevent="toggleActiveInput(3)"> 
                    <svg v-if="activeInput !==3" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-if="activeInput===3" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                </span>                                    
                <p class="text-sm text-red-500 mt-2">{{passwordConfirmation}}</p>   
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
        <div v-if="errors.length > 0" class="mt-4 text-red-500">
            <small>*{{errors[0]}}</small>
        </div>
    </div>
</template>

<script>
import Input from './Input.vue';
import Loader from './Loader.vue';
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
            activeInput: '',
            email: '',
            currentPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
            loader: false,
            warning: false,
            errors: [],
        }
    },    
    mounted() {
        this.userEmail();
    },
    computed: {
        isValid() {
            return (
                this.email !== '' &&
                this.currentPassword !== '' &&
                this.newPassword !== '' &&
                this.warning !== true  &&
                !(this.newPassword !== this.newPasswordConfirmation)
            ) ?
            true : false;
        },
        passwordConfirmation() {
            if (this.newPassword !== this.newPasswordConfirmation) {
                return 'New password and confirm password must be same.'
            }
            return '';
        }
    },
    methods: {
        close() {
            this.reset();
            this.$emit('close', false);
        },
        userEmail() {
            if (this.$auth.loggedIn) {
                this.email = this.$auth.user.email;
            } 
        },        
        submitForm() {
            this.loader = true;            
            let url = `/${this.entity}/password`;
            this.$axios.$post(url, {
            //  email: this.email,
             current_password: this.currentPassword,
             new_password: this.newPassword,
             new_password_confirmation: this.newPasswordConfirmation
         }).then(response => {
                this.reset();
                this.loader = false;
                this.$toast.success(response.data);
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                this.errors = Object.values(error.response.data.errors).flat();
                this.loader = false;
            })   
        },
        checkCurrentPassword() {
            // this.warning = true;
            if (this.currentPassword ==='') return;            
            this.loader = true;
            let url = `/${this.entity}/password`;
            // this.$axios.$get('/admin/password', {
            this.$axios.$get(url, {
                params: {
                    password: this.currentPassword
                }
            })
            .then(response => {
                // if (!response.matched) {
                //     this.warning = true;
                // }
                this.warning = !response.matched ? true : false;
                this.loader = false;
            })
            .catch(error => {
                console.log(error);
                this.loader = false;
            })            
        },
        toggleActiveInput(activeSelection) {
         if (this.activeInput === activeSelection) 
          {
            this.activeInput = '';
            return;
          }
          this.activeInput = activeSelection;
          return;
        },
        reset() {
            // this.email = '';
            this.currentPassword = '';
            this.newPassword = '';
            this.newPasswordConfirmation = '';
            this.errors = [];
            this.warning = false;
        }
    },
}
</script>

<style>

</style>