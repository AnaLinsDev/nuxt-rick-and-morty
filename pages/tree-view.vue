<template>
  <div>
    <h1 class="title">Tree  View</h1>
    <p class="center"> Here I'm going to use only the first page of each API request </p>
  
    <div class="painel-tree-view">
      <PainelCard />
      <PainelCard />
      <PainelCard />
    </div>
  
  </div>
</template>

<script>
export default {
  beforeCreate(){
    !this.$store.state.user.loggedIn ? this.$router.push('/login') :
    !this.$store.state.user.isAdmin ? this.$router.push('/characters') :
    ''
  }
}
</script>

<style scoped>

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
</style>