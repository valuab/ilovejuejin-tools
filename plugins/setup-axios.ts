import Vue, { VueConstructor } from 'vue'
import { Context } from '@nuxt/types'
import createHttpModule, { IRootHttpState } from '~/api/apiPublic/index'
import getToken from '~/api/token'

export default ({ app, $axios }: Context) => {
  const http = createHttpModule($axios)
  const httpInstance = {
    install(Vue: VueConstructor) {
      Vue.prototype.$http = http
    },
  }
  $axios.defaults.headers = getToken()
  app.$http = http
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
