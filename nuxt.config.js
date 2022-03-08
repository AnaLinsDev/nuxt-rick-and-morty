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
  }

}