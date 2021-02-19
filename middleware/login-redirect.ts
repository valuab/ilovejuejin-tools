import { Context } from '@nuxt/types'
import getToken from '~/api/token'

export default async ({ route, app, $axios, redirect }: Context) => {
  const { code, state } = route.query

  if (process.env.NODE_ENV === 'development' && process.client) {
    const token = app.$cookies.get('token')
    $axios.defaults.headers = token
  }

  if (code && state === 'wxLogin') {
    try {
      const {
        appId: appid,
        appSecret: secret,
      } = await app.$http.login.getAppIdKey()
      const { access_token, openid } = await app.$http.login.getAccessToken({
        appid,
        secret,
        code: code as string,
      })
      const userInfo = await app.$http.login.getUserInfo({
        access_token,
        openid,
      })
      const loginParams = {
        unionId: userInfo.unionid,
        openId: userInfo.openid,
        nickName: userInfo.nickname,
        headImg: userInfo.headimgurl,
        gender: userInfo.sex,
      }
      const { sessionId, userId } = await app.$http.login.thirdLogin(
        loginParams
      )

      const token = getToken(sessionId, userId)

      $axios.defaults.headers = token
      app.$cookies.set('token', token)
      redirect(route.path)
    } catch (err) {
      redirect(route.path)
    }
  }
}
