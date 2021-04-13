/**
 * 评论相关接口
 */
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'

const commentLink = {
  getWxSelectCommentList: '/api/pc/comment/getWxSelectCommentList', // 登录评论数据
  getNoLoginWxSelectCommentList:
    '/api/pc/comment/getNoLoginWxSelectCommentList', // 登录评论数据
  getNewCommentReplyList: '/api/pc/comment/getNewCommentReplyList', // 获取回复数据
  supportComment: '/api/pc/comment/supportComment', // 点赞
  postComment: '/api/pc/comment/postComment', // 回复
}

/**
 * 参数约束 START
 */
interface INewsCommentListParmas {
  id: number
  typeId: number
  page: number
}
interface INoLoginWxSelectCommentList {
  id: number
  typeId: number
  page: number
}
interface INewCommentReplyListParmas {
  id: number
  contentId: number
  sort: number
}
interface ISupportCommentParmas {
  commentId: string
  contentId: string
  shardId: string
  shardTypeId: string
}
interface IPostCommentParmas {
  commentId: number
  contentId: number
  shardId: number
  content: string
  djcarsmid: string
}

/**
 * 参数约束 END
 */

/**
 * 列表数据结构 START
 */
export interface IComment {
  id: string
  rootId: string
  parentId: string
  parentUserId: string
  content: string
  userName: string
  smallUserIconUrl: string
  parentName: string
  userId: number
  typeId: number
  contentId: number
  shardId: number
  auditId: number
  createTime: number
  kol: number
  red: number
  userVoteCommentFlag: number
  supportCount: number
  replayCommentDto: IComment
}
/**
 * 列表数据结构 END
 */
/**
 * 输出解耦 START
 */

export interface IApiCommentDto {
  total: number
  list: any[]
}

export interface NewsCommentListResult extends IApiResult {
  result: IApiCommentDto
}
export interface NoLoginWxSelectCommentList extends IApiResult {
  result: IApiCommentDto
}
export interface NewCommentReplyListResult extends IApiResult {
  result: IApiCommentDto
}
export interface SupportCommentResult extends IApiResult {
  result: number
}
export interface PostCommentResult extends IApiResult {
  result?: number
}
/**
 * 输出解耦 END
 */

export interface ICommentModule {
  getWxSelectCommentList(
    params: INewsCommentListParmas
  ): Promise<NewsCommentListResult['result']>
  getNoLoginWxSelectCommentList(
    params: INoLoginWxSelectCommentList
  ): Promise<NoLoginWxSelectCommentList['result']>
  getNewCommentReplyList(
    params: INewCommentReplyListParmas
  ): Promise<NewCommentReplyListResult['result']>
  supportComment(
    params: ISupportCommentParmas
  ): Promise<SupportCommentResult['result']>
  postComment(params: IPostCommentParmas): Promise<PostCommentResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  return {
    async getWxSelectCommentList(params) {
      const url = handleUrlParams(commentLink.getWxSelectCommentList, params)
      const { data } = await $axios.get<NewsCommentListResult>(url)

      return data.result
    },
    async getNoLoginWxSelectCommentList(params) {
      const url = handleUrlParams(commentLink.getWxSelectCommentList, params)
      const { data } = await $axios.get<NoLoginWxSelectCommentList>(url)

      return data.result
    },
    async getNewCommentReplyList(params) {
      const url = handleUrlParams(commentLink.getNewCommentReplyList, params)
      const { data } = await $axios.get<NewCommentReplyListResult>(url)

      return data.result
    },
    async supportComment(params) {
      const url = handleUrlParams(commentLink.supportComment, params)
      const { data } = await $axios.get<SupportCommentResult>(url)

      return data.result
    },
    async postComment(params) {
      const url = handleUrlParams(commentLink.postComment, params)
      const { data } = await $axios.get<PostCommentResult>(url)
      if (data.err) {
        return data
      }
      return data.result
    },
  } as ICommentModule
}
