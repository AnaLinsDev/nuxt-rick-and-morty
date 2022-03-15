import { createLocalVue, mount } from '@vue/test-utils'
import MenuComponent from '@/components/menu'
import mutations from '@/store/modules/user/mutations'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('menu.vue', () => {
  let vuetify = new Vuetify();;
  let wrapper;
  let state
  let store
  let actions

  let localVue = createLocalVue(); 
  localVue.use(Vuex)

  beforeEach(() => {

    state = {
      name: '',
      isAdmin: false,
      loggedIn:false
    }

    actions = {
      LOGIN: jest.fn(),
      LOGOUT: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        user:{
          state,
          actions,
          mutations,
          namespaced: true
        }
      }
    })

    wrapper = mount(MenuComponent, {
      localVue,
      vuetify,
      store
     })

  })

  afterEach(() => {
    wrapper.destroy()
  })

 it('should be a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  }) 

  it('should watch change route characters to true if user is admin', async () => {
    let user = { 
      name: 'Test test',
      isAdmin: true,
      loggedIn:true
     }

    mutations.LOGIN(state, user)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.routes[2][2]).toBe(true)
  }) 

  it('should logout', async () => {
    let user = { 
      name: 'Test test',
      isAdmin: true,
      loggedIn:true
     }

    await mutations.LOGIN(state, user)
    await wrapper.vm.$nextTick()

    const button = wrapper.find('.btn-main-menu.logout')

    expect(button.text()).toContain('LogOut')

    await button.trigger('click')

    expect(actions.LOGOUT).toHaveBeenCalled()

  }) 

})
