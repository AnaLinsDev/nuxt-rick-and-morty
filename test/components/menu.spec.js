import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils'
import MenuComponent from '@/components/menu'
import mutations from '@/store/modules/user/mutations'

import VueRouter from 'vue-router';
import Vuetify from 'vuetify'
import Vuex from 'vuex'


describe('menu.vue', () => {
  let vuetify
  let wrapper;
  let router;
  let state;
  let store;
  let actions;

  let localVue = createLocalVue(); 
  localVue.use(Vuex)

  beforeEach(() => {
    vuetify = new Vuetify();

    router = {
      push: jest.fn()
    }

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
      store,
      mocks : { $router : router },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

  })

  afterEach(() => {
    wrapper.destroy()
  })

 it('should be a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  }) 

  it('should render only login button with router-link to no logged user', () => {
    expect(wrapper.findAllComponents(RouterLinkStub).length).toBe(1)
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/login')
  })

  it('should render four button with router-link to logged user', async () => {
    let user = { 
      name: 'Test test',
      isAdmin: true,
      loggedIn:true
     }

    await mutations.LOGIN(state, user)
    await wrapper.vm.$nextTick()

    /* Note que o logout é um v-btn como os outros, porém,
       ele não tem o arg :to, então não terá o router-link */
    const findAllRouteLink = wrapper.findAllComponents(RouterLinkStub)
    const buttonLogout = wrapper.find('.btn-main-menu.logout')

    expect(findAllRouteLink.length).toBe(3)

    expect(findAllRouteLink.at(0).props().to).toBe('/dashboard')
    expect(findAllRouteLink.at(1).props().to).toBe('/tree-view')
    expect(findAllRouteLink.at(2).props().to).toBe('/characters')
    expect(buttonLogout.text()).toContain('LogOut')

  })

  it('should watch change route characters to true if user is admin', async () => {
    let user = { 
      name: 'Test test',
      isAdmin: true,
      loggedIn:true
     }

    await mutations.LOGIN(state, user)
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
    expect(router.push).toBeCalledWith('/login')

  }) 

})
