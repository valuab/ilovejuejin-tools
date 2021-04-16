/**
 * api 公共类型
 */
import { POST_RADIO_TYPE } from '~/enums/content'

// 文章详情
export interface IStepList {
  id: number
  forumId: number
  showVideoUrl: string
  url: string
}
// 文章栏目类型
export interface IArticleItemType {
  openAllReply: boolean
  postId: string
  id?: string
  forumId: number
  title: string
  userName: string
  itemCategoryName: string
  itemKeywordName?: string
  smallImageUrl: string
  publishTime: string
  totalViewCount?: number
  commentCount?: number
  videoNum?: number
  stepList: Array<IStepList>
}

// 分类&kol文章列表
export interface IArticleList {
  list: IArticleItemType[]
  total: number
  typeId: POST_RADIO_TYPE | string
  page: number
  listLoad: boolean
}

// 评论数据结构
export interface ICommentList {
  list: IArticleItemType[]
  total: number
  page: number
  listLoad: boolean
}
