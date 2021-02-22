import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import wxConfig from '~/config/wxConfig'
import { handleUrlParams } from '~/utils/data'

const loginLinks = {
  getAccessToken: `${wxConfig.WX_URL}/sns/oauth2/access_token`, // 获取微信秘钥Token
  getUserInfo: `${wxConfig.WX_URL}/sns/userinfo`, // 获取微信用户信息
  getAppIdKey: '/api/getAppIdKey', // 获取网页应用信息
  thirdLogin: '/api/thirdLogin', // 用户登录
}
interface IGetAccessTokenParams {
  appid: string
  secret: string
  code: string
}
interface IGetAccessTokenResult {
  access_token: string
  openid: string
}

interface IGetUserInfoParams {
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

interface IGetAppIdKeyResult extends IApiResult {
  result: {
    appId: string
    appSecret: string
  }
}

interface IThirdLoginParams {
  unionId: string
  openId: string
  nickName: string
  headImg: string
  gender: string
}

interface IThirdLoginResult extends IApiResult {
  result: {
    userId: number
    sessionId: string
  }
}

export interface ILoginModule {
  getAccessToken: (
    params: IGetAccessTokenParams
  ) => Promise<IGetAccessTokenResult>
  getUserInfo: (params: IGetUserInfoParams) => Promise<IGetUserInfoResult>
  getAppIdKey: () => Promise<IGetAppIdKeyResult['result']>
  thirdLogin: (
    params: IThirdLoginParams
  ) => Promise<IThirdLoginResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const loginModule: ILoginModule = {
    // 获取秘钥令牌
    async getAccessToken(params) {
      const paramMap = { ...params, grant_type: 'authorization_code' }
      const url = handleUrlParams(loginLinks.getAccessToken, paramMap)
      const { data } = await $axios.get<IGetAccessTokenResult>(url)

      return data
    },
    // 获取用户登录信息
    async getUserInfo(params) {
      const url = handleUrlParams(loginLinks.getUserInfo, params)
      const { data } = await $axios.get<IGetUserInfoResult>(url)

      return data
    },
    // 获取网页应用信息
    async getAppIdKey() {
      const url = loginLinks.getAppIdKey
      const { data } = await $axios.get<IGetAppIdKeyResult>(url)

      return data.result
    },
    // 登录
    async thirdLogin(params: IThirdLoginParams) {
      const url = loginLinks.thirdLogin
      const { data } = await $axios.post<IThirdLoginResult>(url, params)

      return data.result
    },
  }

  return loginModule
}
