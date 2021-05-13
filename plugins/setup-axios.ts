import Vue, { VueConstructor } from 'vue'
import { Context } from '@nuxt/types'
import createHttpModule from '~/api/apiPublic/index'
import getToken from '~/api/token'

export default ({ app, $axios, redirect }: Context) => {
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
  } else if (!app.$cookies.get('token')) {
    // 没登陆本地token设置
    token = getToken()
    app.$cookies.set('token', token, {
      maxAge: 60 * 60 * 24 * 30,
    })
  } else {
    token = app.$cookies.get('token')
  }
  // 监听请求
  $axios.onError(() => {
    redirect('/error')
  })
  $axios.onResponse(({ config, data }) => {
    if (
      config.url?.includes('postComment') ||
      config.url?.includes('supportComment') ||
      config.url?.includes('createForSite')
    ) {
      return data
      // 临时排除评论接口错误
      // 临时排除点赞接口错误
      // 临时排除反馈接口错误
    }
    if (data.err) {
      redirect('/error')
    }
  })

  $axios.setHeader('sign', token.sign)
  $axios.setHeader('sid', token.sid)
  $axios.setHeader('uid', token.uid.toString())
  $axios.setHeader('uuid', token.uuid)
  app.$http = http
  Vue.use(httpInstance)
}
