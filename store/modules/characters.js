const axios = require('axios');

const defaultState = {
  allListC : []
}

const url = 'https://rickandmortyapi.com/api'

// _____________________________________

const state = () => ({
  ...defaultState
})

const mutations = {
  POVOATE_CHARACTERS(state, data){
    state.allListC = defaultState.allListC
    state.allListC = [...data] 
}
}
               
const actions = {
  async POVOATE_CHARACTERS({commit}, page){
    await axios.get(url + '/character/?page=' + page)
    .then(response => {
        commit('POVOATE_CHARACTERS', response.data.results)
   })
  }

}

export default {
	state,
	mutations,
	actions
}