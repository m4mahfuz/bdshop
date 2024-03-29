export const state = () => ({
  cart: [],
});

export const actions = {  
    getCart({commit}) {    
      this.$axios.$get('/carts').then(respons => {
        commit('SET_TO_CART', respons.data);     
        commit('SAVE_CART_TO_LOCAL_STOAGE');        
      }).catch(error => {
        console.log(error);
      })
    },  
   async addToCart({commit}, data) {
    console.log('Add to Cart Triggered');
    // save in user database
    if(this.$auth.loggedIn) {
      let addToCartSucceed = false;
      let productFromDatabase; 
      await this.$axios.$post('/carts', {
        product_id: data.product.id,
        user_id: this.$auth.user.id,
        action: data.action,
        price: data.product?.original_price,
        quantity: data.quantity
      })
      .then(respons => {
        addToCartSucceed = true;
        productFromDatabase = respons.data;
      }).catch(error => {
          console.log(error);
      });

      // save in cart at store
      if(addToCartSucceed) {
        if(data.action === 'add') {
          commit('ADD_TO_CART_FOR_LOGGED_IN_USER', productFromDatabase)
        } else {          
            commit('UPDATE_CART', {data, productFromDatabase })
        }
        // save to local storage
        commit('SAVE_CART_TO_LOCAL_STOAGE');        
      } 
      return;
    }

    commit('ADD_TO_CART', data)
  },

  removeCart({commit}, product_id) {
    commit('REMOVE_CART', product_id)
  },

  async removeFromCart({commit}, product) {
    console.log('Remove From Cart Triggered');
    
    if(this.$auth.loggedIn) {
      let removeFromCartSucceed = false;      
       await this.$axios.$delete(`/carts/${product.id}`).then(respons => {
        removeFromCartSucceed = true;
      }).catch(error => {
          console.log(error);
      });        
    }    

    // delete product from cart at store
    commit('REMOVE_FROM_CART', product);
    // save updated cart to local storage
    commit('SAVE_CART_TO_LOCAL_STOAGE');
  },

  emptyTheCart({commit}) {
    commit('SET_TO_CART', []);
    // commit('EMPTY_CART')
  },

  setToCart({commit}, cart) { 
    commit('SET_TO_CART', cart);
  }

}

export const mutations = {
  ADD_TO_CART(state, data) {
    console.log('Add to Cart MUTATION Triggered');
   // save in localstorage
    let cartAtLocalStorage = JSON.parse(localStorage.getItem('cart'));

    let newProduct = true;
    cartAtLocalStorage.forEach(product => {
      if(product.id === data.product.id) {
        newProduct = false
      }
    })
        
    if(newProduct) {
      cartAtLocalStorage.push({
        id: data.product.id,
        name: data.product.name,
        unit: data.product.unit,
        unit_quantity: data.product.unit_quantity,
        image: data.product.featured_image,
        original_price: data.product.original_price,
        price: data.product.price ?? data.product.original_price, //data.product.price,
        quantity: data.quantity,
        // stock_quantity: data.product.quantity,
        action: data.action
      });
      this.$toast('Added to cart!');
    } else {
      cartAtLocalStorage.forEach((product, index) => {
        if(product.id === data.product.id) {
          if(data.action === 'decrease') {            
            if(cartAtLocalStorage[index].quantity > 1) {
              cartAtLocalStorage[index].quantity = cartAtLocalStorage[index].quantity - 1;
              this.$toast.warning('Quantity Decreased!');
            }             
          } else {
            cartAtLocalStorage[index].quantity = cartAtLocalStorage[index].quantity + 1;
            this.$toast.info('Quantity Increased!');
          }
        }
      })
    }
    localStorage.setItem('cart', JSON.stringify(cartAtLocalStorage))

    // save in store
    state.cart = cartAtLocalStorage;      
  },

  ADD_TO_CART_FOR_LOGGED_IN_USER(state, product) {
    state.cart.push(product)
    this.$toast.success('Added to cart!');
  },  
  UPDATE_CART(state, {data, productFromDatabase}) {    
    let index = state.cart.findIndex(
      product => product.id === data.product.id
    );
    // console.log('cart_index', index)
    state.cart[index].quantity = productFromDatabase.quantity;
    
    (data.action === 'increase') ? 
    this.$toast.info('Quantity Increased!') : this.$toast.warning('Quantity Decreased!');
  },

  SAVE_CART_TO_LOCAL_STOAGE(state) {
    // console.log('ls=', JSON.stringify(state.cart))
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },

  REMOVE_FROM_CART(state, product) {    
    // console.log('product to be removed', product)
    let index = state.cart.findIndex(
      item => item.id === product.id
    );
    state.cart.splice(index, 1);
    this.$toast.error('Removed from Cart!');
  },

  REMOVE_CART(state, product_id) {
    let cartAtLocalStorage = JSON.parse(localStorage.getItem('cart'));

    if(cartAtLocalStorage.length) {
      cartAtLocalStorage.forEach((item, index) => {
        if(item.id === product_id) {
          // remove this item
          cartAtLocalStorage.splice(index, 1);
        }
      })
    }

    localStorage.setItem('cart', JSON.stringify(cartAtLocalStorage))

    state.cart = cartAtLocalStorage;

    this.$toast.error('Removed from cart!');
  },
  
  SET_TO_CART(state, cart) {
    state.cart = cart;
  },
    
}

export const getters = {
  getCart(state) {
    return state.cart
  },  
  getCartItemsQty(state) {
    const cart = state.cart;
    let count = 0;
    if(cart.length) {        
      cart.forEach(item => {
        count = count + item.quantity
      })
    }
    return count;

  },
  getCartLength: (state) => {
    return state.cart.length;
  },
  isEmptyCart: (state) => {
    return (state.cart.length === 0) ?? false;
  },
  
}