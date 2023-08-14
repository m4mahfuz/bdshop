<template>
    <div class="form-group">
      <label for="division" class="text-gray-600">Division</label>      
      <select 
        class="form-select block px-4 py- text-sm mt-2 w-full text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500" id="division"        
        @change="$emit('option-selected', $event.target.value)"
      >
          <option value="" :disabled="disable">Please select one</option>         
          <option v-for="division in divisions" :value="division.id" :key="division.id">
            {{ division.name }}
          </option>                             
      </select>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    
    export default {        
        data() {
            return {
                disable: false 
            }
        },
        async mounted() {
          await this.getDivisions();           
          this.disable = true;
        },        
        computed: {                   
            ...mapState('cities', [
              'divisions',              
            ]),            
        },
        methods: { 
            ...mapActions('cities', [
                'getDivisions',
            ]),
        },
    }
</script>