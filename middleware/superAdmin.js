export default function ({store, redirect }) {
    console.log('super Admin middleware called')
    // console.log(store.state.auth.user)
    let isSuperAdmin = false;

    if (store.state.auth.user.role !== null) {
      isSuperAdmin = (
      store.state.auth.user.role === 'super-admin' 
      ) ?
      true : false;
    }
    
    if (!isSuperAdmin) {
      // redirect({name: 'auth'})
      console.log('unauthorized')      
      return redirect('/errors/422');
    }
  }