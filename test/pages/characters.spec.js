import { createLocalVue, mount } from '@vue/test-utils'
import CharacterPage from '@/pages/characters'
import mutations from '@/store/modules/characters/mutations'
import Vuetify from 'vuetify'
import Vuex from 'vuex'



describe('character.vue', () => {
  let vuetify = new Vuetify();;
  let wrapper;

  let store
  let state
  let actions
  

  let localVue = createLocalVue(); 
  localVue.use(Vuex)

  beforeEach(() => {

    state = {
      allListC : [],
    }

    actions = {
      POVOATE_CHARACTERS: jest.fn()
    }

   

    store = new Vuex.Store({
      modules: {
        characters:{
          state,
          actions,
          mutations,
          namespaced: true
        }
      }
    })

    wrapper = mount(CharacterPage, {
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
  }),
  
  it('should action povoate be called', () => {
    expect(actions.POVOATE_CHARACTERS).toHaveBeenCalledWith(expect.any(Object), 1)
    expect(actions.POVOATE_CHARACTERS).toHaveBeenCalledTimes(1);
  }) 

  it('should call watch to povoate with page 2', async () => {

    wrapper.setData({ page: 2 })
    await wrapper.vm.$nextTick()
    
    expect(actions.POVOATE_CHARACTERS).toHaveBeenCalledWith(expect.any(Object), 2)
  }) 

  it('should povoate list', async () => {
    const data = [ 
      { "id": 1, "name": "Rick Sanchez", "status": "Alive", "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"}, 
      { "id": 2, "name": "Morty Smith", "status": "Alive","image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg" }, 
      { "id": 3, "name": "Summer Smith", "status": "Alive", "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg" }, 
      { "id": 4, "name": "Beth Smith", "status": "Alive", "image": "https://rickandmortyapi.com/api/character/avatar/4.jpeg" }, 
      { "id": 5, "name": "Jerry Smith", "status": "Alive", "image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg" }
    ]

    await mutations.POVOATE_CHARACTERS(state, data)

    const allCards = wrapper.findAll('cardcharacter');

    expect(state.allListC).toHaveLength(5);
    expect(wrapper.vm.characters).toHaveLength(5);
    expect(allCards).toHaveLength(5);

  }) 

})
