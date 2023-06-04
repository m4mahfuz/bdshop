export const state = () => ({
    orders: [],
    order: {},
    orderLogs: [],
    statuses: [],
    success: false,
    pagination: {},
    products: [],
});

export const actions = {
    ////////
    fetchOrders({commit}, url='/orders') {
      return this.$axios.$get(url).then(response => {
        commit('SET_ORDERS', response.data)
        commit('SET_PAGINATION', response.meta)          
      }).catch(error => {
          console.log(error);
      })
    },
    getOrderStatuses({commit}) {
      return this.$axios.$get('/admin/order/statuses').then(response => {
        commit('SET_ORDER_STATUSES', response.data)
      }).catch(error => {
          console.log(error);
      })
    },
    ///////
     saveOrder({commit, dispatch}, data) {
      commit('SET_SUCCESS', {status: false, message: ''});
      dispatch('errors/resetErrors', null, { root: true });

        return this.$axios.$post('/orders', data)
        .then(response => {
          commit('SET_ORDER', response.data);
          commit('SET_SUCCESS', {status: true, message: 'Order has been saved sucessfully!'});
          dispatch('cart/emptyTheCart', null, {root: true});
          localStorage.setItem('cart', '[]');
        })
        .catch(error => {
          console.log('err', error.response.data);
          let errorMsg = {message: [error.response.data.message]};
          dispatch('errors/setErrors', errorMsg, { root: true })

        })
     }, 
      
     cancelOrder({commit, dispatch}, data) {
       commit('SET_SUCCESS', {status: false, message: ''});          
        return this.$axios.$post(`/orders/${data.order}/cancel`, data)
        .then(response => {
          commit('SET_SUCCESS', {status: true, message: 'Order has been cancelled sucessfully!'});
        })
        .catch(error => {
          console.log('err', error.response.data)
          
          let errorMsg = {message: [error.response.data.message]};
          //  [message = [error.response.data.message]];
          dispatch('errors/setErrors', errorMsg, { root: true })

        })
     }, 
     cancelOrderItems({commit, dispatch}, data) {
      commit('SET_SUCCESS', {status: false, message: ''});
        return this.$axios.$post(`/orders/${data.order}/cancel-items`, data)
        .then(response => {
          dispatch('getOrderBy', data.order);
          commit('SET_SUCCESS', {status: true, message: 'Order item(s) has been cancelled sucessfully!'});
        })
        .catch(error => {
          console.log('err', error.response.data)
          let errorMsg = {message: [error.response.data.message]};
          dispatch('errors/setErrors', errorMsg, { root: true })
        })
     }, 

     getOrderBy({commit, dispatch}, id) {
      return this.$axios.$get(`/orders/${id}`)
        .then(response => {
          commit('SET_ORDER', response.data);
        })
        .catch(error => {
          console.log('err', error.response)
          let errorMsg = {
            message: [error.response.data.message],
            statusText: [error.response.statusText]
          }
          dispatch('errors/setErrors', errorMsg, { root: true });
          this.$router.push(`/errors/${error.response.status}`); 
        })
     },
     getOrderByUUID({commit, dispatch}, uuid) {
      return this.$axios.$get(`/orders/${uuid}/invoice`)
        .then(response => {
          commit('SET_ORDER', response.data);
        })
        .catch(error => {
          console.log('err', error.response)
          let errorMsg = {
            message: [error.response.data.message],
            statusText: [error.response.statusText]
          }
          dispatch('errors/setErrors', errorMsg, { root: true });
          this.$router.push(`/errors/${error.response.status}`); 
        })
     },
     getOrderLogsBy({commit, dispatch}, id) {
      return this.$axios.$get(`/admin/orders/${id}/logs`)
        .then(response => {
          console.log('res', response)
          commit('SET_ORDER_LOGS', response.data);
          
          // this.discount = response.data.discount_amount;
        })
        .catch(error => {
          console.log('err', error.response)
          let errorMsg = {
            message: [error.response.data.message],
            statusText: [error.response.statusText]
          }
          dispatch('errors/setErrors', errorMsg, { root: true });
          this.$router.push(`/errors/${error.response.status}`); 
        })
     },
     getOrderProducts({commit, dispatch}, id) {
      return this.$axios.$get(`/admin/orders/${id}/products`)
        .then(response => {
          console.log('res', response)
          commit('SET_ORDER_PRODUCTS', response.data);
          
          // this.discount = response.data.discount_amount;
        })
        .catch(error => {
          console.log('err', error.response)
          let errorMsg = {
            message: [error.response.data.message],
            statusText: [error.response.statusText]
          }
          dispatch('errors/setErrors', errorMsg, { root: true });
          this.$router.push(`/errors/${error.response.status}`); 
        })
     },
     getOrderProductsByUUID({commit, dispatch}, uuid) {
      return this.$axios.$get(`/orders/${uuid}/products`)
        .then(response => {
          console.log('res', response)
          commit('SET_ORDER_PRODUCTS', response.data);
          
          // this.discount = response.data.discount_amount;
        })
        .catch(error => {
          console.log('err', error.response)
          let errorMsg = {
            message: [error.response.data.message],
            statusText: [error.response.statusText]
          }
          dispatch('errors/setErrors', errorMsg, { root: true });
          this.$router.push(`/errors/${error.response.status}`); 
        })
     }
}
export const mutations = {
    SET_ORDERS(state, orders) {
      state.orders = [];
        state.orders.push(...orders);
    },
    SET_ORDER_LOGS(state, orderLogs) {
      state.orderLogs = [];
      state.orderLogs.push(...orderLogs);
    },
    SET_ORDER_STATUSES(state, statuses) {
      state.statuses = [];
        state.statuses.push(...statuses);
    },
    SET_ORDER_PRODUCTS(state, products) {
      state.products = [];
        state.products.push(...products);
    },
    SET_PAGINATION(state, pagination) {
        state.pagination = pagination;
    },
    SET_ORDER(state, order) {
        state.order = order;
    },
    SET_SUCCESS(state, success) {
        state.success = success.status;
        state.message = success.message;
    }
}
export const getters = {
  isEmptyOrder(state) {
    return (Object.keys(state.order).length === 0) ?? false;
  },
  validProducts(state) {
    // console.log('mm', state.order.products)
    if (state.order?.products?.length > 0) {
      return state.order.products.filter(product => product.pivot.disputed === null);
    }
  },
  cancelledProducts(state) {
    if (state.order?.products?.length > 0) {
      return state.order.products.filter(product => product.pivot.disputed !== null);
    }
    return [];
  },

  bgColorBy: (state) => (status) => {
    let bgColor;
      switch (status) {
        case 'Received':
          bgColor = 'bg-green-400';
          break;
        case 'Processing':
          bgColor = 'bg-blue-500';
          break;
        case 'Shipped':
          bgColor = 'bg-orange-500';
          break;
        case 'Cancelled':
          bgColor = 'bg-red-400';
          break;          
        case 'Delivered':
          bgColor = 'bg-blue-600';
          break;          
        default:
          bgColor = 'bg-blue-300';
      }         
    return bgColor;   
  },
  textColorBy: (state) => (status) => {
    let textColor;
      switch (status) {
        case 'Received':
          textColor = 'text-green-600';
          break;
        case 'Processing':
          textColor = 'text-blue-600';
          break;
        case 'Shipped':
            textColor = 'text-green-600';
            break;  
        case 'Cancelled':
          textColor = 'text-red-600';
          break;          
        case 'Delivered':
          textColor = 'text-blue-700';
          break;          
        default:
          textColor = 'text-blue-800';
      }         
    return textColor;   
  }
}