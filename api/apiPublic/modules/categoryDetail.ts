import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'
import { IArticleItemType } from '~/utils/type'

const userLinks = {
  getOpItemCategory: '/api/category/getOpItemCategory', // 获取分类对象
  getItemListByCategoryId: '/api/category/getItemListByCategoryId', // 获取分类王牌节目推荐
  getHostListByCategoryId: '/api/category/getHostListByCategoryId', // 获取分类主持人列表
  getListByCategoryIdHostUserId: '/api/user/getListByCategoryIdHostUserId', // 获取内容分类帖子列表
}

interface ICategoryParams {
  id: string
}

interface ICategoryUserParams {
  categoryId: string
}

interface IArticleListParams {
  categoryId: string
  hostUserId: number
  viewUserId?: string
  typeId?: string
}

export interface ICategoryDetailResult extends IApiResult {
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

export interface IArticleListResult extends IApiResult {
  result: {
    total: number
    list: Array<IArticleItemType>
  }
}

export interface ICategoryModule {
  getOpItemCategory({
    id,
  }: ICategoryParams): Promise<ICategoryDetailResult['result']>
  getItemListByCategoryId({
    categoryId,
  }: ICategoryUserParams): Promise<ITopicListResult['result']>
  getHostListByCategoryId({
    categoryId,
  }: ICategoryUserParams): Promise<IUserListResult['result']>
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
      const url = handleUrlParams(userLinks.getOpItemCategory, params)
      const { data } = await $axios.get<ICategoryDetailResult>(url)

      return data.result
    },

    async getItemListByCategoryId(params) {
      const url = handleUrlParams(userLinks.getItemListByCategoryId, params)
      const { data } = await $axios.get<ITopicListResult>(url)

      return data.result
    },

    async getHostListByCategoryId(params) {
      const url = handleUrlParams(userLinks.getHostListByCategoryId, params)
      const { data } = await $axios.get<IUserListResult>(url)

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
