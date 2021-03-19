/**
 * @description: 生成微博链接
 */
export const getWeiboUrl = (title: string, pic?: string) => {
  const pathname = window.location.pathname.substr(1)
  const origin = window.location.origin
  let search = window.location.search.substr(1)
  search = search.replace(/&/g, '_').replace(/=/g, '-')
  const link = `${origin}/share/${pathname}?search=${search}`
  if (pic) {
    return `http://v.t.sina.com.cn/share/share.php?url=${link}&title=${title}&content=utf-8&pic=${pic}&appkey=1589128892`
  } else {
    return `http://v.t.sina.com.cn/share/share.php?url=${link}&title=${title}&content=utf-8&appkey=1589128892`
  }
}
