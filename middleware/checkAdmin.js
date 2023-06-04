export default function ({store, redirect }) {
    // console.log('checkAdmin middleware called')
    // console.log(store.state.auth.user)
    let isAdmin = false;

    if (store.state.auth.user.role !== null) {
      isAdmin = (
      store.state.auth.user.role === 'super-admin' ||
      store.state.auth.user.role === 'admin' ||
      store.state.admin.user.role === 'operator'
      ) ?
      true : false;
    }
    
    if (!isAdmin) {
      // redirect({name: 'auth'})
      console.log('unauthorized')
      return redirect('/errors/422');
    }
  }