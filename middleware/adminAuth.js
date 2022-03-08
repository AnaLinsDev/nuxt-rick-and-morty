export default function ({ store, redirect, route }) {
  
  // user is logged in, is NOT a admin and
  // is trying to go to only admin pages as dashboard e tree-view
  if (
    store.state.user.loggedIn && 
    !store.state.user.isAdmin &&
    (route.name === 'dashboard' || route.name === 'tree-view')
    ) {
      console.log(route.name)
      return redirect('/characters')
  }

}