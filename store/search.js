export const state = () => ({
    items: [],        
    links: {},
    isLoading: false,
    found: null,    
});

export const actions = {   
    getItems({commit}, url) {
        commit('ENABLE_LOADING', true);
        return this.$axios.$get(url).then(response => {
             commit('ADD_ITEMS', response.data);  
             commit('ADD_LINKS', response.links);     
             commit('ENABLE_LOADING', false);
         }).catch(error => {
             console.log(error);
             commit('ENABLE_LOADING', false);
         })
     },    
     emptyItems({commit}) {
        commit('EMPTY_ITEMS');
     },
     setFound({commit}, status) {
        commit('SET_FOUND', status);
     }
}

export const mutations = {
    ADD_ITEMS(state, items) {
        // state.items = [];
        state.items.push(...items);        
    },
    ADD_LINKS(state, links) {
        state.links = links;
    }, 
    EMPTY_ITEMS(state) {
        state.items = [];
    },
    ENABLE_LOADING(state, status) {
        state.isLoading = status;
    },
    SET_FOUND(state, status) {
        state.found = status;
    }
}

// export const getters = {        
// }