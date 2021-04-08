/**
 * @description: 生成微博链接
 * @param title string 页面标题
 * @param pathname string 页面名
 * @param origin string 域名
 * @param search string 参数
 * @param pic string 图片链接
 */
export const getWeiboUrl = (title: string, link: string, pic?: string) => {
  if (pic) {
    return `http://v.t.sina.com.cn/share/share.php?url=${link}&title=${title}&content=utf-8&pic=${pic}&appkey=1589128892`
  } else {
    return `http://v.t.sina.com.cn/share/share.php?url=${link}&title=${title}&content=utf-8&appkey=1589128892`
  }
  // https://service.weibo.com/share/share.php?url=https://www.djcars.cn/share/videoDetail?search=forumId-2_id-16177527120003281_columnId-0_columnDescription-_jump-1&title=%E5%A6%82%E6%9E%9C15%E4%B8%87%E4%B8%8D%E8%83%BD%E4%B9%B0%E6%B2%B9%E8%BD%A6%EF%BC%8C%E6%88%91%E6%83%B3%E8%AF%95%E8%AF%95%E5%AE%83%E4%BB%AC&content=utf-8&appkey=1589128892
}

/**
 * @description: 生成微博链接
 */
