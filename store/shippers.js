export const state = () => ({
    shippers: [],    
});

export const actions = {   
    getShippers({commit}) {
        return this.$axios.$get('/admin/shippers').then(response => {
             commit('ADD_SHIPPERS', response.data);         
         }).catch(error => {
             console.log(error);
         })
     },
}

export const mutations = {
    ADD_SHIPPERS(state, shippers) {
        state.shippers = [];
        state.shippers.push(...shippers);        
    },
}