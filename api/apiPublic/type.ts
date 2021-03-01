/**
 * api 公共类型
 */
import { POST_RADIO_TYPE } from '~/enums/content'

// 文章栏目类型
export interface IArticleItemType {
  postId: string
  forumId: number
  title: string
  userName: string
  itemCategoryName: string
  itemKeywordName?: string
  smallImageUrl: string
  publishTime: string
  totalViewCount?: number
  commentCount?: number
}

// 分类&kol文章列表
export interface IArticleList {
  list: IArticleItemType[]
  total: number
  typeId: POST_RADIO_TYPE | string
  page: number
  listLoad: boolean
}

// 列表& 搜索

export interface ISearchList {
  list: IArticleItemType[]
  total: number
}
