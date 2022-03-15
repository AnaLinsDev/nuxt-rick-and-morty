import { createLocalVue, mount } from '@vue/test-utils'

import ListEpisodesComponent from 
'@/components/lists/list-episodes.vue'

import mutations from '@/store/modules/tree-view/mutations'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

const { 
  GET_CHARACTER_INFO, 
  POVOATE_EPISODES_TREE
 } = mutations

describe('list-episodes.vue', () => {
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

    wrapper = mount(ListEpisodesComponent, {
      localVue,
      vuetify,
      store
     })

  })


 it('should be a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should call watch to change episodes', async () => {
    const data = [ 
      { "id": 1, "name": "Season 01 | Episode 01", type: 'episode' }, 
      { "id": 2, "name": "Season 01 | Episode 02", type: 'episode' }, 
      { "id": 3, "name": "Season 01 | Episode 03", type: 'episode' }, 
    ]

    POVOATE_EPISODES_TREE(state, data)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.episodes).toHaveLength(3);
    expect(wrapper.vm.items).toEqual(wrapper.vm.episodes)
    
  })

  it('should call watch to get character', async () => {
    wrapper.setData({ active: "S01E01C1" })

    await wrapper.vm.$nextTick()

    expect(actions.GET_CHARACTER_INFO).toHaveBeenCalled();
    
  })

})
