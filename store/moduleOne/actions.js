export default {
    increaseCounter: ({commit}, payload) => {
        commit('COUNTER_INCREMENT');
    },

    decreaseCounter: ({commit}, payload) => {
        commit('COUNTER_DECREMENT');
    }
}