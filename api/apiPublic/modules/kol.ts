/**
 * 用户相关接口
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'
import { IArticleItemType } from '~/api/apiPublic/type'

const userLinks = {
  getUsrInfo: '/api/pc/user/getUsrInfo', // 获取单个用户对象
  getItemListByHostUserId: '/api/pc/user/getItemListByHostUserId', // 获取王牌节目推荐
  getListByHostUserId: '/api/pc/user/getListByHostUserId', // 获取KOL内容分类列表
  getNewListByHostUserId: '/api/pc/post/getNewListByHostUserId', // 获取KOL内容分类列表
  getListByCategoryIdHostUserId: '/api/pc/user/getListByCategoryIdHostUserId', // 获取内容分类帖子列表
}

interface IUserInfoParams {
  userId: number
}
export interface IUserInfoResult extends IApiResult {
  result: {
    userId: number
    kol: number
    nickname: string
    introduction: string
    smallImageUrl: string
  }
}

interface ITopicListParams {
  hostUserId: string
}
export interface ITopicListType {
  id: number
  smallImageUrl: string
  name: string
}
export interface ITopicListResult extends IApiResult {
  result: {
    total: number
    list: Array<ITopicListType>
  }
}

interface ICategoryListParams {
  userId: string
}
export interface ICategoryListType {
  id: number
  name: string
  userName: string
  itemKeywordName: string
  itemCategoryName: string
  title: string
  imageUrl: string
  smallImageUrl: string
  totalViewCount: string
  publishTime: string
  userId: number
  commentCount: number
  forumId: number
  postId: number
}

export interface ICategoryListResult extends IApiResult {
  result: {
    total: number
    list: Array<ICategoryListType>
  }
}

interface INewArticleListParams {
  hostUserId: string
  viewUserId?: number
  typeId?: number | string
  page: number
}

interface IArticleListParams {
  categoryId: number
  hostUserId: string
  page: number
  viewUserId?: number
  typeId?: number | string
}
export interface IArticleListResult extends IApiResult {
  result: {
    total: number
    list: Array<IArticleItemType>
  }
}

export interface IKolModule {
  getUserInfo(params: IUserInfoParams): Promise<IUserInfoResult['result']>
  getItemListByHostUserId(
    params: ITopicListParams
  ): Promise<ITopicListResult['result']>
  getListByHostUserId(
    params: ICategoryListParams
  ): Promise<ICategoryListResult['result']>
  getNewListByHostUserId(
    params: INewArticleListParams
  ): Promise<IArticleListResult['result']>
  getListByCategoryIdHostUserId(
    params: IArticleListParams
  ): Promise<IArticleListResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const kolModule: IKolModule = {
    async getUserInfo(params) {
      const url = handleUrlParams(userLinks.getUsrInfo, params)
      const { data } = await $axios.get<IUserInfoResult>(url)

      return data.result
    },

    async getItemListByHostUserId(params) {
      const url = handleUrlParams(userLinks.getItemListByHostUserId, params)
      const { data } = await $axios.get<ITopicListResult>(url)

      return data.result
    },

    async getListByHostUserId(params) {
      const url = handleUrlParams(userLinks.getListByHostUserId, params)
      const { data } = await $axios.get<ICategoryListResult>(url)

      return data.result
    },

    async getNewListByHostUserId(params) {
      const url = handleUrlParams(userLinks.getNewListByHostUserId, params)
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
  return kolModule
}
