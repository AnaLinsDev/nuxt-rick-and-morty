<template>
  <div class="characters-page">

    <h1 class="title">Characters List</h1>
    <div class="list-characters">
        <CardCharacter
        v-for="c in characters" 
        :item="c"
        :key="c.id" />
    </div>

    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="42"
        :total-visible="9"
        circle
      ></v-pagination>
    </div>

  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('characters', {
      characters: (state) => state.allListC,
    }),
  },

  data(){
    return{
      page: 1,
    }
  },

  watch:{
    page: {
      handler(){
        this.povoate(this.page)
      }
    }
  },

  methods:{
    ...mapActions('characters', ['POVOATE_CHARACTERS']),

    async povoate(page){
      await this.POVOATE_CHARACTERS(page)
    }

  },

  mounted(){
    this.povoate(this.page)
  }
}
</script>

<style scoped>

  h1.title{
    text-align: center;
    font-size: 50px !important;
    margin: 100px;
  }

  .characters-page{
    margin: 50px 80px;
  }

  .list-characters{
    display: flex;
    flex-wrap: wrap;
  }

</style>