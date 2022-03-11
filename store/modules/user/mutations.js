export default {
	LOGIN(state, user) {
    try{
      state.name     = user.name
      state.isAdmin  = user.isAdmin
      state.loggedIn = true
      this.$router.push('/characters')
    }
    catch(e){
      console.error(e)
    }
	},
  LOGOUT(state) {
    try{
      state.name     = ''
      state.isAdmin  = false
      state.loggedIn = false
      this.$router.push('/login')
    }
    catch(e){
      console.error(e)
    }
	}
}            