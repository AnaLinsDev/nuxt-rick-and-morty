<template>
  <v-form
  class="form-login">

    <h1>Free Login</h1>

    <v-text-field
      v-model="name"
      label="Name"
      :rules="[n => !!n || 'name is required']"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      :rules="[p => !!p || 'password is required']"
      type="password"
      required
    ></v-text-field>

    <v-checkbox
      v-model="isAdmin"
      label="Login as a Admin ?"
    ></v-checkbox>

    <v-btn
      :disabled="!isValid"
      class="btn-login"
      elevation="2"
      @click="login"
    >
      Login
    </v-btn>

  </v-form>
</template>

<script>
import {mapActions} from 'vuex'

export default {

  data(){
    return{
      name:'',
      password:'',
      isAdmin:false,
    }
  },

  computed: {
    isValid(){
      return (this.name.trim() == '' ||this.password.trim() == '' ) 
      ? false : true
      
    }
  },

  methods: {
      ...mapActions(['LOGIN']),
      login(){   
        this.LOGIN({
          name:this.name,
          password: this.password,
          isAdmin : this.isAdmin
          })
         
      },
  }
}
</script>

<style>
  .form-login{
    background-color: whitesmoke;
    width: 40%;
    padding: 30px;
    margin: 100px auto;
    border: 1px solid black;
    text-align: center;
  }
  .btn-login{
    background-color: rgb(0, 255, 255) !important;
    font-weight: bolder !important;
  }
</style>