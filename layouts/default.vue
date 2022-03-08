<template>
  <v-app>

    <v-main>
      <v-container>
        <Menu />
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>

import '@/assets/css/global.css';

export default {
  components: {
  dirs: [
    '~/components',
    ]
  }
}
</script>

<style>
  .container{
    padding: 0 !important;
    max-width: 100vw !important;
    margin: 0px !important;
  }

  .v-toolbar__content {
    padding: 8px 16px !important;
  }
</style>