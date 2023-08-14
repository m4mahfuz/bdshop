<template>
    <div class="form-group">
        <label for="district" class="text-gray-600">District</label>                       
        <select 
            class="form-select block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" id="district"
            @change="$emit('option-selected', $event.target.value)"
        >            
            <option value="" :disabled="disable">Please select one</option>                          
            <option v-for="district in districtsByDivision(division)" :value="
            district.name" :key="district.id">
            {{ district.name }}
            </option> 
        </select>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    
    export default {
        props: ['division'],        
        
        data() {
            return {
                disable: false 
            }
        },

        async mounted() {
            await this.getDistricts();           
            this.disable = true;
        },

        computed: {                   
            ...mapGetters('cities', [
                'districtsByDivision'
            ])            
        },

        methods: { 
            ...mapActions('cities', [
                'getDistricts',
            ]),            
        },
    }
</script>