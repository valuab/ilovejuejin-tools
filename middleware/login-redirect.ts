import { Context } from '@nuxt/types'
import wxConfig from '~/config/wxConfig'

export default async ({ route, app }: Context) => {
  const { code, state } = route.query

  if (code && state === 'wxLogin') {
    const { access_token, openid } = await app.$http.login.getAccessToken(
      wxConfig.APP_ID,
      wxConfig.SECRET,
      code as string
    )
    const userInfo = await app.$http.login.getUserInfo(access_token, openid)

    console.log(userInfo)
  }
}
