export default function ({ store, redirect, route }) {

  // is NOT logged in and is NOT on login page
  if (!store.state.user.loggedIn && route.name !== 'login') {
    return redirect('/login')
  }

  // is logged in and is on login page
  if (store.state.user.loggedIn && route.name === 'login') {
    return redirect('/characters')
  }

}
