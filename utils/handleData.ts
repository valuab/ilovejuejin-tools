const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const formatNumber = (n: any) => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

/**
 * @description: 修改文章显示时间
 * @param time 文章时间戳
 * @returns date 文章时间
 */
export const handleTime = (time: number): string => {
  /**
   * 时间：按全局时间规则显示
   * 1分钟内的显示“刚刚”
   * 1分钟~1小时的显示“n分钟前”
   * 1~24小时的显示“n小时前”
   * 24小时~7天的显示“n天前”
   * 7天后不跨年的显示“月日”
   * 7天后且跨年的显示“年月日”）
   */
  let date: any = time
  let now
  let before
  let year
  if (date) {
    if (date) {
      now = (Date.now() - date) / 1000
      before = new Date()
      year = formatTime(new Date(+date)).slice(0, 4) // 当前年份
      date = new Date(+date)
    } else {
      date = date.replace(/-/g, '/') // 替换兼容ios
      date = new Date(date)
      now = (Date.now() - Date.parse(date)) / 1000
      before = new Date()
      year = formatTime(date).slice(0, 4) // 当前年份
    }
    if (before.getFullYear() - Number(year) >= 1) {
      // 年前
      date = formatTime(date).slice(0, 10)
    } else if (now > 7 * 24 * 60 * 60) {
      // 一周前
      date = formatTime(date).slice(5, 10)
    } else if (now > 24 * 60 * 60) {
      // 一天前
      date = Math.floor(now / (24 * 60 * 60)) + '天前'
    } else if (now > 60 * 60) {
      // 一小时前
      date = Math.floor(now / (60 * 60)) + '小时前'
    } else if (now > 60) {
      // 分钟前
      date = Math.floor(now / 60) + '分钟前'
    } else {
      date = '刚刚'
    }
  }
  return date
}
