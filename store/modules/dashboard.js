const axios = require('axios');

const defaultState = {
  allList : [],
  idAux : 0,

  aliveTotal: 0,
  deadTotal: 0,
  unknownTotal: 0
}

const url = 'https://rickandmortyapi.com/api'

const delay = ms => new Promise(res => setTimeout(res, ms));

// _____________________________________

const state = () => ({
  ...defaultState
})

const mutations = {
  POVOATE_CHARACTERS_DASH(state, data){
    this.commit('MINE_DATA', data)
    state.allList.push(data)

    //console.log(state.allList)
  },
  MINE_DATA(state, data){
    let alive = 0
    let dead = 0
    let unknown = 0

    for (let char of data.list){
      char == "Alive" ? alive++ : ''
      char == "Dead" ? dead++ : ''
      char == "unknown" ? unknown++ : ''
    }

    state.aliveTotal   += alive
    state.deadTotal    += dead
    state.unknownTotal += unknown

    data['id'] = state.idAux
    data['alive'] = alive
    data['dead']  = dead
    data['unknown'] = unknown

    state.idAux++
    
  }
}
               
const actions = {
  async POVOATE_CHARACTERS_DASH({commit}){

    //Se o quiser pegar dinamicamente
    //const pagesQuant = await dispatch('GET_NUMBER_OF_PAGES');
    const pagesQuant = 42
    const pagesRest = 42%5
    const pagesMain = pagesQuant - pagesRest

    let listGroupPages = []

    for(let i = 10 ; i <= pagesMain; i+=10){

      let ant = (i - 10) + 1
      listGroupPages = []
      for(let j = ant ; j <= i; j++){

        await axios.get(url + '/character/?page=' + j)
        .then(response => 
          { 
            (response.data.results.forEach(
            item => listGroupPages.push(item.status))) 
          })

      }

      await delay(5000)

      commit('POVOATE_CHARACTERS_DASH', 
        { 
          pageFrom:ant,  
          pageTo: i , 
          list: listGroupPages
        })

    }
    
    listGroupPages = []
    for(let i = 1 ; i <= pagesRest; i++){

      await axios.get(url + '/character/?page=' + i)
      .then(response => 
        { 
          (response.data.results.forEach(
          item => listGroupPages.push(item.status))) 
        })

    }

    await delay(5000)
    
    commit('POVOATE_CHARACTERS_DASH', 
    { 
      pageFrom:41,  
      pageTo: 42 , 
      list: listGroupPages
    })
    
  },

  async GET_NUMBER_OF_PAGES(){

    let pagesQuant = 0

    await axios.get(url + '/character')
    .then(response => {
      pagesQuant =  response.data.info.pages
    })
    
    return pagesQuant

  }

}

export default {
	state,
	mutations,
	actions
}