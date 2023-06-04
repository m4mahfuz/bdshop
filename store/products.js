// import { f } from "vue-slick-carousel";

export const state = () => ({
    products: [],
    product: {},
    links: {},
    meta: {},
    // images: {
    //     thumbs: [],
    //     normal_size: [],
    //     large_size: []
    // }
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
            // commit('ADD_IMAGES', response.data.images);     
        }).catch(error => {
            console.log(error);
        })
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
        
        // this.$axios.$get(`/categories/${category}/products`).then(response => {            
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
    // setProduct({commit}, product) {
    //     // console.log(product)
    //     commit('ADD_PRODUCT', product);     
    // },
//     isDiscountAvailable({state, getters}) {
//       console.log(state.product.discount.active);
//       if (state.product.discount.active === false) return false;
//       if (getters.isDiscountDateValid() === true) return true;        
//       return false;           
//   },
//   isMinimumSpendingAvailable({getters}) {
//     return (getters.getMinimumSpending !== null) ? true : false;
//   },  
//   isDiscountLimitAvailable({getters}) {
//     return (getters.getDiscountLimit !== null) ? true : false;
//   },
//   salePrice({getters}) {
//     console.log(getters.getProductPrice)
//     return Math.round((getters.getProductPrice - getters.getDiscountAmount));
//   },
//   getDiscountAmount(getters) {
//     return getters.getProductPrice()*(getters.getDiscountRate()*0.01); 
//   },
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
    ADD_IMAGES(state, images) {
        //  console.log(this.$config.baseURL)
        // state.images.thumbs= [];
        // state.images.normal_size= [];
        // state.images.large_size= [];
        state.images = images;
        // console.log('mut', state.images)
        //  const baseURL = this.$config.baseURL;
        //  if (images.length > 0) {
        //     images.forEach(image => {
        //         state.images.thumbs.push({
        //             id: image.id,
        //             url: `${baseURL}/storage/images/products/small/${image.name}`
        //         });
        //         state.images.normal_size.push({
        //             id: image.id,
        //             url: `${baseURL}/storage/images/products/medium/${image.name}`
        //         });
        //         state.images.large_size.push({
        //             id: image.id,
        //             url: `${baseURL}/storage/images/products/large/${image.name}`
        //         })
        //     });
        //  }
        // state.product = product;
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
        // state.images.push()
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
        // let images = {};
        // const baseURL = state.$config.baseURL;
        //  if (state.images.length > 0) {
        //     state.images.forEach(image => {
        //         images.thumbs.push({
        //             id: image.id,
        //             url: `${baseURL}/storage/images/products/small/${image.name}`
        //         });
        //         images.normal_size.push({
        //             id: image.id,
        //             url: `${baseURL}/storage/images/products/medium/${image.name}`
        //         });
        //         images.large_size.push({
        //             id: image.id,
        //             url: `${baseURL}/storage/images/products/large/${image.name}`
        //         })
        //     });
        //  }
        // return images;
    },
    getFeaturedImage(state) {
        return state.featuredImage;
    }

    // url: (state) => (image) => {
    //     console.log(state)
    //     console.log(image)
    //     return;
    //     const baseURL = state.$config.baseURL;
    //     let path = '/storage/images/products/small/';
    //     let name = image.name;
    //     return `${baseURL}${path}${name}`;
    // }
    // salePrice(state, getters) {
    //     console.log(getters.getProductPrice)
    //     return Math.round(getters.getProductPrice - getters.getDiscountAmount);
    // },
    // getDiscountAmount(state, getters) {
    //     return getters.getProductPrice*(getters.getDiscountRate*0.01); 
    //   },
      // isDiscountAvailable(state, getters) {
      //     console.log(state.product.discount.active);
      //     if (!getters.isActiveDiscount) return false;
      //     if (getters.isDiscountDateValid === true) {
      //       // console.log(getters.isDiscountDateValid)
      //       return true
      //     };        
      //     // console.log(getters.isDiscountDateValid)
      //     return false;           
      // },    
      // isActiveDiscount(state) {
      //   return (state.product.discount.active === true) ? true : false;
      // },
      // isDiscountDateValid(state) {
      //   let today = new Date().toJSON().slice(0, 10);
      //   let from = new Date(state.product.discount.starting);
      //   let to = new Date(state.product.discount.ending);
      //   let check = new Date(today);
      //   // console.log(check)
      //   // console.log(from)
      //   // console.log('to',to)
      //   return (check >= from && check <= to ) ? true : false;
      //   // if (check >= from && check <= to ) return true;
      //   // return false;
      // },
      // isMinimumSpendingAvailable(state, getters) {
      //   return (getters.getMinimumSpending !== null) ? true : false;
      // },  
      // isDiscountLimitAvailable(state, getters) {
      //   return (getters.getDiscountLimit !== null) ? true : false;
      // },  
      // getMinimumSpending(state) {
      //   return state.product.discount.minimum_spending;
      // },
      // getDiscountLimit(state) {
      //   return state.product.discount.limit;      
      // },
      // getProductPrice(state) {
      //   return state.product.price;
      // },
      // getProductStock(state) {
      //   return state.product.inventory.quantity;
      // },
      // getDiscountRate(state) {
      //   console.log(Object.keys(state.product).length)
      //   if(Object.keys(state.product).length === 0) return;
      //   return state.product.discount.rate;
      // },
}