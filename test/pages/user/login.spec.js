import { createLocalVue, mount } from '@vue/test-utils'
import Login from '@/pages/login.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

describe('login.vue', () => {

  let vuetify;
  let localVue;
  let wrapper;

  // vuex
  let store
  let actions

  beforeEach(() => {
    localVue = createLocalVue(); 
    localVue.use(Vuex)
    vuetify = new Vuetify();

    actions = {
      LOGIN: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        user:{
          actions,
          namespaced: true
        }
      }
    })

    wrapper = mount(Login, {
      localVue,
      vuetify,
      store
     })

  })

  it('should click on button and login user', async () => {

    await wrapper.setData({ name: 'Teste' })
    await wrapper.setData({ password: '123123' })
    await wrapper.setData({ isAdmin: true })
  
    const button = 
    await wrapper.find('.btn-login');
    expect(button.exists()).toBe(true)
  
    await button.trigger('click')
    expect(actions.LOGIN).toHaveBeenCalled()
  
  })


 it('should be a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  }) 

  it('should have text fields name and password ', async () => {

    // aqui pegará todas ocorrencias
    const allTextField = 
    await wrapper.findAllComponents({name:'v-text-field'});
    expect(allTextField.exists()).toBe(true)
    expect(allTextField.length).toBe(2)

    // só deve chegar aqui se os tests anteriores passarem

    // pegará a primeira ocorrencia, que será 'Name'
    const textField = await wrapper.findComponent({name:'v-text-field'});
    expect(textField.text()).toContain('Name')

    //pegará primeira ocorrencia
    const nameTextField = 
    await wrapper.findAllComponents({name:'v-text-field'}).at(0);

    //pegará segunda ocorrencia
    const passwordTextField = 
    await wrapper.findAllComponents({name:'v-text-field'}).at(1);

    //test que a primeira é 'Name' e a segunda é 'Password'
    expect(nameTextField.text()).toContain('Name')
    expect(passwordTextField.text()).toContain('Password')

  }),

  it('should have a disabled button if local state is invalid', async () => {

    // getting initial data
    expect(wrapper.vm.name).toBe('')
    expect(wrapper.vm.password).toBe('')
    expect(wrapper.vm.isAdmin).toBe(false)

    const button = wrapper.find('.btn-login.v-btn--disabled');
    expect(button.exists()).toBe(true)

  }),

  it('should have a active button if local state is valid', async () => {

    await wrapper.setData({ name: 'Teste' })
    await wrapper.setData({ password: '123123' })
    await wrapper.setData({ isAdmin: true })

    const button = wrapper.find('.btn-login.v-btn--disabled');
    expect(button.exists()).toBe(false)

  })
})
