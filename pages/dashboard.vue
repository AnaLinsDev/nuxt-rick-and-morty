<template>
  <div class="dashboard">
    <h1 class="title">Dashboard - Rick and Morty API </h1>
    <div class="dashboard-painel-main">



      <PainelCard class="painel-dashboard live">

          <div 
          class="live-chart-page-container">
              <h1 class="live-dash-title">
                  Live DashBoard
                  <hr>
                  <ul style="text-align:left;" >
                    <li>Alive: {{alive}}</li>
                    <li>Dead: {{dead}}</li>
                    <li>Uncertain: {{unknown}}</li>
                  </ul>
                </h1>
              <LiveChartPie 
              class="big-chart"
              :key = "keyUpdate"
              :chartdatastatus = "{alive, dead, unknown}" />

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
                  <h2 class="chart-info">
                  Page {{res.pageFrom}} to {{res.pageTo}}
                  <hr>
                  <ul>
                    <li>Alive: {{res.alive}}</li>
                    <li>Dead: {{res.dead}}</li>
                    <li>Uncertain: {{res.unknown}}</li>
                  </ul>
                  </h2>
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
    ...mapState( {

      dataStatus: (state) => state.dashboard.allList,
      alive: (state) => state.dashboard.aliveTotal,
      dead: (state) => state.dashboard.deadTotal,
      unknown: (state) => state.dashboard.unknownTotal,

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
    ...mapActions(['POVOATE_CHARACTERS_DASH']),

    async povoate(){
      await this.POVOATE_CHARACTERS_DASH()

    }

  },

  mounted(){
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
    scrollbar-color: rebeccapurple green !important;
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


</style>