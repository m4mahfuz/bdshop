export const state = () => ({
  // modalData: {
  //   product: [],
  //   modal: false
  // }  
    product: {},
    quantity: '',
    modal: false
});

export const actions = {
  // triggerModal({commit}, product) {
  //   commit('TRIGGER_MODAL', product)
  // },
  showModal({commit}, data) {
    commit('TRIGGER_MODAL', data)
  },
  hideModal({commit}) {
    commit('RESET_MODAL')
  }
}

export const mutations = {
  TRIGGER_MODAL(state, data) {
    state.product = data.product;
    state.quantity = data.quantity;
    state.modal = true;
  },
  RESET_MODAL(state, product) {
    state.product = {};
    state.modal = false;
  },
}

export const getters = {
  getModal(state) {
    return state;
  }
}


