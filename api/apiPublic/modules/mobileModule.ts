/**
 * 节目相关接口
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'

const mobileLink = {
  getUrlScheme: '/api/pc/urlScheme', // 获取小程序scheme码
  getJsSdkAll: '/api/pc/getJsSdkAll', // 获取跳转小程序jssdk需要的参数
}

// 官网页面匹配小程序路径
export const wxappUrl = new Map([
  ['index', 'pages/recommend/recommend'],
  ['topic-id', 'pages/programDetail/programDetail'],
  ['kol-id', 'pages/userDetail/userDetail'],
  ['category-id', 'pages/categoryDetail/categoryDetail'],
  ['videoDetails', 'pages/article/article'],
  ['details', 'pages/article/article'],
  ['topiclist', 'pages/recommend/recommend'],
  ['search', 'pages/search/search'],
])

export interface IUrlSchemeParams {
  path: string
  query: string
}
export interface IUrlSchemeResult extends IApiResult {
  result: string
}

export interface IGetSdkParams {
  url: string
}
export interface IGetSdkResult extends IApiResult {
  result: {
    timestamp: string
    nonceStr: string
    signature: string
    appId: string
  }
}

export interface IMobileModule {
  getUrlScheme(params: IUrlSchemeParams): Promise<IUrlSchemeResult['result']>
  getJsSdkAll(params: IGetSdkParams): Promise<IGetSdkResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const mobileMudule: IMobileModule = {
    async getUrlScheme(params) {
      const url = handleUrlParams(mobileLink.getUrlScheme, params)
      const { data } = await $axios.get<IUrlSchemeResult>(url)
      return data.result
    },
    async getJsSdkAll(params) {
      const url = handleUrlParams(mobileLink.getJsSdkAll, params)
      const { data } = await $axios.get<IGetSdkResult>(url)
      return data.result
    },
  }
  return mobileMudule
}
