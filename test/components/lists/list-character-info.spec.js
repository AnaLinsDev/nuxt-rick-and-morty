import { createLocalVue, mount } from '@vue/test-utils'

import ListCharacterComponent from 
'@/components/lists/list-character-info.vue'

import mutations from '@/store/modules/tree-view/mutations'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('list-character-info.vue', () => {
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

    wrapper = mount(ListCharacterComponent, {
      localVue,
      vuetify,
      store
     })

  })


 it('should be a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should call watch to change episodes', async () => {
    const data = 
    { "id": 1, "name": "Rick Sanchez", "status": "Alive"}
    
    wrapper.setData({ info: data })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.info).toEqual({ 
      "name": "Rick Sanchez", 
      "status": "Alive"
    } )
    
  })


})
