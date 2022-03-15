import mutations from "@/store/modules/dashboard/mutations"

const { 
  RESET_STATE, 
  POVOATE_CHARACTERS_DASH
 } = mutations

describe("Dashboard Muatations", () => {
  let state
  
  beforeEach(() => {
    state = {   
      allList : [],
      idAux : 0,
    
      aliveTotal: 0,
      deadTotal: 0,
      unknownTotal: 0 
    }
  })

  it("should povoate dashboard list", async () => {
    const data = { pageFrom: 1, pageTo: 20, list: [] }

    await POVOATE_CHARACTERS_DASH(state, data)

    expect(state.allList).toHaveLength(1);

  }),

  it("should reset dashboard list", async () => {
    state = {   
      allList : ['teste','teste','teste'],
      idAux : 3,
      aliveTotal: 1,
      deadTotal: 0,
      unknownTotal: 2 
    }

    await RESET_STATE(state)

    expect(state).toEqual({
      allList : [],
      idAux : 0,
      aliveTotal: 0,
      deadTotal: 0,
      unknownTotal: 0 
    })
  })
})