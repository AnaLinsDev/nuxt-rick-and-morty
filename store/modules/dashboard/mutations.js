import defaultState from './defaultState'

export default {

  RESET_STATE(state) {
    Object.assign(state, defaultState())
  },

  POVOATE_CHARACTERS_DASH(state, data){
    this.commit('dashboard/MINE_DATA', data)
    state.allList.push(data)
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