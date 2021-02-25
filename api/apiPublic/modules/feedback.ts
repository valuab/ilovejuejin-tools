/**
 * 问题反馈接口
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'

export const globalLinks = {
  getAppVersionList: '/api/feedback/getAppVersionList', // 获取app版本列表
  getFeedbackCategory: '/api/feedback/getFeedbackCategory', // 获取反馈类型列表
  createForSite: '/api/feedback/createForSite', // 保存反馈
  getVerifyImg: '/api/feedback/show', // 获取随机图
}

interface ICreateParams {
  captcha: string
  categoryId: number
  osTypeId: number | string
  model: string
  versionCode: string | number
  content: string
  contact: string
}
export interface ICreateResult extends IApiResult {
  result: {
    id: number
  }
}

export interface IAppVersionType {
  id: number
  name?: string
  versionName: string
}

export interface IAppVersionResult extends IApiResult {
  result: {
    list: Array<IAppVersionType>
    total: number
  }
}

export interface ICategoryListType {
  id: number
  name: string
}
export interface ICategoryListResult extends IApiResult {
  result: {
    list: Array<ICategoryListType>
    total: number
  }
}

export interface IFeedbackModule {
  getAppVersionList(): Promise<IAppVersionResult['result']>
  getFeedbackCategory(): Promise<ICategoryListResult['result']>
  createForSite(params: ICreateParams): Promise<ICreateResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const feedbackModule: IFeedbackModule = {
    async getAppVersionList() {
      const { data } = await $axios.get<IAppVersionResult>(
        globalLinks.getAppVersionList
      )

      return data.result
    },

    async getFeedbackCategory() {
      const { data } = await $axios.get<ICategoryListResult>(
        globalLinks.getFeedbackCategory
      )

      return data.result
    },

    async createForSite(params) {
      const url = handleUrlParams(globalLinks.createForSite, params)
      const { data } = await $axios.get<ICreateResult>(url)

      return data.result
    },
  }
  return feedbackModule
}
