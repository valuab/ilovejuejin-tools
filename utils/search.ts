/**
 * 搜索处理
 */

/**
 * @description: 修改搜索历史
 */
export const setSearchHistory = (value: string) => {
  return new Promise<void>((resolve) => {
    const localHistory: string | null = window.localStorage.getItem(
      'searchHistory'
    )
    let history = localHistory ? JSON.parse(localHistory) : []
    history.unshift(value)
    history = [...new Set(history)]
    if (history.length > 100) {
      history = history.slice(0, 100)
    }
    localStorage.setItem('searchHistory', JSON.stringify(history))
    resolve()
  })
}

/**
 * @description: 获取搜索历史
 */
export const getSearchHistory = () => {
  const localHistory: string | null = window.localStorage.getItem(
    'searchHistory'
  )
  return localHistory ? JSON.parse(localHistory) : []
}

/**
 * @description: 清空搜索历史
 */
export const deleteHistory = () => {
  window.localStorage.removeItem('searchHistory')
}
