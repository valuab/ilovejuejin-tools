import { resolve } from 'path'
import { NuxtConfig } from '@nuxt/types'
import webpack, { RuleSetRule } from 'webpack'
import internalIp from 'internal-ip'

const isProduction = process.env.NODE_ENV === 'production'

export default {
  // https://zh.nuxtjs.org/docs/2.x/configuration-glossary/configuration-env/
  env: {
    BASE_URL: process.env.BASE_URL,
    REDIRECT_URL: process.env.REDIRECT_URL,
    APP_ID: process.env.APP_ID,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '大家车',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge,chrome=1' },
      {
        name: 'keywords',
        content:
          '大家车言论,大家车言论官方网站,YYP颜宇鹏,好车有好报,袁启聪,情怀车,节操卓,曾颖卓,车评人,大疯车,驾值观',
      },
      {
        name: 'description',
        content:
          '这是一个全新维度的汽车信息集群,大家车言论名称中的“大家”有两层含义：第一就是你我他；第二就是大咖、大人物。这构成了“大家车言论”品牌的核心。目前大家车言论旗下有大家车言论自媒体矩阵，大家车问、大家车观察、玩车厂牌大疯车、评车厂牌驾值观等内容厂牌，2019年我们将为大家带来更多价值汽车内容！',
      },
    ],
    link: [
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'icon',
        href: '/static/logo234.png',
      },
      {
        rel: 'apple-touch-icon-precomposed',
        href: '/static/logo234.png',
      },
    ],
    script: [
      { src: 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js' },
    ],
  },

  // loading
  loading: {
    color: '#ff8022',
  },

  // server config
  server: {
    host: !isProduction ? internalIp.v4.sync() : '127.0.0.1',
    port: 9038,
  },

  // router config
  router: {
    middleware: ['login-redirect', 'share-redirect'],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ['ant-design-vue/dist/antd.less', './assets/style/index.scss'],
  css: ['./assets/style/index.scss', './assets/fonts/iconfont.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/router', mode: 'client' },
    '@/plugins/babel-polyfill',
    '@/plugins/antd-ui',
    '@/plugins/setup-axios',
    { src: '@/plugins/vue-config.ts', mode: 'client' },
  ],

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
    scss: [
      './assets/style/_variable.scss',
      './assets/style/_mixins.scss',
      './assets/style/index.scss',
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    retry: { retries: 3 },
    debug: !isProduction,
    timeout: 5000,
    proxy: true,
  },

  // cross domain
  proxy: {
    '/api': {
      target: process.env.BASE_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },

  // alias configuration: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-alias
  alias: {
    '@images': resolve(__dirname, './assets/images'),
    '@components': resolve(__dirname, './components'),
    '@icons': resolve(__dirname, './assets/images/icons'),
    '@apiModules': resolve(__dirname, './api/apiPublic/modules'),
    '@apiPublic': resolve(__dirname, './api/apiPublic'),
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false,
    extractCSS: {
      ignoreOrder: true,
      esModule: true,
    },
    cssSourceMap: !isProduction,
    transpile: ['ant-design-vue'],
    babel: {
      presets: ['es2015', 'stage-2'],
      plugins: [
        ['@babel/plugin-transform-runtime'],
        [
          'import',
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es',
            style: true,
          },
          'ant-design-vue',
        ],
      ],
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          ant_design_vue: {
            name: true,
            test: /[\\/]ant-design-vue[\\/]/,
            chunks: 'all',
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    },
    extend(config, { isClient }) {
      const module = config.module

      if (isClient) {
        config.devtool = !isProduction ? 'inline-source-map' : false
      } else {
        config.devtool = false
      }

      if (module) {
        const svgRule = module.rules.find((rule) =>
          (rule.test as RegExp).test('.svg')
        ) as RuleSetRule
        svgRule.test = /\.(png|jpe?g|gif|webp)$/

        // 配置 svg
        module.rules.push({
          test: /\.svg$/,
          use: ['vue-loader', 'vue-svg-loader'],
        })
        // 配置 file 文件转义
        module.rules.push({
          test: /\.(eot|ttf|woff)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        })
        // 配置 antdvue 风格
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
      // 去掉 antd-vue icon
      if (config.resolve?.alias) {
        config.resolve.alias['@ant-design/icons/lib/dist$'] = resolve(
          __dirname,
          './plugins/antd-icons.ts'
        )
      }
    },
  },
} as NuxtConfig
