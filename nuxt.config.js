export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '最專業的線上程式語言課程 | 工程師首選教學平台 | HiSKIO 嗨 程式技能-Demo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'HiSKIO專注於「程式語言教育」的線上課程平台，提供專業的程式線上課程以及Coding練習環境，實用的線上教材與教學服務，迅速培養科技職人！' },
      { name: 'og:title', content: '最專業的線上程式語言課程 | 工程師首選教學平台 | HiSKIO 嗨 程式技' },
      { name: 'og:description', content: 'HiSKIO專注於「程式語言教育」的線上課程平台，提供專業的程式線上課程以及Coding練習環境，實用的線上教材與教學服務，迅速培養科技職人！' },
      { name: 'og:url', content: 'https://hiskio.co' },
      { name: 'og:type', content: 'website' },
      { name: 'og:site_name', content: '最專業的線上程式語言課程 | 工程師首選教學平台 | HiSKIO 嗨 程式技能' },
      { name: 'og:image', content: 'https://hiskio.com/images/hiskio.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '@/assets/css/tailwind.css' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/backend/api', ssr: true },
    { src: '~/plugins/filters', ssr: true },
    { src: '~/plugins/toast', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  loading: '~/components/loading.vue',

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true // SSR 模式下 會建議開啟分別載入
  }
}
