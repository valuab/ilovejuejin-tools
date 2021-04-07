/**
 * 搜索相关接口
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'

const searchLink = {
  searchAll: '/api/pc/search/searchAll', // 搜索全部
  searchByItemCategoryId: '/api/pc/search/searchByItemCategoryId', // 分类搜索
  searchByItemKeywordId: '/api/pc/search/searchByItemKeywordId', // 标签搜索
  searchByHostUserId: '/api/pc/search/searchByHostUserId', // 主持人搜索
  searchByCars: '/api/pc/search/searchByCars', // 搜索车型
  getKolList: '/api/pc/search/getHostList', // 获取王牌节目列表
}

/**
 * 参数约束 START
 */
interface ISearchAllParmas {
  keyword: string
  viewUserId: string
  page: number
}
interface ISearchByItemCategoryIdParmas {
  keyword: string
  categoryId: string
  viewUserId: string
  page: number
}
interface ISearchByItemKeywordIdParmas {
  keyword: string
  keywordId: string
  viewUserId: string
  page: number
}
interface ISearchByHostUserIdParmas {
  keyword: string
  hostUserId: string
  viewUserId: string
  page: number
}
interface ISearchByCarsParmas {
  keyword: string
  categoryId: string
  keywordId: string
  hostUserId: string
  viewUserId: string
  page: number
}

/**
 * 参数约束 END
 */

/**
 * 输出解耦 START
 */
interface ISearchStandard {
  forumId: number
  postId: number
  title: string
  smallImageUrl: string
  totalViewCount: number
  commentCount: number
  publishTime: String
  userId: number
  userName: String
  itemKeywordName: String
  itemCategoryName: String
}

export interface ISearchAll extends IApiResult {
  result: {
    total: number
    list: Array<ISearchStandard>
  }
}
export interface ISearchByItemCategoryId extends IApiResult {
  result: {
    total: number
    list: Array<ISearchStandard>
  }
}
export interface ISearchByItemKeywordId extends IApiResult {
  result: {
    total: number
    list: Array<ISearchStandard>
  }
}
export interface ISearchByHostUserId extends IApiResult {
  result: {
    total: number
    list: Array<ISearchStandard>
  }
}

export interface ISearchByCars extends IApiResult {
  result: {
    total: number
    list: Array<ISearchStandard>
  }
}

export interface IKolListType {
  userId: number
  nickname: String
  smallImageUrl: String
  postCount: String
}

export interface IKolListResult extends IApiResult {
  result: {
    total: number
    list: Array<IKolListType>
  }
}

/**
 * 输出解耦 END
 */

export interface ISearchModule {
  getSearchAll(params: ISearchAllParmas): Promise<ISearchAll['result']>
  getSearchByItemCategoryId(
    params: ISearchByItemCategoryIdParmas
  ): Promise<ISearchByItemCategoryId['result']>
  getSearchByItemKeywordId(
    params: ISearchByItemKeywordIdParmas
  ): Promise<ISearchByItemKeywordId['result']>
  getSearchByHostUserId(
    params: ISearchByHostUserIdParmas
  ): Promise<ISearchByHostUserId['result']>
  getSearchByCars(params: ISearchByCarsParmas): Promise<ISearchByCars['result']>
  getKolList(): Promise<IKolListResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  return {
    async getSearchAll(params) {
      const url = handleUrlParams(searchLink.searchAll, params)
      const { data } = await $axios.get<ISearchAll>(url)

      return data.result
    },

    async getSearchByItemCategoryId(params) {
      const url = handleUrlParams(searchLink.searchByItemCategoryId, params)
      const { data } = await $axios.get<ISearchByItemCategoryId>(url)

      return data.result
    },

    async getSearchByItemKeywordId(params) {
      const url = handleUrlParams(searchLink.searchByItemKeywordId, params)
      const { data } = await $axios.get<ISearchByItemKeywordId>(url)

      return data.result
    },

    async getSearchByHostUserId(params) {
      const url = handleUrlParams(searchLink.searchByHostUserId, params)
      const { data } = await $axios.get<ISearchByHostUserId>(url)

      return data.result
    },

    async getSearchByCars(params) {
      const url = handleUrlParams(searchLink.searchByCars, params)
      const { data } = await $axios.get<ISearchByCars>(url)

      return data.result
    },

    async getKolList() {
      const { data } = await $axios.get<IKolListResult>(searchLink.getKolList)
      return data.result
    },
  } as ISearchModule
}
