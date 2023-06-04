import path from 'path'
import fs from 'fs'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'bengal-shop-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ],
    // script: [
    //   {
    //     src: "https://sandbox.sslcommerz.com/embed.min.js?" + Math.random().toString(36).substring(7),
    //     body: true
    //   },
    // ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'overlayscrollbars/css/OverlayScrollbars.css',
    '~/assets/css/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // {src: '~/plugins/vue-slick-carousel', ssr: true},
    {src: '~/plugins/v-click-outside', ssr: false},
    {src: '~/plugins/vue-toast-notification', ssr: false},
    {src: '~/plugins/vue-apexcharts', ssr: false},
    '~/plugins/vue-slick-carousel',
    '~/plugins/overlayscrollbars',
    '~/plugins/firebase'
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules'@nuxtjs/axios'
  modules: [
    ["vue-toastification/nuxt", {
      timeout: 1000,
      draggable: true
    }],
    '@nuxtjs/auth-next',
    '@nuxtjs/axios' 
  ],

  auth: {
        strategies: {
            cookie: {
                endpoints: {
                    csrf: {
                        url: '/sanctum/csrf-cookie'
                    },
                    login: {
                        url: '/login'
                    },
                    logout: {
                        url: '/logout'
                    },
                    user: {
                        url: '/user'
                    }
                },
                user: {
                    property: 'data'
                },
            },
            //mod by me
            admin: {
              scheme: 'cookie',
              endpoints: {
                  csrf: {
                      url: '/sanctum/csrf-cookie'
                  },
                  login: {
                      url: '/admin/login'
                  },
                  logout: {
                      url: '/admin/logout'
                  },
                  user: {
                      url: '/admin/user'
                  }
              },
              user: {
                  property: 'data'
              },
          }
        },

        redirect: {
            login: '/login',
            logout: '/', //'/login',
            home: '/',
            // dashboard: '/admin/dashboard'
        },

        // plugins: ['~/plugins/axios'],
    },

  axios: {
      // baseURL: 'http://localhost:81/api',
      baseURL: 'https://api.bdshop.test/api',
      credentials: true,
      // https: false
  },

  publicRuntimeConfig: {
    // baseURL: 'http://localhost:81'
    baseURL: 'https://api.bdshop.test'
  },
  // privateRuntimeConfig: {
  //   // apiSecret: process.env.API_SECRET
  //   pgwUrl: process.env.SSLCOMMERZ_API_DOMAIN_URL,
  //   pgwSroreId: process.env.SSLCOMMERZ_STORE_ID,
  //   pgwStorePassword: process.env.SSLCOMMERZ_STORE_PASSWORD,
  //   pgwIsLocalhost: process.env.SSLCOMMERZ_IS_LOCALHOST,
  // },

  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
