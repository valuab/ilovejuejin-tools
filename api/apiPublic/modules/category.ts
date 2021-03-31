/**
 * 分类相关接口
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'
import { IArticleItemType } from '~/api/apiPublic/type'

const userLinks = {
  getOpItemCategory: '/api/pc/category/getOpItemCategory', // 获取分类对象
  getItemListByCategoryId: '/api/pc/category/getItemListByCategoryId', // 获取分类王牌节目推荐
  getHostListByCategoryId: '/api/pc/category/getHostListByCategoryId', // 获取分类主持人列表
  getListByCategoryId: '/api/pc/index/getListByCategoryId',
  getListByCategoryIdHostUserId: '/api/pc/user/getListByCategoryIdHostUserId', // 获取内容分类帖子列表
}

interface ICategoryParams {
  id: string
}
export interface ICategoryDetailResult extends IApiResult {
  result: {
    name: string
    description: string
    smallImageUrl: string
  }
}

interface IProgramListParams {
  categoryId: string
}
export interface IProgramListType {
  id: number
  smallImageUrl: string
  name: string
}
export interface IProgramListResult extends IApiResult {
  result: {
    total: number
    list: Array<IProgramListType>
  }
}

interface IUserListParams {
  categoryId: string
}
export interface IUserListType {
  userId: number
  nickname: string
}
export interface IUserListResult extends IApiResult {
  result: {
    total: number
    list: Array<IUserListType>
  }
}

interface INewArticleListParams {
  viewUserId?: number
  categoryId: string
  typeId?: number | string
  page: number
}

interface IArticleListParams {
  categoryId: string
  hostUserId: number
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

export interface ICategoryModule {
  getOpItemCategory(
    params: ICategoryParams
  ): Promise<ICategoryDetailResult['result']>
  getItemListByCategoryId(
    params: IProgramListParams
  ): Promise<IProgramListResult['result']>
  getHostListByCategoryId(
    params: IUserListParams
  ): Promise<IUserListResult['result']>
  getListByCategoryId(
    params: INewArticleListParams
  ): Promise<IArticleListResult['result']>
  getListByCategoryIdHostUserId(
    params: IArticleListParams
  ): Promise<IArticleListResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const categoryModule: ICategoryModule = {
    async getOpItemCategory(params) {
      const url = handleUrlParams(userLinks.getOpItemCategory, params)
      const { data } = await $axios.get<ICategoryDetailResult>(url)

      return data.result
    },

    async getItemListByCategoryId(params) {
      const url = handleUrlParams(userLinks.getItemListByCategoryId, params)
      const { data } = await $axios.get<IProgramListResult>(url)

      return data.result
    },

    async getHostListByCategoryId(params) {
      const url = handleUrlParams(userLinks.getHostListByCategoryId, params)
      const { data } = await $axios.get<IUserListResult>(url)

      return data.result
    },

    async getListByCategoryId(params) {
      const url = handleUrlParams(userLinks.getListByCategoryId, params)
      const { data } = await $axios.get<IArticleListResult>(url)

      return data.result
    },

    async getListByCategoryIdHostUserId(params) {
      const url = handleUrlParams(
        userLinks.getListByCategoryIdHostUserId,
        params
      )
      const { data } = await $axios.get<IArticleListResult>(url)

      return data.result
    },
  }
  return categoryModule
}
