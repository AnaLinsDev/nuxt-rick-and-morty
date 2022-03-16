import mutations from "@/store/modules/user/mutations"

describe("User Auth", () => {

  const user_logged_admin = () => ({ 
    name: 'Test test',
    isAdmin: true,
    loggedIn:true
   })

   const user_empty = () => ({
    name:'',
    isAdmin:false,
    loggedIn:false
  })

  it("login a valid user", async () => {
    const state = user_empty()
    const user = user_logged_admin()

    mutations.LOGIN(state, user)

    expect(state).toEqual(user)
  }),

  it("logout current user", async () => {
    let state = user_logged_admin()
    let initial_state = user_empty()

    await mutations.LOGOUT(state)

    expect(state).toEqual(initial_state)
  })
})