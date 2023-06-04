export default function ({store, redirect }) {
    // If the user is not authenticated with admin strategy
    // console.log('authAdmin middleware called');
    // console.log(store.state.auth);
    
    if (!store.state.auth.loggedIn || store.state.auth.strategy !== 'admin' ) {
       return redirect('/admin/login');
    }    
  }