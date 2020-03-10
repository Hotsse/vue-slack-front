require('dotenv').config({
  path: './environments/' + ((process.env.profile != undefined) ? `.env.${process.env.profile}` : '.env.local')
})

export default {  
  mode: 'spa',
  message: process.env.message,
  profile: process.env.profile,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** 개발, 빌드 시에만 사용할 외부 모듈
  */
  buildModules: [
    '@nuxtjs/dotenv'
  ],
  /*
  ** 서비스 중에 유기적으로 사용할 외부 모듈
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.axiosBaseUrl
  },
  /**/
  dotenv: {
    path: './environments/',
    filename: (process.env.profile != undefined) ? `.env.${process.env.profile}` : '.env.local',
    systemvars: true
  },  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
