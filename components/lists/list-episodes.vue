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
        items: this.$store.state.treeView.episodes,
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
          this.items = this.episodes
          console.log('this.items', this.items)
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