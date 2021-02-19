import { resolve } from 'path'
import { NuxtConfig } from '@nuxt/types'
import { RuleSetRule } from 'webpack'

export default {
  // https://zh.nuxtjs.org/docs/2.x/configuration-glossary/configuration-env/
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-with-vue3',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js' },
    ],
  },

  // server config
  server: {
    // host: '192.168.5.224',
    port: 3000,
  },

  // router config
  router: {
    middleware: ['login-redirect'],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ant-design-vue/dist/antd.less', './assets/style/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/antd-ui', '@/plugins/setup-axios'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://composition-api.nuxtjs.org/helpers/ssrPromise
    '@nuxtjs/composition-api',
    // https://typed-vuex.roe.dev/getting-started-nuxt
    'nuxt-typed-vuex',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // https://www.npmjs.com/package/@nuxtjs/style-resources
    '@nuxtjs/style-resources',
    // https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',
  ],

  // Modules: https://zh.nuxtjs.org/docs/2.x/configuration-glossary/configuration-build/#styleresources
  styleResources: {
    scss: ['./assets/style/_variable.scss', './assets/style/_mixins.scss'],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    retry: { retries: 3 },
    debug: process.env._ENV !== 'production',
    timeout: 5000,
    proxy: true,
  },

  // cross domain
  proxy: {
    '/api/': {
      target: process.env.BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/': 'pc/',
      },
    },
  },

  // alias configuration: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-alias
  alias: {
    '@images': resolve(__dirname, './assets/images'),
    '@icons': resolve(__dirname, './assets/images/icons'),
    '@apiModules': resolve(__dirname, './api/apiPublic/modules'),
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      const module = config.module

      if (module) {
        const svgRule = module.rules.find((rule) =>
          (rule.test as RegExp).test('.svg')
        ) as RuleSetRule
        svgRule.test = /\.(png|jpe?g|gif|webp)$/
        module.rules.push({
          test: /\.svg$/,
          use: ['babel-loader', 'vue-svg-loader'],
        })
        module.rules.push({
          test: /\.less/,
          loader: 'less-loader',
          options: {
            lessOptions: {
              modifyVars: {
                'primary-color': '#ff8022',
                'link-color': '#ff8022',
                'heading-color': '#333333',
                'text-color': '#3a3a3a',
                'text-color-secondary': '#999999',
                'disabled-color': '#b6b6b6',
                'border-color-base': '#e6e6e6',
                'box-shadow-base': 'rgba(0, 0, 0, .15)',
              },
              javascriptEnabled: true,
            },
          },
        })
      }
    },
  },
} as NuxtConfig
