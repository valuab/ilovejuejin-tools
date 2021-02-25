/**
 * 节目相关接口
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'
import { IArticleItemType } from '~/api/apiPublic/type'

const topicLink = {
  getCommendItemList: '/api/item/getCommendItemList', // 获取王牌节目列表
  getListByKeywordId: '/api/item/getListByKeywordId', // 获取内容标签帖子列表
  getOpItem: '/api/item/getOpItem', // 获取单个节目对象
  getListByItemId: '/api/item/getListByItemId', // 获取节目帖子列表
}

export interface ICommendListParams {
  page: number
}
export interface ICommendListType {
  id: string
  name: string
  description: string
  smallImageUrl: string
}

export interface ICommendListResult extends IApiResult {
  result: {
    total: number
    list: Array<ICommendListType>
  }
}

export interface ICommendItemParams {
  viewUserId?: number
  keywordId: string
}
export interface ICommendItemResult extends IApiResult {
  result: {
    total: number
    list: Array<IArticleItemType>
  }
}

export interface IOpItemParams {
  id: string
}
export interface IOpItemResult extends IApiResult {
  result: {
    name: string
    description: string
    smallImageUrl: string
  }
}

export interface IArticleListParams {
  itemId: string
  viewUserId?: number
  typeId?: number | string
  page: number
}
export interface IArticleListResult extends IApiResult {
  result: {
    total: number
    list: Array<IArticleItemType>
  }
}

export interface IProgramModule {
  getCommendItemList(
    params: ICommendListParams
  ): Promise<ICommendListResult['result']>
  getListByKeywordId(
    params: ICommendItemParams
  ): Promise<ICommendItemResult['result']>
  getOpItem(params: IOpItemParams): Promise<IOpItemResult['result']>
  getListByItemId(
    params: IArticleListParams
  ): Promise<IArticleListResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const programMudule: IProgramModule = {
    async getCommendItemList(params) {
      const url = handleUrlParams(topicLink.getCommendItemList, params)
      const { data } = await $axios.get<ICommendListResult>(url)
      return data.result
    },

    async getListByKeywordId(params) {
      const url = handleUrlParams(topicLink.getListByKeywordId, params)
      const { data } = await $axios.get<ICommendItemResult>(url)
      return data.result
    },

    async getOpItem(params) {
      const url = handleUrlParams(topicLink.getOpItem, params)
      const { data } = await $axios.get<IOpItemResult>(url)
      return data.result
    },

    async getListByItemId(params) {
      const url = handleUrlParams(topicLink.getListByItemId, params)
      const { data } = await $axios.get<IArticleListResult>(url)
      return data.result
    },
  }
  return programMudule
}
