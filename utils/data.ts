/**
 * 处理数据模块
 */

// 拼接url
export const handleUrlParams = <T extends Object, K extends keyof T>(
  url: string,
  params: T
): string => {
  const keys = Object.keys(params)
  const handledUrl = keys.reduce((pre: string, cur, idx) => {
    const key = cur as K
    pre += idx === 0 ? `${url}?${key}=${params[key]}` : `&${key}=${params[key]}`
    return pre
  }, '')

  return handledUrl
}
