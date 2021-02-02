// api link
export interface ILinkItem {
  url: string
  text: string
}

export type IApiLink = {
  [propName: string]: ILinkItem
}

const ApiLink: IApiLink = {
  // 登录
  thirdLogin: { url: '/pc/thirdLogin', text: '第三方注册登录' },

  // 首页
  getCommendList: { url: '/pc/index/getCommendList', text: '获取王牌节目列表' },
  getNewList: { url: '/pc/index/getNewList', text: '获取最新推荐' },
  getRecommendList: {
    url: '/pc/index/getRecommendList',
    text: '获取精选王牌节目',
  },
  getListByCategoryId: {
    url: '/pc/index/getListByCategoryId',
    text: '获取分类帖子',
  },
  getGuessYouLikeList: {
    url: '/pc/index/getGuessYouLikeList',
    text: '获取猜你喜欢',
  },
  getOpItemCategory: {
    url: '/pc/index/getOpItemCategory',
    text: '获取内容分类',
  },
  getKolList: { url: '/pc/index/getKolList', text: '获取KOL列表' },

  // 搜索
  searchAll: { url: '/pc/search/searchAll', text: '获取搜索全部帖子列表' },
  searchByItemCategoryId: {
    url: '/pc/search/searchByItemCategoryId',
    text: 'searchByItemCategoryId',
  },
  searchByItemKeywordId: {
    url: '/pc/search/searchByItemKeywordId',
    text: '获取标签搜索帖子列表',
  },
  searchByHostUserId: {
    url: '/pc/search/searchByHostUserId',
    text: '主持人搜索',
  },
  searchByCars: { url: '/pc/search/searchByCars', text: '搜索车型' },

  // 王牌节目
  getCommendItemList: {
    url: '/pc/item/getCommendItemList',
    text: '获取王牌节目列表',
  },
  getListByKeywordId: {
    url: '/pc/item/getListByKeywordId',
    text: '获取王牌节目列表页节目',
  },
  getOpItem: { url: '/pc/item/getOpItem', text: '获取单个节目对象' },
  getListByItemId: {
    url: '/pc/item/getListByItemId',
    text: '获取单个节目帖子列表',
  },

  // 内容分类
  getCategoryDetail: {
    url: '/pc/category/getOpItemCategory',
    text: '获取单个分类对象',
  },
  getItemListByCategoryId: {
    url: '/pc/category/getItemListByCategoryId',
    text: '获取内容分类王牌节目推荐列表',
  },
  getHostListByCategoryId: {
    url: '/pc/category/getHostListByCategoryId',
    text: '获取分类主持人列表',
  },

  // KOL主页
  getUsrInfo: { url: '/pc/user/getUsrInfo', text: '获取单个用户对象' },
  getItemListByHostUserId: {
    url: '/pc/user/getItemListByHostUserId',
    text: '获取KOL主页-王牌节目推荐列表',
  },
  getListByHostUserId: {
    url: '/pc/user/getListByHostUserId',
    text: '获取KOL内容分类列表',
  },
  getListByCategoryIdHostUserId: {
    url: '/pc/user/getListByCategoryIdHostUserId',
    text: '获取内容分类或者KOL主页帖子列表',
  },

  // 问题反馈
  getAppVersionList: {
    url: '/pc/feedback/getAppVersionList',
    text: 'app版本列表',
  },
  getFeedbackCategory: {
    url: '/pc/feedback/getFeedbackCategory',
    text: '反馈类型列表',
  },
  createForSite: { url: '/pc/feedback/createForSite', text: '保存反馈' },
  getVerifyImg: { url: '/pc/feedback/show', text: '随机验证码图' },
}

export default ApiLink
