import { createLocalVue,  shallowMount, mount } from '@vue/test-utils'
import Login from '@/pages/login.vue'
import Vuetify from 'vuetify'

describe('login.vue', () => {

  let vuetify;
  let localVue;
  let wrapper;

  beforeEach(() => {
    localVue = createLocalVue(); 
    vuetify = new Vuetify();

    wrapper = mount(Login, {
      localVue,
      vuetify
     })

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