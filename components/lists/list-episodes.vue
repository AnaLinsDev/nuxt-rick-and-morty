<template>
  <div class="flex-list">

    <div 
      class="chart-info"
      v-if="(items.length == 0)">
          <v-progress-circular
          :size="170"
          :width="7"
          color="purple"
          indeterminate
          ></v-progress-circular>
    </div>

    <v-treeview
      v-else
      v-once
      :active.sync="active"
      :items="items"

      open-on-click
      activatable
    >
    </v-treeview>

  </div>
</template>


<script>

  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'ListEpisodes',

    data(){
      return{
        items: this.constructorEpisode(this.$store.state.treeView.episodes),
        active: [],
      }
    },
        
    computed: {
      ...mapState( 'treeView', {
        episodes: (state) => state.episodes,
      })
    },

    watch: {
      episodes: {
        handler(){
          this.items = this.constructorEpisode(this.episodes)
        },

      },

      active: {
        async handler(){
        let id = this.active[0].split('C')
        id = id.pop()
        await this.GET_CHARACTER_INFO(id)
        }
      }
    },


    methods:{
      ...mapActions( 'treeView', 
      ['POVOATE_EPISODES_TREE', 'GET_CHARACTER_INFO']),

      async povoate(){
          await this.POVOATE_EPISODES_TREE()
      },
      
      constructorEpisode(eps){
        let items = []

        for (let ep of eps){

          let episodeFormat = 
          "Season "  + ep.episode.split('S')[1].split('E')[0] +
          " | Episode " + ep.episode.split('S')[1].split('E')[1]

          let jsonAux = {
            id :  ep.id ,
            name : episodeFormat ,
            type: 'episode',
            children : this.constructorCharacters(ep.episode, ep.characters)
          }
          items.push(jsonAux)
        }
         return items
      },

      constructorCharacters(episode, chars){
        let characters = []

        for (let c of chars){

            characters.push({
              name: c.name, 
              url: c.url,
              type: 'characterUrl',
              id: episode +"C"+ c.id
              })

        }

        return characters
      },
    },

    mounted(){
      this.povoate()
    }
  }
</script>

<style >
  .hidden{
    overflow: hidden !important;
  }

  .chart-info{
    margin: auto;
  }
  .flex-list{
    display: flex;
    flex-direction: column;
  }
</style>