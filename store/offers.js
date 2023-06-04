export const state = () => ({
    activeOffers: [],    
    offers: [],    
    offer: {},
    links: {},
    meta: {},
});

/** Actiions */
export const actions = {
    getActiveOffers({commit}, url='/offers') {
       return this.$axios.$get(url).then(response => {
            commit('ADD_ACTIVE_OFFERS', response.data);     
        }).catch(error => {
            console.log(error);
        })
    }, 
        
    getOffers({commit}, url='/admin/offers') {
        console.log(url)
        return this.$axios.$get(url).then(response => {
            console.log(response)
             commit('ADD_OFFERS', response.data);     
             commit('ADD_LINKS', response.links);     
             commit('ADD_META', response.meta);     
         }).catch(error => {
             console.log(error);
         })
     },
    getOffer({commit}, offer) {
        // console.log(url)
        return this.$axios.$get(`/admin/offers/${offer}`).then(response => {
            console.log(response)
             commit('ADD_OFFER', response.data);     
            //  commit('ADD_LINKS', response.links);     
            //  commit('ADD_META', response.meta);     
         }).catch(error => {
             console.log(error);
         })
     },

     deleteDeal({commit, state}, deal) {
        return this.$axios.$delete(`admin/${deal.deal_type}/deals/${deal.id}`).then(response => {
            let index = state.deals.findIndex(element => element === deal);
            commit('DELETE_FROM_DEALS', index);
        })
        .catch(error => {
           console.log(error)
        })
    },
    deleteProductFromOffer({commit, state}, product) {
        commit('DELETE_PRODUCT_FROM_OFFER', product);
    }
}

/** Mutations */
export const mutations = {
    ADD_ACTIVE_OFFERS(state, activeOffers) {
        state.activeOffers = [];
        state.activeOffers.push(...activeOffers);        
    }, 
    ADD_OFFERS(state, offers) {
        state.offers = [];
        state.offers.push(...offers);        
    }, 
    ADD_OFFER(state, offer) {
        state.offer = offer;
    }, 
    DELETE_PRODUCT_FROM_OFFER(state, product) {
        let index = state.offer.products.indexOf(product);
        if (index !== -1) {
            state.offer.products.splice(index, 1);
        }
    }, 
    ADD_LINKS(state, links) {
        state.links = links;
    }, 
    ADD_META(state, meta) {
        state.meta = meta;
    }, 
    DELETE_FROM_OFFERS(state, index) {
        state.offers.splice(index, 1);
    }
    
}

/** Getters */
export const getters = {
    activeOffersLength: (state) => {
        return state.activeOffers.length;
    },    
    offersWithProducts: (state) => {
        let offers = [];
        state.activeOffers.forEach(element => {
            if (element.products.length > 0 ) {
                offers.push(element);
            }
        });
        return offers;
    },    
    offersLength: (state) => {
        return state.offers.length;
    },    
}