export const state = () => ({
    tags: [],
    tag: {},    
});

/** Actiions */
export const actions = {
    getTags({commit}, url='/tags') {
       return this.$axios.$get(url).then(response => {
            commit('ADD_TAGS', response.data);     
        }).catch(error => {
            console.log(error);
        })
    },    
}

/** Mutations */
export const mutations = {
    ADD_TAGS(state, tags) {
        state.tags = [];
        state.tags.push(...tags);        
    },        
}