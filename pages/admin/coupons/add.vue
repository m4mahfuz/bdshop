<template>  
    <section class="max-w-6xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 
            class="pb-2 text-lg text-gray-400 capitalize dark:text-white border-b border-green-100"            
        >
            <span 
                class="border-b-4 border-green-400 pb-2 pr-1"
            > 
                Add Code
            </span>

        </h2>
        <form class="mb-2">
            <div class="mt-4 border-b pb-2">
                <h1 class="mb-2">Code Genaration</h1>
                <div class="flex justify-start items-center gap-4">
                    <div class="form-check">
                        <input 
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioAutomatic" id="flexRadioAutomatic1"
                            value="automatic"
                            v-model="coupon.option"
                        >
                        <label class="form-check-label inline-block text-gray-800 text-sm"      for="flexRadioAutomatic1"
                        >
                            Automatic
                        </label>
                    </div>

                    <div class="form-check">
                        <input                         
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                            type="radio" 
                            name="flexRadioManual" id="flexRadioManual1"
                            value="manual"
                            v-model="coupon.option"
                        >
                        <label class="form-check-label inline-block text-gray-800 text-sm" for="flexRadioManual1">
                            Manual
                        </label>
                    </div>
                </div>
            </div>

            <div class="mt-4 border-b pb-2">
                <h1 class="mb-2">Usage</h1>
                <div class="flex justify-start items-center gap-4">
                    <div class="form-check">
                        <input 
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioSingle" id="flexRadioSingle1"
                            :value="1"
                            v-model="coupon.usage"
                        >
                        <label class="form-check-label inline-block text-gray-800 text-sm"      for="flexRadioSingle1"
                        >
                            Single Times
                        </label>
                    </div>

                    <div class="form-check">
                        <input                         
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                            type="radio" 
                            name="flexRadioMultiple" id="flexRadioMultiple1"
                            :value="2"
                            v-model="coupon.usage"
                        >
                        <label class="form-check-label inline-block text-gray-800 text-sm" for="flexRadioMultiple1">
                            Multiple Times
                        </label>
                    </div>
                </div>
            </div>

            <div class="mt-4 border-b pb-2">
                <h1 class="mb-2">Amount Type</h1>
                <div class="flex justify-start items-center gap-4">
                    <div class="form-check">
                        <input 
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioPercentage" id="flexRadioPercentage1"
                            :value="1"
                            v-model="coupon.amount_type"
                        >
                        <label class="form-check-label inline-block text-gray-800 text-sm"      for="flexRadioPercentage1"
                        >
                         Percentage(%)   
                        </label>
                    </div>

                    <div class="form-check">
                        <input                         
                            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                            type="radio" 
                            name="flexRadioFixed" id="flexRadioFixed1"
                            :value="2"
                            v-model="coupon.amount_type"
                        >
                        <label class="form-check-label inline-block text-gray-800 text-sm" for="flexRadioFixed1">
                            Fixed                        
                        </label>
                    </div>
                </div>
                
                <div class="mt-4 mb-3 w-60">
                    <label
                        for="formControlInputAmount"
                        class="form-label inline-block mb-2 text-blue-600 "
                        >Amount</label
                    >
                    <input
                        type="text"
                        v-model="coupon.amount"
                        class="
                        form-control
                        block
                        w-full
                        px-2
                        py-2
                        text-sm
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                        id="formControlInputAmount"
                        placeholder="Enter amount here"
                    />
                </div>
                <div class="mt-4 border w-80 px-2 pt-3 pb-2 rounded">
                    <ToggleInput 
                        :label="toggleLabelMinimumSpending"
                        :status="false" 
                        @toggleInput="handleToggleInputMinimumSpending"
                    />

                    <div class="my-2 w-60" v-if="minimumSpending">
                    <label
                        for="formControlInputMinimumSpending"
                        class="form-label inline-block mb-2 text-blue-600 font-medium"
                        >Minimum Amount to Spend</label
                    >
                    <input
                        type="text"
                        v-model="coupon.minimum_spending"
                        class="
                        form-control
                        block
                        w-full
                        px-2
                        py-2
                        text-sm
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                        id="formControlInputMinimumSpending"
                        placeholder="Enter amount here"
                    />
                    </div>
                </div>

                <div v-if="coupon.amount_type === 1" class="mt-4 border w-80 px-2 pt-3 pb-2 rounded">
                    <ToggleInput 
                        :label="toggleLabelAmountLimit"
                        :status="false" 
                        @toggleInput="handleToggleInputAmountLimit"
                    />

                    <div class="my-2 w-60" v-if="amountLimit">
                    <label
                        for="formControlInputAmountLimit"
                        class="form-label inline-block mb-2 text-blue-600 font-medium"
                        >Amount Limit</label
                    >
                    <input
                        type="text"
                        v-model="coupon.limit"
                        class="
                        form-control
                        block
                        w-full
                        px-2
                        py-2
                        text-sm
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                        id="formControlInputAmountLimit"
                        placeholder="Enter amount here"
                    />
                    </div>
                </div>
            </div>

            <div class="mt-4 w-80">
                    <label for="categoryLevel" class=" text-gray-600 dark:text-gray-400 font-medium">Select Category</label>
                    <select 
                        v-model="selectedCategories" id="categoryLevel" 
                        class="block px-4 py- text-sm mt-2 w-full h-40 text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        multiple
                    >
                        <!-- <option selected value="null">Main Category</option>                     -->
                        <optgroup 
                            v-for="category in categories" :key="category.id" 
                            :label="category.name"
                        >
                            <option v-for="child in category.children" :key="child.id" :value="{id: child.id, name: child.name}"
                            >                           
                            {{ child.name }}                            
                            </option> 
                        </optgroup>                   
                    </select>
                    <div v-if="selectedCategories.length > 0" class="py-4 text-xs text-red-500">
                        Selected:
                        <span v-for="(category, index) in selectedCategories" :key="index" class="ml-0.5 first:ml-0 after:content-[','] last:after:content-['\0020'] text-blue-700">
                            {{category.name}}
                        </span>
                    </div>
            </div>

            <div class=" mt-4 w-80">
                <label class="block">
                <span class="text-gray-700">Starting From</span>
                <input 
                    type="date" 
                    v-model="coupon.starting"
                    class="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  ">
              </label>
            </div>

            <div class=" mt-4 w-80">
                <label class="block">
                <span class="text-gray-700">Ending</span>
                <input 
                    type="date" 
                    v-model="coupon.ending"
                    class="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  ">
              </label>
            </div>

            <div class="mt-4 mb-3 w-80" v-if="coupon.option === 'manual'">
            <label
                for="exampleFormControlInput4"
                class="form-label inline-block mb-2 text-red-500 font-medium"
                >Code</label
            >
            <input
                type="text"
                v-model="coupon.code"
                class="
                form-control
                block
                w-full
                px-2
                py-2
                text-sm
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                id="exampleFormControlInput4"
                placeholder="Enter code here"
            />
            </div>

            <div class="mt-8">
                <button class="px-4 py-2 mr-2 leading-5 text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Cancel</button>
                <button @click.prevent="save" type="button" :disabled="!isValid" class="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300">Save</button>
            </div>            
        </form>
    </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    layout: 'dashboard',
    head() {
        return {
            title: 'Add Coupon',            
        }
    },
    data() {
        return {
            amountLimit: false,
            minimumSpending: false,
            selectedCategories: [],
            toggleLabelMinimumSpending: 'Enable minimum spending',
            toggleLabelAmountLimit: 'Enable amount limit',
            coupon: {
                active: true,
                option: 'manual',
                usage: 2,                
                amount_type: 1, //1->percentage 2->fixed
                amount: '',
                categories: [],
                starting: null,
                ending: '',
                code: null,
                limit: null,
                minimum_spending: null
            }
        }
    }, 
    mounted() {
       this.getCategories();   
    },
    computed: {
        ...mapState('categories', [
            'categories',
        ]),        
         isValid() {            
            
            return (this.coupon.option !== '' &&
            this.coupon.usage !== '' &&
            this.coupon.amount_type !== '' &&
            this.coupon.ending !== '' &&
            (this.coupon.option === 'manual' ? this.coupon.code !== '' : true)
            ) ? true : false;
        },
    },
     methods: {
        ...mapActions('categories', [
            'getCategories',
        ]),                  
        handleToggleInputMinimumSpending(event) {
            this.minimumSpending = event.value
            event.value === true ? this.toggleLabelMinimumSpending = 'Disable minimum spending' : this.toggleLabelMinimumSpending = 'Enable minimum spending';
        },
        handleToggleInputAmountLimit(event) {
            this.amountLimit = event.value
            event.value === true ? this.toggleLabelAmountLimit = 'Disable amount limit' : this.toggleLabelAmountLimit = 'Enable amount limit';
            // console.log(event);
        },
        save() {
            this.coupon.categories = this.getSelected('categories');
            this.$axios.$post('/coupons', this.coupon)
            .then(response => {
                this.$toast.info('New Coupon Created');
            })
            .catch(error => {
                console.log(error);
            });
        },
        getSelected(item) {
            if (this.selectedCategories.length > 0) {
                let arr = [];
                this.selectedCategories.forEach(element => {
                        arr.push(element.id);
                });
                return arr;
            }
            return null;
        },
    }
}
</script>

<style>

</style>