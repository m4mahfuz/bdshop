export const state = () => ({
    discounts: [],
    discount: {},
    links: {},
    meta: {},
});

/** Actiions */
export const actions = {
    getDiscounts({commit}, url='/discounts') {
       return this.$axios.$get(url).then(response => {
            commit('ADD_DISCOUNTS', response.data);
            if (url !== '/discounts') {
                commit('ADD_LINKS', response.links);     
                commit('ADD_META', response.meta);     
            }     
        }).catch(error => {
            console.log(error);
        })
    },    
    getDiscount({commit}, discount) {
      // console.log(url)
      return this.$axios.$get(`/admin/discounts/${discount}`).then(response => {
          commit('ADD_DISCOUNT', response.data);               
       }).catch(error => {
           console.log(error);
       })
   },
}

/** Mutations */
export const mutations = {
    ADD_DISCOUNTS(state, discounts) {
        state.discounts = [];
        state.discounts.push(...discounts);        
    },
    ADD_DISCOUNT(state, discount) {
      state.discount = discount;
    }, 
    ADD_LINKS(state, links) {
        state.links = links;
    }, 
    ADD_META(state, meta) {
        state.meta = meta;
    },         
}