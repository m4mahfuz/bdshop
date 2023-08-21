export const state = () => ({
    contacts: [],
    contact: {},
    links: {},
    meta: {},    
});

/** Actiions */
export const actions = {
    getContacts({commit}, url='/admin/contacts') {
       return this.$axios.$get(url).then(response => {
            commit('ADD_CONTACTS', response.data);     
            commit('ADD_LINKS', response.links);     
             commit('ADD_META', response.meta);     
        }).catch(error => {
            console.log(error);
        })
    },

    updateContact({commit, state}, contact){
        commit('UPDATE_CONTACT', contact);
    },    

    deleteContact({commit, state}, contact) {
        return this.$axios.$delete(`/admin/contacts/${contact.id}`)
                .then(response => {
                  commit('DELETE_FROM_CONTACTS', contact);
        })
        .catch(error => {
            console.log(error)
        });
    },    
}

/** Mutations */
export const mutations = {
    ADD_CONTACTS(state, contacts) {
        state.contacts = [];
        state.contacts.push(...contacts);        
    },        
    ADD_LINKS(state, links) {
        state.links = links;
    }, 
    ADD_META(state, meta) {
        state.meta = meta;
    }, 
    DELETE_FROM_CONTACTS(state, contact) {
        let index = state.contacts.indexOf(contact);
        state.contacts.splice(index, 1);
    },    
    UPDATE_CONTACT(state, contact) { 
        let index = state.contacts.findIndex(item => item.id === contact.id)
        // let index = state.contacts.indexOf(contact);
        state.contacts[index].read = true;
    }
}