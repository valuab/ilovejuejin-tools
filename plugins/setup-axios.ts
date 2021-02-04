import Vue, { VueConstructor } from 'vue'
import { Context } from '@nuxt/types'
import createHttpModule, { IRootHttpState } from '~/api/apiPublic/index'

export default (context: Context) => {
  console.log(process.env.BASE_URL)

  const http = createHttpModule(context.$axios)
  const httpInstance = {
    install(Vue: VueConstructor) {
      Vue.prototype.$http = http
    },
  }
  context.app.$http = http
  Vue.use(httpInstance)
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $http: IRootHttpState
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: IRootHttpState
  }
}
