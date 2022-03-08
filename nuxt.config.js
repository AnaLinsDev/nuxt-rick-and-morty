export default {

  ssr: false,

  components: true,

  css: [
    '@/assets/css/global.css'
  ],
  
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  router: {
    middleware: ['auth', 'adminAuth']
  },

  head: {
    titleTemplate: 'RM - Nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ]
  }

}