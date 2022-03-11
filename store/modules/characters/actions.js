const axios = require('axios');

const url = 'https://rickandmortyapi.com/api'
               
export default {
  async POVOATE_CHARACTERS({commit}, page){
    await axios.get(url + '/character/?page=' + page)
    .then(response => {
        commit('POVOATE_CHARACTERS', response.data.results)
   })
  }
}