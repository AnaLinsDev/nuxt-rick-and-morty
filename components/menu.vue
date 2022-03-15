<template>
  <v-app-bar>

    <div v-if="userData.loggedIn">
    <v-btn  
    class="btn-main-menu"
    v-for="route in routes" 
    :disabled="route[2] != userData.isAdmin"
    color = "rgb(113, 236, 170)"
    :key="route[1]"
    :to="route[1]"
    >
      {{route[0]}}
    </v-btn>

    <v-btn
    @click="logout"
    color = "rgb(228, 89, 89)"
    class="btn-main-menu logout"
    >
      LogOut 
    </v-btn>
    </div>


    <v-btn 
    v-if="!userData.loggedIn"
    class="btn-main-menu login"
    color = "rgb(0, 255, 255)"
    to="/login"
    >
      LogIn 
    </v-btn>

  </v-app-bar>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  computed: {
    userData(){
      this.routes[2][2] = this.$store.state.user.isAdmin 
      return this.$store.state.user
    }
  },
  methods: {
    ...mapActions('user', ['LOGOUT']),
      logout(){
        this.LOGOUT()
      },
    },
  data(){
    return{
      routes: [
        ['Dashboard', '/dashboard', true],
        ['Tree View', '/tree-view', true],
        ['Characters List', '/characters', false],
      ]
    }
  }
}
</script>

<style>
  .btn-main-menu{
    margin-right: 20px;
    height: 100%;
  }
  .v-toolbar__content {
      justify-content: flex-end;
  }
</style>