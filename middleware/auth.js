export default function ({ store, redirect, route }) {

/*  
    Em user mutations tem o verdeiro redirecionamento,
    pois o middleware só funciona no meio do roteamento.

    Então aqui vai ajudar a segurança de que se o user não 
    estiver logado então não pode acessar as páginas, 
    e o logado não pode acessa tela de login
*/

  // is NOT logged in and is NOT on login page
  if (!store.state.user.loggedIn && route.name != 'login') {
    return redirect('/login')
  }

  // is logged in and is on login page
  if (store.state.user.loggedIn && route.name == 'login') {
    return redirect('/characters')
  }

}
