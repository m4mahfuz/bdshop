<template>
    <!-- <div>
        <label class="relative flex justify-between items-center p-2 text-xl cursor-pointer">
        <input 
            type="checkbox" 
            class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md cursor-pointer" 
            v-model="toggleInputValue" 
            :checked="status" 
            @change="emitToggleInputValue"
        />
        <span class="w-14 h-8 flex items-center flex-shrink-0 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-6 after:h-6 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6"></span>
        </label>
    </div>   -->
    <div>
        <label :for="toggleInputId" class="inline-flex relative items-center cursor-pointer">
        <input 
            type="checkbox" 
            :id="toggleInputId"
            class="sr-only peer"
            v-model="toggleInputValue" 
            :checked="status" 
            @change="emitToggleInputValue"
        >
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">{{ label }} </span>            
        </label>
    </div>
</template>

<script>
import swal from 'sweetalert';

export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        status: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            toggleInputValue: this.status
        }
    },
    watch: {
        status(value) {
            this.toggleInputValue = value;            
        }
    },

    methods: {        
        emitToggleInputValue() {
            // swal("Hello world!");
            swal({
                title: "Are you sure?",
                text: `Active status will be changed to '${!this.status}'`,
                icon: "warning",                 
                // dangerMode: true,
                buttons: {
                    cancel: "Cancel",
                    confirm: {
                        text: "Change It!",
                        value: true,
                    },                                
                },
            })
            .then((value) => {
                if (value) {
                    this.$emit('toggleInput', {
                        item: this.item,
                        value: this.toggleInputValue
                    });
                    return;                    
                }          
                this.backToInitial(this.status);
            });             
        },
        backToInitial(status) {
            this.toggleInputValue = status;
        },
    },
    computed: {
        toggleInputId() {
            if (this.item !== null && this.item !== undefined) {
                return `toggle-input-${this.item.id}`;
            }
            return `toggle-input-1`;
        }
    }
}
</script>