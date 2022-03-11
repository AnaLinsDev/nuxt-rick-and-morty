const axios = require('axios');

const url = 'https://rickandmortyapi.com/api'
               
export default  {
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