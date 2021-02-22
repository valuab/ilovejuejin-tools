import Vue, { VueConstructor } from 'vue'
import { Context } from '@nuxt/types'
import createHttpModule from '~/api/apiPublic/index'
import getToken from '~/api/token'

export default ({ app, $axios }: Context) => {
  const http = createHttpModule($axios)
  const httpInstance = {
    install(Vue: VueConstructor) {
      Vue.prototype.$http = http
    },
  }
  const headers = $axios.defaults.headers
  $axios.defaults.headers = { ...headers, ...getToken() }
  app.$http = http
  Vue.use(httpInstance)
}
