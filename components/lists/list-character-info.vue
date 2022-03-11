<template>
  <div class="flex-list">

    <div 
      class="chart-info"
      v-if="(image == '')">
          <h1>Choose a Character</h1>
    </div>

  <div v-else>
    <v-img
      class="image-character"
      height="200"
      width="200"
      :src="image"
    />
    <v-list>
      <v-list-item
      v-for="(inf, key) in info" 
      :key="key">
        <h3 class="capitalize">{{key}}: {{inf}}</h3>
      </v-list-item>
    </v-list>
  </div>


  </div>
</template>


<script>

import { mapState } from 'vuex'

  export default {
    name: 'ListCharacterInfo',

    data(){
      return{
        image:''
      }
    },

    computed: {
      ...mapState( 'treeView', {
        info: (state) => state.characterInfo,
      })
    },

    watch:{
      info(n,o){
        this.image = this.info['image']
        delete this.info['id']
        delete this.info['image']
      }
    }
  }
</script>

<style scoped>
  .hidden{
    overflow: hidden !important;
  }

  .chart-info{
    margin: auto;
  }

  .flex-list{
    display: flex;
    text-align: center;
    justify-content: space-between;
  }

  .capitalize{    
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-transform: capitalize;
  }

  .image-character{
    border-radius: 100px;
    margin: 30px auto;
    box-shadow: 0 0 1em rgba(130, 131, 130, 0.658);
  }

  .theme--light.v-list {
      background: #ffffff00;
      color: rgba(0, 0, 0, 0.87);
  }
</style>