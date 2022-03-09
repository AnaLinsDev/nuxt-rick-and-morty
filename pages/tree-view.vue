<template>
  <div>
    <h1 class="title">Tree  View</h1>
    <p class="center"> Here I'm going to use only the first page of each API request </p>
  
    <div class="painel-tree-view">

        <ListEpisodes class="painel-card episodes"/>
        <ListCharacterInfo class="painel-card episodes"/>

    </div>
  
  </div>
</template>



<script>
import ListCharacterInfo from '../components/lists/list-character-info.vue'
import ListEpisodes from '../components/lists/list-episodes.vue'

export default {
  components: { ListEpisodes, ListCharacterInfo },
}
</script>



<style >

  h1.title{
    font-size: 50px !important;
    margin: 30px;
  }
  p.center, h1.title{
    text-align: center;
    font-weight: bold;
  }

  .painel-tree-view{
    display: flex;
    justify-content: space-around;
    background-color: whitesmoke;
    width: 90vw;
    height: 90vh;
    margin: auto;
    border-radius: 20px;
    margin-bottom: 100px;
  }

  .painel-card{
    overflow: scroll;
  }

  
  .painel-card::-webkit-scrollbar {
    width: 15px;              
  }

  .painel-card::-webkit-scrollbar-track {
    background: whitesmoke;    
  }

  .painel-card::-webkit-scrollbar-thumb {
    background-color:rgb(255, 255, 255);     
    border-radius: 12px; 
    border: 2px solid rgb(0, 0, 0);  
  }
</style>