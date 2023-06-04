export const state = () => ({
    coupons: [],    
    links: {},
    meta: {},
});

export const actions = {   
    getCoupons({commit}, url='/coupons') {
        return this.$axios.$get(url).then(response => {
             commit('ADD_COUPONS', response.data);     
             commit('ADD_LINKS', response.links);     
             commit('ADD_META', response.meta);     
         }).catch(error => {
             console.log(error);
         })
     },
}

export const mutations = {
    ADD_COUPONS(state, coupons) {
        state.coupons = [];
        state.coupons.push(...coupons);        
    },
    ADD_LINKS(state, links) {
        state.links = links;
    }, 
    ADD_META(state, meta) {
        state.meta = meta;
    }, 
}

export const getters = {        
    // amount: (state) => (coupon) => {       
    //     if (coupon.amount_type = 1) {
    //         return `${coupon.amount}%`;
    //     }
    //     return `${coupon.amount}`        
    // }
}