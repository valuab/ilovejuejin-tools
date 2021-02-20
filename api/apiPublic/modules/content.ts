import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
// import { handleUrlParams } from '~/utils/data'

export const contentLinks = {
  getCommendList: '/api/index/getCommendList',
  getOpItemCategory: '/api/index/getOpItemCategory',
  getKolList: '/api/index/getKolList',
}

export interface ILayoutListData {
  id: string
  name: string
}

interface ILayoutsResult extends IApiResult {
  result: {
    list: ILayoutListData[]
  }
}

export interface IKolListData {
  userId: number
  nickname: string
}

interface IKolListResult extends IApiResult {
  result: {
    list: IKolListData[]
  }
}
export interface IContentModule {
  getCommendList: () => Promise<ILayoutListData[]>
  getOpItemCategory: () => Promise<ILayoutListData[]>
  getKolList: () => Promise<IKolListData[]>
}

export default ($axios: NuxtAxiosInstance) => {
  const contentModule: IContentModule = {
    async getCommendList() {
      const url = contentLinks.getCommendList
      const { data } = await $axios.get<ILayoutsResult>(url)

      return data.result.list
    },
    async getOpItemCategory() {
      const url = contentLinks.getOpItemCategory
      const { data } = await $axios.get<ILayoutsResult>(url)

      return data.result.list
    },
    async getKolList() {
      const url = contentLinks.getKolList
      const { data } = await $axios.get<IKolListResult>(url)

      return data.result.list
    },
  }

  return contentModule
}
