export const state = () => ({
    banners: [],
});

/** Actiions */
export const actions = {
    getBanners({commit}, url='/banners') {
       return this.$axios.$get(url).then(response => {
            commit('ADD_BANNERS', response.data);     
        }).catch(error => {
            console.log(error);
        })
    },    
    updateStoreBanners({commit}, banners) {
        commit('UPDATE_BANNERS', banners);
    },
    deleteFromStoreBanners({commit}, banner) {
        commit('DELETE_BANNER', banner);
    },
}

/** Mutations */
export const mutations = {
    ADD_BANNERS(state, banners) {
        state.banners = [];
        state.banners.push(...banners);        
    },        
    DELETE_BANNER(state, banner) {
        let index = state.banners.indexOf(banner);
        state.banners.splice(index, 1);
    },
    UPDATE_BANNERS(state, banner) {
            state.banners.push(banner);
    },
}