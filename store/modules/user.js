
const defaultState = {
  name:'',
  isAdmin:false,
  loggedIn:false
}

const state = () => ({
  ...defaultState
})

const mutations = {
	LOGIN(state, user) {
    try{
      state.name     = user.name
      state.isAdmin  = user.isAdmin
      state.loggedIn = true
      this.$router.push('/dashboard')
    }
    catch(e){
      console.log(e)
    }
	},
  LOGOUT(state) {
    try{
      state.name     = defaultState.name
      state.isAdmin  = defaultState.isAdmin
      state.loggedIn = defaultState.loggedIn
      this.$router.push('/login')
    }
    catch(e){
      console.log(e)
    }
	}
}                              

const actions = {
  LOGIN(context, user) {
			context.commit('LOGIN', user)
	},

  LOGOUT(context) {
			context.commit('LOGOUT')
	}
}

export default {
	state,
	mutations,
	actions
}