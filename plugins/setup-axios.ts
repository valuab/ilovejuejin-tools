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
  // 判断是否登录
  let token
  if (app.$accessor.userInfo.isLogin) {
    token = app.$cookies.get('token')
  } else {
    token = getToken()
  }

  $axios.setHeader('sign', token.sign)
  $axios.setHeader('sid', token.sid)
  $axios.setHeader('uid', token.uid.toString())
  $axios.setHeader('uuid', token.uuid)
  app.$http = http
  Vue.use(httpInstance)
}
