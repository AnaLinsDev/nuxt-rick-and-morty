import defaultState from './defaultState'

let alive
let dead
let unknown

export default {

  RESET_STATE(state) {
    Object.assign(state, defaultState())
  },

  POVOATE_CHARACTERS_DASH(state, data){
    let info = mineData(state, data) 

    state.idAux++ 

    state.allList.push(info.data)

    state.aliveTotal   += info.alive
    state.deadTotal    += info.dead
    state.unknownTotal += info.unknown
  }
}

function mineData(state, data){

  alive = 0
  dead = 0
  unknown = 0

  // aqui estava for..of,  porem ocorreu um erro no teste com jest,
  // e tive que adaptar
  let char
  for (let id in data.list){
    char = data.list[id]
    char == "Alive" ? alive++ : ''
    char == "Dead" ? dead++ : ''
    char == "unknown" ? unknown++ : ''
 }


  console.log(state.idAux) 
  data['id'] = state.idAux
  data['alive'] = alive
  data['dead']  = dead
  data['unknown'] = unknown

  return { alive, dead, unknown, data }

}