export const state = () => ({
    errors: {},
});

export const actions = {
  setErrors({ commit }, errors) {
    commit('SET_ERRORS', errors);
  },

  resetErrors({ commit, getters }, field) {
    if (getters.any()) {
        commit('RESET_ERRORS', field);
      }
  }
}

export const mutations = {
  SET_ERRORS(state, errors) {
    // console.log(errors)
    state.errors = errors;
  },
  RESET_ERRORS(state, field) {
    if (field) {
      delete state.errors[field];
      return;
    }
    state.errors = {};
  }
}

export const getters = { 
  has: (state) => (field) => {
    return state.errors?.hasOwnProperty(field);
  },

  get: (state) => (field) => {
    if (state.errors[field]) {
        return state.errors[field][0];
    }
  },

  any: (state) => (errors = state.errors) => {
    return (Object.keys(errors).length > 0) ? true: false ;
  }
}