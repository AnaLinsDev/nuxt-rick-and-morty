import { createLocalVue, mount } from '@vue/test-utils'
import DashboardPage from '@/pages/dashboard'
import mutations from '@/store/modules/dashboard/mutations'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('dashboard.vue', () => {
  let vuetify = new Vuetify();;
  let wrapper;

  let store
  let state
  let actions
  
  let localVue = createLocalVue(); 
  localVue.use(Vuex)

  beforeEach(() => {

    state = {
      allList : [],
      idAux : 0,
    
      aliveTotal: 0,
      deadTotal: 0,
      unknownTotal: 0,
    }

    actions = {
      POVOATE_CHARACTERS_DASH: jest.fn(),
      RESET_STATE: jest.fn(),
    }

   

    store = new Vuex.Store({
      modules: {
        dashboard:{
          state,
          actions,
          mutations,
          namespaced: true
        }
      }
    })

    wrapper = mount(DashboardPage, {
      localVue,
      vuetify,
      store
     })

  })


 it('should be a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should action reset state and povoate be called', () => {
    expect(actions.RESET_STATE).toHaveBeenCalledTimes(1);
    expect(actions.POVOATE_CHARACTERS_DASH).toHaveBeenCalledTimes(1);
  }) 

  it('should call watch to change key', async () => {
    const data = { pageFrom: 1, pageTo: 20, list: [] }

    expect(wrapper.vm.keyUpdate).toBe(1)

    await mutations.POVOATE_CHARACTERS_DASH(state, data)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.dataStatus).toHaveLength(1);
    expect(wrapper.vm.keyUpdate).toBe(2)

  }) 

})
