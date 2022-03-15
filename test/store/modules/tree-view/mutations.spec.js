import mutations from "@/store/modules/tree-view/mutations"

const { 
  GET_CHARACTER_INFO, 
  POVOATE_EPISODES_TREE
 } = mutations

describe("Tree View Muatations", () => {
  let state

  beforeEach(() => {
    state = {   
      episodes : [],
      characterInfo : {}
    }
  })

  it("should povoate episodes", () => {
    const data = [ 
      { "id": 1, "name": "Season 01 | Episode 01", type: 'episode' }, 
      { "id": 2, "name": "Season 01 | Episode 02", type: 'episode' }, 
      { "id": 3, "name": "Season 01 | Episode 03", type: 'episode' }, 
    ]

    POVOATE_EPISODES_TREE(state, data)

    expect(state.episodes).toEqual(data)
  }),

  it("should get character info", () => {
    const data = [ 
      { "id": 1, "name": "Rick Sanchez", "status": "Alive"}, 
    ]

    GET_CHARACTER_INFO(state, data)

    expect(state.characterInfo).toEqual(data)
  })
})