export const state = () => ({
    slides: [],
});

/** Actiions */
export const actions = {
    getSlides({commit}, url='/slides') {
       return this.$axios.$get(url).then(response => {
            commit('ADD_SLIDES', response.data);     
        }).catch(error => {
            console.log(error);
        })
    },    
    updateStoreSlides({commit}, slides) {
        commit('UPDATE_SLIDES', slides);
    },
    deleteFromStoreSlides({commit}, slide) {
        commit('DELETE_SLIDE', slide);
    },
}

/** Mutations */
export const mutations = {
    ADD_SLIDES(state, slides) {
        state.slides = [];
        state.slides.push(...slides);        
    },        
    DELETE_SLIDE(state, slide) {
        let index = state.slides.indexOf(slide);
        state.slides.splice(index, 1);
    },
    UPDATE_SLIDES(state, slide) {
        // slides.forEach(slide => {
            state.slides.push(slide);
        // });
        // state.images.push()
    },
}