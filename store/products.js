export const state = () => ({
    products: [],
    product: {},
    links: {},
    meta: {},    
    images: [],
    featuredImage: {},
    tags: [],
});

/** Actiions */
export const actions = {
    getProducts({commit}, url='/products') {
       return this.$axios.$get(url).then(response => {
            commit('ADD_PRODUCTS', response.data);     
            commit('ADD_LINKS', response.links);     
            commit('ADD_META', response.meta);     
        }).catch(error => {
            console.log(error);
        })
    },
    getProduct({commit}, product) {
        return this.$axios.$get(`/products/${product}`).then(response => {
            commit('ADD_PRODUCT', response.data);     
        }).catch(error => {
            console.log(error);
        })
    },
    deleteProduct({commit, state}, product) {
        return this.$axios.$delete(`/products/${product.slug}`)
                .then(response => {
                  commit('DELETE_FROM_PRODUCTS', product);
        })
        .catch(error => {
            console.log(error)
        });
    },
    getProductImages({commit}, product) {
        return this.$axios.$get(`/products/${product}/images`).then(response => {
            commit('ADD_IMAGES', response.data.images);     
            commit('SET_FEATURED_IMAGE', response.data.featured_image);     
        }).catch(error => {
            console.log(error);
        })
    },
    getProductTags({commit}, product) {
        return this.$axios.$get(`/products/${product}/tags`).then(response => {
            console.log(response)
            commit('ADD_TAGS', response.data);     
        }).catch(error => {
            console.log(error);
        })
    },
        
    getCategoryProducts({commit}, {category, link = false}) {
        let url = `/categories/${category}/products`;
        if (link)  {
            url = link;
        }
        return this.$axios.$get(url).then(response => {            
            commit('ADD_PRODUCTS', response.data);   
            commit('ADD_LINKS', response.links);   
            commit('ADD_META', response.meta);         
        }).catch(error => {
            console.log(error);
        })
    },    
    // getTagProducts({commit}, {tag, link = false}) {
    getTagProducts({commit}, url = '') {        
        return this.$axios.$get(url).then(response => {            
            commit('ADD_PRODUCTS', response.data);   
            commit('ADD_LINKS', response.links);   
            commit('ADD_META', response.meta);         
        }).catch(error => {
            console.log(error);
        })
    },    
    updateStoreImages({commit}, images) {
        commit('UPDATE_IMAGES', images);
    },
    deleteFromStoreImages({commit}, image) {
        commit('DELETE_IMAGE', image);
    },
    clearImages({commit}) {
        commit('CLEAR_IMAGES');
    },
    remove({commit}, index) {
        commit('REMOVE_KEYWORD', index);        
    }    
}

/** Mutations */
export const mutations = {
    ADD_PRODUCTS(state, products) {
        state.products = [];
        state.products.push(...products);        
    },        
    ADD_LINKS(state, links) {
        state.links = links;
    }, 
    ADD_META(state, meta) {
        state.meta = meta;
    }, 
    ADD_PRODUCT(state, product) {
        state.product = product;
        // console.log(state.product)
    }, 
    DELETE_FROM_PRODUCTS(state, product) {
        let index = state.products.indexOf(product);
        state.products.splice(index, 1);
    },
    ADD_IMAGES(state, images) {     
        state.images = images;        
    },
    CLEAR_IMAGES(state) {
        state.images = [];
    }, 
    DELETE_IMAGE(state, image) {
        let index = state.images.indexOf(image);
        state.images.splice(index, 1);
    },
    SET_FEATURED_IMAGE(state, image) {
        state.featuredImage = image;
    }, 
    UPDATE_IMAGES(state, images) {
        images.forEach(image => {
            state.images.push(image);
        });
    },
    ADD_TAGS(state, tags) {
        state.tags = tags;
    },
    REMOVE_KEYWORD(state, index) {
        state.product.meta.keywords.splice(index, 1);
    }
}

/** Getters */
export const getters = {
    productAtStore(state) {
        return state.product;
    },
    productImages(state) {
        console.log('getters');
        return state.images;     
    },
    getFeaturedImage(state) {
        return state.featuredImage;
    }    
}