<template>
  <div class="single-chart" >
    <Pie 
      class="pie"
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"
    />
  </div>
</template>

<script>

import Pie from '../charts-shape/chart-pie.vue'

export default {
  name: 'SideChartPie',
  components:{ Pie },

  props: ['chartdatastatus'] ,

  data() {
    return{
      loaded: false,
      chartdata: null,
      options: null,
      labels: ['dead', 'alive', 'uncertain'],
      data: [],
      backgroundColor: [
        'rgb(255, 0, 0)',
        'rgb(0, 255, 0)',
        'rgb(131, 131, 131)'
      ],
    }
  },
  
  async mounted () {


    
    this.loaded = false
    try {

      this.data = [
        this.chartdatastatus.dead,
        this.chartdatastatus.alive,
        this.chartdatastatus.unknown
        ]

      this.chartdata = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: this.backgroundColor 
        }
      ]
    }
    this.options = {
      scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min :0
            }
          }]
          }
    }
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
  
}
</script>

<style scoped>
  .pie{
    width: 200px;
    height: 200px;
  }
</style>