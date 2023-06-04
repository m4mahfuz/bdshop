export const state = () => ({
    shippingTypes: [],        
     shippingAddress: {},        
});

export const actions = {   
    getShippingTypesBy({commit}, city) {
        return this.$axios.$get('/shipping-types', {
            params: {
                city: city
            }
        }).then(response => {
             commit('ADD_TYPES', response.data);     
         }).catch(error => {
             console.log(error);
         })
     },
    getShippingAddress({commit}) {
        return this.$axios.$get('/user/shipping-address'
        ).then(response => {
             commit('ADD_SHIPPING_ADDRESS', response.data);     
         }).catch(error => {
             console.log(error);
         })
     },
}

export const mutations = {
    ADD_TYPES(state, types) {
        state.shippingTypes = [];
        state.shippingTypes.push(...types);        
    },     
    ADD_SHIPPING_ADDRESS(state, address) {
        state.shippingAddress = address;
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