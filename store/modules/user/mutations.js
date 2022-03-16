export default {
  
	LOGIN(state, user) {
    state.name     = user.name
    state.isAdmin  = user.isAdmin
    state.loggedIn = true
    //this.$router.push('/characters')
	},
  
  LOGOUT(state) {
    state.name     = ''
    state.isAdmin  = false
    state.loggedIn = false
    //this.$router.push('/login')
	}
}            