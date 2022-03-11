<template>
  <div class="dashboard">
    <h1 class="title">Dashboard - Rick and Morty API </h1>
    <div class="dashboard-painel-main">

      <PainelCard class="painel-dashboard live">

          <div 
          class="live-chart-page-container">
              <h2 class="live-dash-title">
                  Live DashBoard
                  <hr>
                </h2>
              <LiveChartPie 
              class="big-chart"
              :key = "keyUpdate"
              :chartdatastatus = "{alive, dead, unknown}" />

              <h1>
               <br>
                  <ul style="text-align:left;" >
                    <li id="green">Alive: {{alive}}</li>
                    <li id="red">Dead: {{dead}}</li>
                    <li id="gray">Uncertain: {{unknown}}</li>
                  </ul>  
              </h1>            

          </div>

      </PainelCard>

      <PainelCard  class="painel-dashboard pages">

          <div 
          class="chart-info"
          v-if="!(dataStatus.length > 0)">
                  <v-progress-circular
                    :size="170"
                    :width="7"
                    color="purple"
                    indeterminate
                  ></v-progress-circular>
          </div>

          <div v-else
          v-for="res in dataStatus" 
          :key="res.id">

            <div 
            class="chart-page-container">

                <SideChartPie :chartdatastatus="res" />
                <div>
                  <h3 class="chart-info">
                  Page {{res.pageFrom}} to {{res.pageTo}}
                  <hr>
                  <br>
                  <ul>
                    <li id="green">Alive: {{res.alive}}</li>
                    <li id="red">Dead: {{res.dead}}</li>
                    <li id="gray">Uncertain: {{res.unknown}}</li>
                  </ul>
                  </h3>
                </div>

            </div>
            <hr>

          </div>

      </PainelCard>

    </div>
  </div>
</template>

<script>

import LiveChartPie from '../components/charts-final/live-chart-pie.vue'
import SideChartPie from '../components/charts-final/side-chart-pie.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components:{ SideChartPie, LiveChartPie },

  data(){
    return{
      keyUpdate:0
    }
  },
  
  computed: {
    ...mapState( 'dashboard', {

      dataStatus: (state) => state.allList,
      alive: (state) => state.aliveTotal,
      dead: (state) => state.deadTotal,
      unknown: (state) => state.unknownTotal,

    })
  },

  watch:{
    dataStatus:{
      handler(){
        this.keyUpdate++
      }
    }
  },

  methods:{
    ...mapActions( 'dashboard', 
    ['POVOATE_CHARACTERS_DASH', 'RESET_STATE']),

    async povoate(){
      await this.POVOATE_CHARACTERS_DASH()
    },

    async resetState(){
      await this.RESET_STATE()
      this.keyUpdate++
    },

  },

  mounted(){
    this.resetState()
    this.povoate()
  }
  }
</script>

<style scoped>

  .dashboard-painel-main{
    margin: 50px auto;
    display: flex;
  }

  h1.title{
    text-align: center;
    font-size: 50px !important;
    margin: 30px;
  }

  .painel-dashboard{
    margin: 20px auto !important;
    border-radius: 10px;
    background-color: whitesmoke;
    height: auto;
    padding: 10px;
  }
  .painel-dashboard.live{
    width: 55% !important;
  }

  .painel-dashboard.pages{
    width: 35% !important;
    display: flex;
    flex-direction: column;
    height: 800px !important;
    overflow: scroll;
  }

    .painel-dashboard::-webkit-scrollbar {
      width: 20px;              
    }

    .painel-dashboard::-webkit-scrollbar-track {
      background: whitesmoke;    
    }

  .painel-dashboard::-webkit-scrollbar-thumb {
    background-color:rgb(255, 255, 255);     
    border-radius: 5px; 
    border: 4px solid rgb(0, 0, 0);  
  }

  .chart-page-container{
    display: flex;
    padding: 20px;
    align-self: flex-start;
  }
  .chart-info{
    margin: auto;
  }
  .live-chart-page-container{
    text-align: center;
  }

  li{
    list-style-type: none;
  }

  #green{
    color: rgb(0, 255, 0);
  }

  #gray{
    color: rgb(131, 131, 131);
  }

  #red{
    color: rgb(255, 0, 0);
  }


</style>