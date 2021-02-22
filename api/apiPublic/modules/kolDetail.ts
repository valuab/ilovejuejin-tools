import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'
import { IArticleItemType } from '~/utils/type'

const userLinks = {
  getUsrInfo: '/api/user/getUsrInfo', // 获取单个用户对象
  getItemListByHostUserId: '/api/user/getItemListByHostUserId', // 获取王牌节目推荐
  getListByHostUserId: '/api/user/getListByHostUserId', // 获取KOL内容分类列表
  getListByCategoryIdHostUserId: '/api/user/getListByCategoryIdHostUserId', // 获取内容分类帖子列表
}

interface IUserInfoParams {
  userId: string
}

interface ITopicListParams {
  hostUserId: string
}

interface ICategoryListParams {
  userId: string
}

interface IArticleListParams {
  categoryId: string
  hostUserId: number
  viewUserId?: string
  typeId?: string
}

export interface IUserInfoResult extends IApiResult {
  result: {
    name: string
    description: string
    smallImageUrl: string
  }
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

export interface ICategoryListType {
  userId: number
  nickname: string
}

export interface ICategoryListResult extends IApiResult {
  result: {
    total: number
    list: Array<ICategoryListType>
  }
}

export interface IArticleListResult extends IApiResult {
  result: {
    total: number
    list: Array<IArticleItemType>
  }
}

export interface ICategoryModule {
  getOpItemCategory({
    userId,
  }: IUserInfoParams): Promise<IUserInfoResult['result']>
  getItemListByHostUserId({
    hostUserId,
  }: ITopicListParams): Promise<ITopicListResult['result']>
  getListByHostUserId({
    userId,
  }: ICategoryListParams): Promise<ICategoryListResult['result']>
  getListByCategoryIdHostUserId({
    categoryId,
    hostUserId,
    viewUserId,
    typeId,
  }: IArticleListParams): Promise<IArticleListResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const userModule: ICategoryModule = {
    async getOpItemCategory(params) {
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

    async getListByCategoryIdHostUserId(params) {
      const url = handleUrlParams(
        userLinks.getListByCategoryIdHostUserId,
        params
      )
      const { data } = await $axios.get<IArticleListResult>(url)

      return data.result
    },
  }

  return userModule
}
