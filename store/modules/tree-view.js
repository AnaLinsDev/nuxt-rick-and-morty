const axios = require('axios');

const defaultState = {
  episodes : [],
  characterInfo : {}
}

const url = 'https://rickandmortyapi.com/api'

// _____________________________________

const state = () => ({
  ...defaultState
})

const mutations = {
  POVOATE_EPISODES_TREE(state, data){
    state.episodes = data
    console.log(state.episodes)
  },

  GET_CHARACTER_INFO(state, data){
    state.characterInfo = data
    console.log(state.characterInfo)
  }
}
               
const actions = {
  async POVOATE_EPISODES_TREE({commit, state}){

    if(state.episodes.length > 0){ return }

    let data = []
    let dataChar = []
    
    await axios.get(url + '/episode')
        .then(response => { data = response.data.results })

    for (let ep of data){
        dataChar = []

        for (let char of ep.characters){

          await axios.get(char)
          .then(response => { dataChar.push(response.data) })
        }

      ep.characters = dataChar
    }

    commit('POVOATE_EPISODES_TREE', data)

  },

  async GET_CHARACTER_INFO({commit}, id){

    let data = {}
    
    await axios.get(url + '/character/' + id)
        .then(response => {data = response.data })

    delete data['episode']
    delete data['created']
    delete data['url']
    delete data['origin']
    delete data['location']
    delete data['type']

    commit('GET_CHARACTER_INFO', data)
  },
}

export default {
	state,
	mutations,
	actions
}