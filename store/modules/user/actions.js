export default {
  LOGIN(context, user) {
			context.commit('LOGIN', user)
	},

  LOGOUT(context) {
			context.commit('LOGOUT')
	}
}