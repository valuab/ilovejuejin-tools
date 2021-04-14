/**
 * 帖子相关接口
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'
import { IArticleItemType } from '~/api/apiPublic/type'

const postLinks = {
  getPost: '/api/pc/post/getPost', // 帖子对象
  getNewListByHostUserId: '/api/pc/post/getNewListByHostUserId', // 最近发表
  updateViewCountForAsync: '/api/pc/post/updateViewCountForAsync', // 帖子浏览量更新
  supportPost: '/api/pc/post/supportPost', // 帖子点赞
}

/**
 * 参数约束 START
 */
interface IPostParams {
  id: string
  forumId: number
  viewUserId: number
}

interface INewListByHostParams {
  hostUserId: number
  viewUserId: number
  page: number
}

interface IPdateParams {
  id: string
  forumId: number
}
interface ISupportParams {
  postId: string
  forumId: number
}

/**
 * 参数约束 END
 */

/**
 * 输出解耦 START
 */
interface IBuPostStep {
  id: string
  forumId: number
  modeId: number
  typeId: number
  topicId: number
  userId: number
  step: string
  url: string
  showVideoUrl: string
  qqVid: string
}

/**
 * 帖子相关输出结构
 */
export interface IPostResult extends IApiResult {
  result: {
    id: string
    forumId: number
    modeId: number
    typeId: number
    topicId: number
    userId: number
    title: String
    content: String
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

    createTime: String
    createBy: String
    isFavourite: number
    longCreateTime: number
    topicName: String
    userName: String
    wxThirdLogo: String
    smallUserIconUrl: String
    userInviteText: String
    kol: number
    red: number
    smallImageUrl: String
    stepList: Array<IBuPostStep>

    nickname: String
    description: String
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
  result: string
}

/**
 * 帖子点赞
 */
export interface ISupportPost extends IApiResult {
  result: string
}

/**
 * 输出解耦 END
 */

export interface IPostsModule {
  getPost(params: IPostParams): Promise<IPostResult['result']>
  getNewListByHostUserId(
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

    async getNewListByHostUserId(params) {
      const url = handleUrlParams(postLinks.getNewListByHostUserId, params)
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
  } as IPostsModule
}
