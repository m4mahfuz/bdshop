export const state = () => ({
    dailyDeals: [],
    weeklyDeals: [],
    deals: [],
    links: {},
    meta: {},
});

/** Actiions */
export const actions = {
    getDailyDeals({commit}, url='/daily/deals') {
       return this.$axios.$get(url).then(response => {
            commit('ADD_DAILY_DEALS', response.data);     
        }).catch(error => {
            console.log(error);
        })
    }, 
    getWeeklyDeals({commit}, url='/weekly/deals') {
       return this.$axios.$get(url).then(response => {
            commit('ADD_WEEKLY_DEALS', response.data);     
        }).catch(error => {
            console.log(error);
        })
    }, 
    
    getDeals({commit}, url='/deals') {
        // console.log(url)
        return this.$axios.$get(url).then(response => {
             commit('ADD_DEALS', response.data);     
             commit('ADD_LINKS', response.links);     
             commit('ADD_META', response.meta);     
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
    }
}

/** Mutations */
export const mutations = {
    ADD_DAILY_DEALS(state, dailyDeals) {
        state.dailyDeals = [];
        state.dailyDeals.push(...dailyDeals);        
    }, 
    ADD_WEEKLY_DEALS(state, weeklyDeals) {
        state.weeklyDeals = [];
        state.weeklyDeals.push(...weeklyDeals);        
    },
    ADD_DEALS(state, deals) {
        state.deals = [];
        state.deals.push(...deals);        
    },
    ADD_LINKS(state, links) {
        state.links = links;
    }, 
    ADD_META(state, meta) {
        state.meta = meta;
    }, 
    DELETE_FROM_DEALS(state, index) {
        state.deals.splice(index, 1);
    }
    
}

/** Getters */
export const getters = {
    dailyDealsLength: (state) => {
        return state.dailyDeals.length;
    },
    weeklyDealsLength: (state) => {
        return state.weeklyDeals.length;
    },
}