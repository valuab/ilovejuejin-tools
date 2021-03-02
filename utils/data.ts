/**
 * 处理数据模块
 */
import moment from 'moment'

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

/**
 * @description: 修改发文时间
 * @param postTimeStamp 时间戳
 */
export const handleTime = (postTimeStamp: number): string => {
  const nowTimeStamp = new Date().getTime()
  const publishTime = moment(postTimeStamp).locale('zh-cn')
  let time: string = ''

  if (publishTime.year() < moment().year()) {
    time = publishTime.format('YYYY-MM-DD')
  } else if (nowTimeStamp - postTimeStamp > 7 * 24 * 60 * 60 * 60) {
    time = publishTime.format('MM-DD')
  } else if (nowTimeStamp - postTimeStamp > 60 * 60 * 60) {
    time = publishTime.fromNow()
  } else {
    time = '刚刚'
  }

  return time
}

/**
 * @description: d多行省略
 * @param str 字符串
 * @param num 最大字节数
 */
export const substrByByte = function (str: string, num: number) {
  let bytesCount = 0
  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i)
    // eslint-disable-next-line no-control-regex
    if (/^[\u0000-\u00FF]$/.test(c)) {
      bytesCount += 1
    } else {
      bytesCount += 2
    }
    if (bytesCount > num) {
      return str.substr(0, i) + '...'
    } else if (bytesCount === num) {
      return str.substr(0, i + 1) + '...'
    }
  }
  return str
}
