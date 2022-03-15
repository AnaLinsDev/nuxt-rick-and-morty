import mutations from "@/store/modules/characters/mutations"

describe("Characters Muatations", () => {
  let state

  beforeEach(() => {
    state = { allListC : [] }
  })

  it("povoate characters list", async () => {
    const data = [ 
      { "id": 1, "name": "Rick Sanchez", "status": "Alive", "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"}, 
      { "id": 2, "name": "Morty Smith", "status": "Alive","image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg" }, 
      { "id": 3, "name": "Summer Smith", "status": "Alive", "image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg" }, 
    ]

    await mutations.POVOATE_CHARACTERS(state, data)

    expect(state.allListC).toEqual(data)
  })
})