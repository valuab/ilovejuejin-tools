/**
 * 帖子相关接口
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'
import { IArticleItemType } from '~/typings/post'

const postLinks = {
  getPost: '/api//post/getPost', // 帖子对象
  getItemListByHostUserId: '/api/post/getItemListByHostUserId', // 最近发表
  updateViewCountForAsync: '/api/post/updateViewCountForAsync', // 帖子浏览量更新
  supportPost: '/api/post/supportPost', // 帖子点赞
}

/**
 * 参数约束 START
 */
interface IPostParams {
  id: number
  forumId: number
  viewUserId: number
}

interface INewListByHostParams {
  hostUserId: number
  viewUserId: number
}

interface IPdateParams {
  id: number
  forumId: number
}
interface ISupportParams {
  postId: number
  forumId: number
}

/**
 * 参数约束 END
 */

/**
 * 输出解耦 START
 */
interface IBuPostStep {
  id: number
  forumId: number
  modeId: number
  typeId: number
  topicId: number
  userId: number
}

/**
 * 帖子相关输出结构
 */
export interface IPostResult extends IApiResult {
  result: {
    id: number
    forumId: number
    modeId: number
    typeId: number
    topicId: number
    userId: number
    title: string
    content: string
    imageNum: number
    videoNum: number
    voiceNum: number
    auditId: number
    auditReason: String
    commentCount: number
    supportCount: number
    lastSupportTime: number
    shareCount: number
    reportCount: number
    favouriteCount: number
    publishTime: number
    timeTip: String
    viewCount: number
    wxViewCount: number
    totalViewCount: number

    createTime: string
    createBy: string
    isFavourite: number
    longCreateTime: number
    topicName: string
    userName: string
    wxThirdLogo: string
    smallUserIconUrl: string
    userInviteText: string
    kol: number
    red: number
    smallImageUrl: string
    stepList: Array<IBuPostStep>

    nickname: string
    description: string
  }
}

/**
 * 最近发表输出结构
 */
export interface IPostHost extends IApiResult {
  result: {
    total: number
    list: Array<IArticleItemType>
  }
}

/**
 * 帖子浏览量更新
 */
export interface IUpdate extends IApiResult {
  result: number
}

/**
 * 帖子点赞
 */
export interface ISupportPost extends IApiResult {
  result: number
}

/**
 * 输出解耦 END
 */

export interface IPostModule {
  getPost(params: IPostParams): Promise<IPostResult['result']>
  getItemListByHostUserId(
    params: INewListByHostParams
  ): Promise<IPostHost['result']>
  updateViewCountForAsync(parmas: IPdateParams): Promise<IUpdate['result']>
  supportPost(parmas: ISupportParams): Promise<ISupportPost['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  return {
    async getPost(params) {
      const url = handleUrlParams(postLinks.getPost, params)
      const { data } = await $axios.get<IPostResult>(url)

      return data.result
    },

    async getItemListByHostUserId(params) {
      const url = handleUrlParams(postLinks.getItemListByHostUserId, params)
      const { data } = await $axios.get<IPostHost>(url)

      return data.result
    },

    async updateViewCountForAsync(params) {
      const url = handleUrlParams(postLinks.updateViewCountForAsync, params)
      const { data } = await $axios.get<IUpdate>(url)

      return data.result
    },

    async supportPost(params) {
      const url = handleUrlParams(postLinks.supportPost, params)
      const { data } = await $axios.get<ISupportPost>(url)

      return data.result
    },
  } as IPostModule
}
