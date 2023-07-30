export const state = () => ({
    tags: [],
    tag: {},
    links: {},
    meta: {},    
});

/** Actiions */
export const actions = {
    getTags({commit}, url='/admin/tags') {
       return this.$axios.$get(url).then(response => {
            commit('ADD_TAGS', response.data);     
            commit('ADD_LINKS', response.links);     
             commit('ADD_META', response.meta);     
        }).catch(error => {
            console.log(error);
        })
    },    
    getTagsByCategory({commit}, url='/tags') {
       return this.$axios.$get(url).then(response => {
            commit('ADD_TAGS', response.data);     
        }).catch(error => {
            console.log(error);
        })
    },    
    deleteTag({commit, state}, tag) {
        return this.$axios.$delete(`/admin/tags/${tag.slug}`)
                .then(response => {
                  commit('DELETE_FROM_TAGS', tag);
        })
        .catch(error => {
            console.log(error)
        });
    },
    replaceTag({commit, state}, tag) {
        commit('REPLACE_TAG', tag);
    }
}

/** Mutations */
export const mutations = {
    ADD_TAGS(state, tags) {
        state.tags = [];
        state.tags.push(...tags);        
    },        
    ADD_LINKS(state, links) {
        state.links = links;
    }, 
    ADD_META(state, meta) {
        state.meta = meta;
    }, 
    DELETE_FROM_TAGS(state, tag) {
        let index = state.tags.indexOf(tag);
        state.tags.splice(index, 1);
    },
    REPLACE_TAG(state, tag) { 
        let index = state.tags.findIndex(item => item.name === tag.old)
        state.tags[index].name = tag.new;
    }
}