import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'

export const globalLinks = {
  getAppVersionList: '/api/feedback/getAppVersionList',
  getFeedbackCategory: '/api/feedback/getFeedbackCategory',
  createForSite: '/api/feedback/createForSite',
  getVerifyImg: '/api/feedback/show',
}

interface ICreateParams {
  captcha: string
  categoryId: number
  osTypeId: number
  model: string
  versionCode: string
  content: string
  contact: string
}

export interface IListType {
  id: number
  name: string
}

export interface IAppVersionResult extends IApiResult {
  result: {
    list: Array<IListType>
    total: number
  }
}

export interface ICategoryListResult extends IApiResult {
  result: {
    list: Array<IListType>
    total: number
  }
}

export interface ICreateResult extends IApiResult {
  result: {
    id: number
  }
}

export interface IGlobalModule {
  getAppVersionList(): Promise<IAppVersionResult['result']>
  getFeedbackCategory(): Promise<ICategoryListResult['result']>
  createForSite({
    captcha,
    categoryId,
    osTypeId,
    model,
    versionCode,
    content,
    contact,
  }: ICreateParams): Promise<ICreateResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const userModule: IGlobalModule = {
    async getAppVersionList() {
      const { data } = await $axios.get<IAppVersionResult>(
        globalLinks.getAppVersionList
      )

      return data.result
    },

    async getFeedbackCategory() {
      const { data } = await $axios.get<IAppVersionResult>(
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

  return userModule
}
