/**
 * 帖子类型
 */

// 文章栏目类型
export interface IArticleItemType {
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
  typeId: string
  page: number
  listLoad: boolean
}
