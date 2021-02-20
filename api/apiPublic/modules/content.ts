import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { NEW_LIST_TYPE } from '~/enums/content'
import { handleUrlParams } from '~/utils/data'

export const contentLinks = {
  getCommendList: '/api/index/getCommendList',
  getOpItemCategory: '/api/index/getOpItemCategory',
  getKolList: '/api/index/getKolList',
  getNewList: '/api/index/getNewList',
  getRecommendList: '/api/index/getRecommendList',
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

interface IGetNewListParams {
  viewUserId: number
  type: NEW_LIST_TYPE
}

export interface INewListData {
  forumId: number
  smallImageUrl: string
  postId: string
  title: string
}

interface IGetNewListResult extends IApiResult {
  result: {
    list: INewListData[]
  }
}

export interface IRecommendListData {
  id: string
  smallImageUrl: string
  description: string
}
interface IGetRecommendList extends IApiResult {
  result: {
    list: IRecommendListData[]
  }
}
export interface IContentModule {
  getCommendList: () => Promise<ILayoutListData[]>
  getOpItemCategory: () => Promise<ILayoutListData[]>
  getKolList: () => Promise<IKolListData[]>
  getNewList: (params: IGetNewListParams) => Promise<INewListData[]>
  getRecommendList: () => Promise<IRecommendListData[]>
}

export default ($axios: NuxtAxiosInstance) => {
  const contentModule: IContentModule = {
    // 获取王牌节目
    async getCommendList() {
      const url = contentLinks.getCommendList
      const { data } = await $axios.get<ILayoutsResult>(url)

      return data.result.list
    },
    // 获取内容分类
    async getOpItemCategory() {
      const url = contentLinks.getOpItemCategory
      const { data } = await $axios.get<ILayoutsResult>(url)

      return data.result.list
    },
    // 获取大咖列表
    async getKolList() {
      const url = contentLinks.getKolList
      const { data } = await $axios.get<IKolListResult>(url)

      return data.result.list
    },
    // 获取最新推荐&全部出品
    async getNewList(params: IGetNewListParams) {
      const url = handleUrlParams(contentLinks.getNewList, params)
      const { data } = await $axios.get<IGetNewListResult>(url)

      return data.result.list
    },
    // 获取精选王牌节目
    async getRecommendList() {
      const url = contentLinks.getRecommendList
      const { data } = await $axios.get<IGetRecommendList>(url)

      return data.result.list
    },
  }

  return contentModule
}
