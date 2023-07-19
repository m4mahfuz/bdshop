export const state = () => ({
    categories: [],
    category: {} ,
    categoriesFlat: [],
    // categoryProducts: [] ,
});

/** Actiions */
export const actions = {
    getCategories({commit, dispatch}) {
        return this.$axios.$get('/categories').then(response => {
            commit('ADD_CATEGORIES', response.data);     
            dispatch('setCategoriesFlat');     
        }).catch(error => {
            console.log(error);
        })
    },

    getCategory({commit}, category) {
        this.$axios.$get(`/categories/${category}`).then(response => {            
            commit('ADD_CATEGORY', response.data);     
        }).catch(error => {
            console.log(error);
        })
    },

    setCategoriesFlat({commit, state}) {
        const categories = state.categories;
        let categoriesFlat = [];
        // console.log(categories.length)
        for (const category of categories) {
            category.parent = '';
            categoriesFlat.push(category);            
            
            if (category.hasOwnProperty('children')) {
                // console.log('children..')
                for (const child of category.children) {
                    child.parent = category.name;
                    categoriesFlat.push(child);                                
                }
            }
        }
        // return categoriesFlat;
         commit('ADD_CATEGORIES_FLAT', categoriesFlat);                    
    },

    deleteCategory({commit, state}, category) {        
        return this.$axios.$delete(`/categories/${category.slug}`).then(response => {          
            let index = state.categoriesFlat.findIndex(element => element === category);
            commit('DELETE_FROM_CATEGORIES_FLAT', index);
        })
        .catch(error => {
           console.log(error)
        })
    },
    deleteFromStoreCategories({commit, state}, category) {
      if (category.parent === '') {
        let itemsTobeRemovedArray = [];
        itemsTobeRemovedArray.push(category);
        state.categoriesFlat.forEach((element, index) => {
            if (element.parent === category.name) {
              itemsTobeRemovedArray.push(element);
            }
        });
        commit('DELETE_FROM_PARENT_CATEGORIES_FLAT', itemsTobeRemovedArray);
        return;            
      }
      let index = state.categoriesFlat.findIndex(element => element === category);
      commit('DELETE_FROM_CATEGORIES_FLAT', index);
    },    
}

/** Mutations */
export const mutations = {
    ADD_CATEGORIES(state, categories) {
        state.categories = [];
        state.categories.push(...categories);
    },
    ADD_CATEGORIES_FLAT(state, categories) {
        state.categoriesFlat = [];
        state.categoriesFlat.push(...categories);
    },
    ADD_CATEGORY (state, category) {
        state.category = category;
    },
    DELETE_FROM_CATEGORIES_FLAT(state, index) {
        state.categoriesFlat.splice(index, 1);
    },
    DELETE_FROM_PARENT_CATEGORIES_FLAT(state, itemsToBeRemovedArray) {
          const filtered = state.categoriesFlat.filter(ele => !itemsToBeRemovedArray.includes(ele))
        state.categoriesFlat = [];
        state.categoriesFlat.push(...filtered);
    }        
}

/** Getters */
export const getters = {        
    categoryBy: (state) => (slug) => {       
        console.log('Category by slug called') 
        console.log('slug', slug) 
        const categories = state.categories;
        // let categoryToBeFound = {};
        console.log(categories.length)
        for (const category of categories) {
            console.log('searching.....')
            if (category.slug === slug) {
                // categoryToBeFound = category;
                console.log('Found')
                return category;
            }
            console.log('Not Found')
            
            if (category.hasOwnProperty('children')) {
                console.log('Searching in children..')
                for (const child of category.children) {
                    if (child.slug === slug) {
                        // categoryToBeFound = child;
                        return child;
                    }   
                }
            }
        }
    },
    flatCategories: (state) => {
        // console.log('FLAT Category called') 
        const categories = state.categories;
        // let categoryToBeFound = {};
        let flatCategories = [];
        console.log(categories.length)
        for (const category of categories) {
            category.parent = '';
            flatCategories.push(category);            
            
            if (category.hasOwnProperty('children')) {
                console.log('children..')
                for (const child of category.children) {
                    child.parent = category.name;
                    flatCategories.push(child);                                
                }
            }
        }
        return flatCategories;
    }
}