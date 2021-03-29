/**
 * @description: 生成微博链接
 * @param title string 页面标题
 * @param pathname string 页面名
 * @param origin string 域名
 * @param search string 参数
 * @param pic string 图片链接
 */
export const getWeiboUrl = (
  title: string,
  pathname: string,
  origin: string,
  search: string,
  pic?: string
) => {
  const link = `${origin}/share/${pathname}?search=${search}`
  if (pic) {
    return `http://v.t.sina.com.cn/share/share.php?url=${link}&title=${title}&content=utf-8&pic=${pic}&appkey=1589128892`
  } else {
    return `http://v.t.sina.com.cn/share/share.php?url=${link}&title=${title}&content=utf-8&appkey=1589128892`
  }
}

/**
 * @description: 生成微博链接
 */
