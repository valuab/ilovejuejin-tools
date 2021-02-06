import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import wxConfig from '~/config/wxConfig'
import { handleUrlParams } from '~/utils/data'

export const loginLinks = {
  getAccessToken: `${wxConfig.WX_URL}/sns/oauth2/access_token`,
  getUserInfo: `${wxConfig.WX_URL}/sns/userinfo`,
  getAppIdKey: '/api/getAppIdKey',
  thirdLogin: '/api/thirdLogin',
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
  getAccessToken: ({
    appid,
    secret,
    code,
  }: IGetAccessTokenParams) => Promise<IGetAccessTokenResult>
  getUserInfo: ({
    access_token,
    openid,
  }: IGetUserInfoParams) => Promise<IGetUserInfoResult>
  getAppIdKey: () => Promise<IGetAppIdKeyResult['result']>
  thirdLogin: ({
    unionId,
    openId,
    nickName,
    headImg,
    gender,
  }: IThirdLoginParams) => Promise<IThirdLoginResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const loginModule: ILoginModule = {
    async getAccessToken(params) {
      const paramMap = { ...params, grant_type: 'authorization_code' }
      const url = handleUrlParams(loginLinks.getAccessToken, paramMap)
      const { data } = await $axios.get<IGetAccessTokenResult>(url)

      return data
    },
    async getUserInfo(params) {
      const url = handleUrlParams(loginLinks.getUserInfo, params)
      const { data } = await $axios.get<IGetUserInfoResult>(url)

      return data
    },
    async getAppIdKey() {
      const url = loginLinks.getAppIdKey
      const { data } = await $axios.get<IGetAppIdKeyResult>(url)

      return data.result
    },
    async thirdLogin(params: IThirdLoginParams) {
      const url = handleUrlParams(loginLinks.thirdLogin, params)
      const { data } = await $axios.get<IThirdLoginResult>(url)

      return data.result
    },
  }

  return loginModule
}
