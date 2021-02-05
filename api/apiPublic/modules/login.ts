import { NuxtAxiosInstance } from '@nuxtjs/axios'
import wxConfig from '~/config/wxConfig'

export const loginLinks = {
  getAccessToken: `${wxConfig.WX_URL}/sns/oauth2/access_token`,
  getUserInfo: `${wxConfig.WX_URL}/sns/userinfo`,
  thirdLogin: '/api/thirdLogin',
}

interface IGetAccessTokenResult {
  access_token: string
  openid: string
}

interface IGetUserInfoResult {
  unionid: string
  openid: string
  nickname: string
  headimgurl: string
  sex: string
}

export interface ILoginModule {
  getAccessToken: (
    appid: string,
    secret: string,
    code: string
  ) => Promise<IGetAccessTokenResult>
  getUserInfo: (
    access_token: string,
    openid: string
  ) => Promise<IGetUserInfoResult>
}

export default ($axios: NuxtAxiosInstance) => {
  const loginModule: ILoginModule = {
    async getAccessToken(appid, secret, code) {
      const url = `${loginLinks.getAccessToken}?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`
      const { data } = await $axios.get<IGetAccessTokenResult>(url)

      return data
    },
    async getUserInfo(access_token, openid) {
      const url = `${loginLinks.getUserInfo}?access_token=${access_token}&openid=${openid}`
      const { data } = await $axios.get<IGetUserInfoResult>(url)

      return data
    },
  }

  return loginModule
}
