export const state = () => ({
  addresses: [],
  // address: {}
});

export const actions = {
    getAddresses({commit}) {          
      return this.$axios.$get('/user/addresses').then(respons => {
        commit('ADD_TO_ADDRESSES', respons.data);     
      }).catch(error => {
        console.log(error);
      })
    },    
    getActiveAddresses({commit}) {          
      return this.$axios.$get('/user/active/addresses').then(respons => {
        commit('ADD_TO_ADDRESSES', respons.data);     
      }).catch(error => {
        console.log(error);
      })
    },    

    deleteAddress({commit, state}, address) {
      // let index = state.categories.findIndex(element => element === address);
      
      return this.$axios.$delete(`/user/addresses/${address.id}`).then(response => {
          let index = state.addresses.findIndex(element => element === address);
          commit('DELETE_FROM_ADDRESSES', index);
      })
      .catch(error => {
         console.log(error)
      })
  }
}

export const mutations = {
  ADD_TO_ADDRESSES(state, data) {        
    state.addresses = [];
    state.addresses.push(...data);   
  },    
  DELETE_FROM_ADDRESSES(state, index) {
    state.addresses.splice(index, 1);
  }
  // SET_ADDRESS(state, data) {        
  //   state.address = data;
  // },    
}

export const getters = {    
}