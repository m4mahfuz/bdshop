export const state = () => ({
    shippers: [],   
    links: {},
    meta: {},     
});

export const actions = {   
    getShippers({commit}, url='/admin/shippers') {
        return this.$axios.$get(url).then(response => {
             commit('ADD_SHIPPERS', response.data);         
             commit('ADD_LINKS', response.links);     
             commit('ADD_META', response.meta);     
         }).catch(error => {
             console.log(error);
         })
     },

     deleteShipper({commit, state}, shipper) {
        return this.$axios.$delete(`/admin/shippers/${shipper.id}`)
                .then(response => {
                  commit('DELETE_FROM_SHIPPERS', shipper);
        })
        .catch(error => {
            console.log(error)
        });
    },
}

export const mutations = {
    ADD_SHIPPERS(state, shippers) {
        state.shippers = [];
        state.shippers.push(...shippers);        
    },

    ADD_LINKS(state, links) {
        state.links = links;
    }, 
    ADD_META(state, meta) {
        state.meta = meta;
    }, 

    DELETE_FROM_SHIPPERS(state, shipper) {
        let index = state.shippers.indexOf(shipper);
        state.shippers.splice(index, 1);
    },
}