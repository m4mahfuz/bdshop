export const state = () => ({
    wishlists: [],    
    wishlistsCount: '',   
    links: {},
    meta: {},
    pagination: {},
});

export const actions = {   
    getWishlists({commit}, url='/wishlists') {
        return this.$axios.$get(url).then(response => {
             commit('ADD_WISHLISTS', response.data);  
             commit('SET_PAGINATION', response.meta);             
         }).catch(error => {
             console.log(error);
         })
     },

    async toggleWishlist({commit}, data) {
        let respons = await this.$axios.$post('/products/toggle-wishlist', data);
        
        commit('UPDATE_WISH_LIST_COUNT', respons.data.count);
        return respons.data;
    },

    removeWishlist({commit}, id) {
        return this.$axios.$delete(`/wishlists/${id}`).then(response => {
            commit('REMOVE_FROM_WISHLIST', id);
            commit('UPDATE_WISH_LIST_COUNT', 0);
        }).catch(error => {
            console.log(error)
        });
    },
}

export const mutations = {
    ADD_WISHLISTS(state, wishlists) {
        state.wishlists = [];
        state.wishlists.push(...wishlists);        
    },
    ADD_LINKS(state, links) {
        state.links = links;
    },     
    REMOVE_FROM_WISHLIST(state, id) {
        let index = state.wishlists.findIndex(
            item => item.id === id
          );
        state.wishlists.splice(index, 1);
    },
    SET_PAGINATION(state, pagination) {
        state.pagination = pagination;
        state.wishlistsCount = pagination.total;
    },
    UPDATE_WISH_LIST_COUNT(state, count) {
        if (count === 0) {
            state.wishlistsCount = state.wishlistsCount - 1;
            return;
        }
        state.wishlistsCount = state.wishlistsCount + 1;
    }
}

export const getters = {            
    getWishlistsCount(state) {
        return state.wishlistsCount;
    }
}