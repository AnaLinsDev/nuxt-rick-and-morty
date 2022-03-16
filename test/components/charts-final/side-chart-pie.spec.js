import { createLocalVue, mount } from '@vue/test-utils'
import SideChartComponent from '@/components/charts-final/side-chart-pie'
import mutations from '@/store/modules/dashboard/mutations'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('side-chart-pie.vue', () => {
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

    wrapper = mount(SideChartComponent, {
      localVue,
      vuetify,
      store,     
      propsData: {
        chartdatastatus: { 
          "pageFrom": 1, "pageTo": 20, "list": [], 
          "id": 0, "alive": 209, "dead": 135, "unknown": 56 
        }
      }
     })

  })


 it('should be a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

})
