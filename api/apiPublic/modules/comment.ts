/**
 * 评论相关接口
 */
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'

const commentLink = {
  getNewsCommentList: '/api/comment/getNewsCommentList', // 搜索全部
  getNewCommentReplyList: '/api/comment/getNewCommentReplyList', // 分类搜索
  supportComment: '/api/comment/supportComment', // 标签搜索
  postComment: '/api/comment/postComment', // 主持人搜索
}

/**
 * 参数约束 START
 */
interface INewsCommentListParmas {
  id: number
  typeId: number
  sort: number
  page: number
}
interface INewCommentReplyListParmas {
  id: number
  contentId: number
  sort: number
}
interface ISupportCommentParmas {
  commentId: number
  contentId: number
  shardId: number
  shardTypeId: number
}
interface IPostCommentParmas {
  commentId: number
  contentId: number
  shardId: number
  content: string
  djcarsmid: number
}

/**
 * 参数约束 END
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
export interface NewCommentReplyListResult extends IApiResult {
  result: IApiCommentDto
}
export interface SupportCommentResult extends IApiResult {
  result: number
}
export interface PostCommentResult extends IApiResult {
  result: number
}
/**
 * 输出解耦 END
 */

export interface ICommentModule {
  getNewsCommentList(
    params: INewsCommentListParmas
  ): Promise<NewsCommentListResult['result']>
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
    async getNewsCommentList(params) {
      const url = handleUrlParams(commentLink.getNewsCommentList, params)
      const { data } = await $axios.get<NewsCommentListResult>(url)

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

      return data.result
    },
  } as ICommentModule
}
