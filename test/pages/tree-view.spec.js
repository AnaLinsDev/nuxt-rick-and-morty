import { createLocalVue, mount } from '@vue/test-utils'
import TreeViewPage from '@/pages/tree-view'
import mutations from '@/store/modules/tree-view/mutations'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('tree-view.vue', () => {
  let vuetify = new Vuetify();;
  let wrapper;

  let store
  let state
  let actions
  
  let localVue = createLocalVue(); 
  localVue.use(Vuex)

  beforeEach(() => {

    state = {
      episodes : [],
      characterInfo : {}
    }

    actions = {
      POVOATE_EPISODES_TREE: jest.fn(),
      GET_CHARACTER_INFO: jest.fn(),
    }

   

    store = new Vuex.Store({
      modules: {
        treeView:{
          state,
          actions,
          mutations,
          namespaced: true
        }
      }
    })

    wrapper = mount(TreeViewPage, {
      localVue,
      vuetify,
      store
     })

  })


 it('should be a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

})
