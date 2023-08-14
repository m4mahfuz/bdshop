export const state = () => ({
    cities: [],
    divisions: [],
    districts: [],
    city: {},
    links: {},
    meta: {},    
});
/** Actiions */
export const actions = {
    getCities({commit}, url='/admin/shippings') {
        return this.$axios.$get(url).then(response => {
             commit('ADD_CITIES', response.data);     
             commit('ADD_LINKS', response.links);     
              commit('ADD_META', response.meta);     
         }).catch(error => {
             console.log(error);
         })
     },    
    getShippingCities({commit}, url='/shipping-cities') {
        return this.$axios.$get(url).then(response => {
             commit('ADD_CITIES', response.data);                  
         }).catch(error => {
             console.log(error);
         })
     },    
     deleteCity({commit, state}, city) {
        return this.$axios.$delete(`/admin/shippings/${city.id}`)
                .then(response => {
                  commit('DELETE_FROM_CITIES', city);
        })
        .catch(error => {
            console.log(error)
        });
    },
     getDivisions({commit}, url='/admin/divisions') {
        return this.$axios.$get(url).then(response => {
            commit('SET_DIVISIONS', response.data);               
        }).catch(error => {
            console.log(error);
        })
     },
     getDistricts({commit}, url='/admin/districts') {
        return this.$axios.$get(url).then(response => {
            commit('SET_DISTRICTS', response.data);               
        }).catch(error => {
            console.log(error);
        })
     }
}

/** Mutations */
export const mutations = {
    ADD_CITIES(state, cities) {
        state.cities = [];
        state.cities.push(...cities);        
    },        
    ADD_LINKS(state, links) {
        state.links = links;
    }, 
    ADD_META(state, meta) {
        state.meta = meta;
    }, 
    DELETE_FROM_CITIES(state, city) {
        let index = state.cities.indexOf(city);
        state.cities.splice(index, 1);
    },
    SET_DIVISIONS(state, divisions) {
        state.divisions = [];
        divisions.sort((a, b) => {        
            let nameA = a.name.toUpperCase(); // ignore upper and lowercase
            let nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
        
        state.divisions.push(...divisions);        
    },
    SET_DISTRICTS(state, districts) {
        state.districts = [];
        state.districts.push(...districts);        
    }
}

/** Getters */
export const getters = {  
    districtsByDivision: (state) => (divisionId) => {   
        return state.districts.filter(district => district.division_id == divisionId);
    }
}