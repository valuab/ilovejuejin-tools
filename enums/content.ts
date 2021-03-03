// 最新推荐&全部出品
export enum NEW_LIST_TYPE {
  NEW_RECOMMEND = 1,
  ALL_YIELD = 2,
}

// 搜索类型
export enum SEARCH_TYPE {
  ALL = 1, // default
  ITEM = 2, // 分类搜索
  LABEL = 3, // 标签搜索
  HOST = 4, // 主持人搜索
  CAR = 5, // 搜索车型
}

// kol&节目&分类 文章选择
export enum POST_RADIO_TYPE {
  IMAGE_POST = 0,
  VIDEO_POST = 1,
}

// 帖子类型
export enum PROT_TYPE_TYPEID {
  BIG_WORK = 2, // 大作帖或者随手分享
  CAR_TALK = 19, // 车言论帖子
  VIDEO = 20,
  ASK = 10, // 小视频帖
  ASK_ALL = 24, // 问大咖
}
