/**
 * 首页相关接口
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { NEW_LIST_TYPE } from '~/enums/content'
import { handleUrlParams } from '~/utils/data'
import { IArticleItemType } from '~/api/apiPublic/type'

export const homeLinks = {
  getCommendList: '/api/index/getCommendList', // 获取王牌节目
  getOpItemCategory: '/api/index/getOpItemCategory', // 获取内容分类
  getKolList: '/api/index/getKolList', // 获取大咖列表
  getNewList: '/api/index/getNewList', // 获取最新推荐或全部出品
  getRecommendList: '/api/index/getRecommendList', // 获取精选王牌节目
  getGuessYouLikeList: '/api/index/getGuessYouLikeList', // 获取猜你喜欢
  getListByCategoryId: '/api/index/getListByCategoryId', // 获取分类帖子
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
  smallImageUrl: string
}

interface IKolListResult extends IApiResult {
  result: {
    list: IKolListData[]
  }
}
export interface INewListData {
  forumId: number
  smallImageUrl: string
  postId: string
  title: string
}

interface IGetNewListParams {
  viewUserId: number
  type: NEW_LIST_TYPE
  page?: number
}

export interface IGetNewListResult extends IApiResult {
  result: {
    total: number
    list: INewListData[]
  }
}

export interface IGetCategoryIdResult extends IApiResult {
  result: {
    total: number
    list: IArticleItemType[]
  }
}
export interface IRecommendListData {
  id: string
  smallImageUrl: string
  description: string
  recommendSmallImageUrl: string
}
interface IGetRecommendList extends IApiResult {
  result: {
    list: IRecommendListData[]
  }
}

export interface IGuessYouLikeItem {
  forumId: number
  postId: string
  title: string
  smallImageUrl: string
}

interface IGetGuessYouLikeListParams {
  count: number
}

interface IGetGuessYouLikeListResult extends IApiResult {
  result: {
    list: IGuessYouLikeItem[]
  }
}

interface IGetListByCategoryIdParams {
  viewUserId: number
  categoryId: string
  page?: number
}

interface IGetListByCategoryIdResult extends IApiResult {
  result: {
    total: number
    list: IArticleItemType[]
  }
}
export interface IHomeModule {
  getCommendList: () => Promise<ILayoutListData[]>
  getOpItemCategory: () => Promise<ILayoutListData[]>
  getKolList: () => Promise<IKolListData[]>
  getNewList: (
    params: IGetNewListParams
  ) => Promise<IGetNewListResult['result'] | IGetCategoryIdResult['result']>
  getRecommendList: () => Promise<IRecommendListData[]>
  getGuessYouLikeList: (
    params: IGetGuessYouLikeListParams
  ) => Promise<IGuessYouLikeItem[]>
  getListByCategoryId: (
    params: IGetListByCategoryIdParams
  ) => Promise<IGetListByCategoryIdResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const homeModule: IHomeModule = {
    // 获取王牌节目
    async getCommendList() {
      const url = homeLinks.getCommendList
      const { data } = await $axios.get<ILayoutsResult>(url)

      return data.result.list
    },
    // 获取内容分类
    async getOpItemCategory() {
      const url = homeLinks.getOpItemCategory
      const { data } = await $axios.get<ILayoutsResult>(url)

      return data.result.list
    },
    // 获取大咖列表
    async getKolList() {
      const url = homeLinks.getKolList
      const { data } = await $axios.get<IKolListResult>(url)

      return data.result.list
    },
    // 获取最新推荐&全部出品
    async getNewList(params) {
      const url = handleUrlParams(homeLinks.getNewList, params)
      const { data } = await $axios.get<
        IGetNewListResult | IGetCategoryIdResult
      >(url)

      return data.result
    },
    // 获取精选王牌节目
    async getRecommendList() {
      const url = homeLinks.getRecommendList
      const { data } = await $axios.get<IGetRecommendList>(url)

      return data.result.list
    },
    // 获取猜你喜欢列表
    async getGuessYouLikeList(params) {
      const url = handleUrlParams(homeLinks.getGuessYouLikeList, params)
      const { data } = await $axios.get<IGetGuessYouLikeListResult>(url)

      return data.result.list
    },
    // 获取分类帖子
    async getListByCategoryId(params) {
      const url = handleUrlParams(homeLinks.getListByCategoryId, params)
      const { data } = await $axios.get<IGetListByCategoryIdResult>(url)

      return data.result
    },
  }

  return homeModule
}
