/**
 * 搜索相关接口
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'

const searchLink = {
  getKolList: '/api/search/getHostList', // 获取王牌节目列表
}

export interface IKolListType {
  userId: number
  nickname: string
  smallImageUrl: string
  postCount: string
}
export interface IKolListResult extends IApiResult {
  result: {
    total: number
    list: Array<IKolListType>
  }
}

export interface ISearchModule {
  getKolList(): Promise<IKolListType[]>
}

export default ($axios: NuxtAxiosInstance) => {
  const searchModule: ISearchModule = {
    async getKolList() {
      const { data } = await $axios.get<IKolListResult>(searchLink.getKolList)
      return data.result.list
    },
  }
  return searchModule
}
