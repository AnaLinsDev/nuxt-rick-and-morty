<template>
  <v-card
    class="mx-auto card"
    max-width="210"
  >
    <v-img
      :src="item.image"
      height="210px"
      width="210px" 
    ></v-img>

    <v-card-title>
     {{item.name}}
    </v-card-title>

    <v-card-subtitle>
      {{item.status}}
    </v-card-subtitle>


  </v-card>
</template>

<script>
  export default {
    props:['item']
  }
</script>

<style scoped>
  .card{
    margin-bottom: 30px !important;
  }
</style>