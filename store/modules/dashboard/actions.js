const axios = require('axios');
const url = 'https://rickandmortyapi.com/api'
const delay = ms => new Promise(res => setTimeout(res, ms));

export default {

  async POVOATE_CHARACTERS_DASH({commit}){
    let aux = 20
    //Se o quiser pegar dinamicamente
    //const pagesQuant = await dispatch('GET_NUMBER_OF_PAGES');
    const pagesQuant = 42
    const pagesRest = 42%aux
    const pagesMain = pagesQuant - pagesRest

    let listGroupPages = []

    for(let i = aux ; i <= pagesMain; i+=aux){

      let ant = (i - aux) + 1
      listGroupPages = []
      for(let j = ant ; j <= i; j++){

        await axios.get(url + '/character/?page=' + j)
        .then(response => 
          { 
            (response.data.results.forEach(
            item => listGroupPages.push(item.status))) 
          })

      }

      await delay(2000)

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

    await delay(2000)
    
    commit('POVOATE_CHARACTERS_DASH', 
    { 
      pageFrom:41,  
      pageTo: 42 , 
      list: listGroupPages
    })
    
  },

  RESET_STATE({commit}) {
    commit('RESET_STATE')
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