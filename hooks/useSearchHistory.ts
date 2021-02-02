import { reactive } from '@nuxtjs/composition-api'

// 历史搜索
const useSearchHistory = () => {
  const localHistory = localStorage.getItem('searchHistory')
  const history = localHistory
    ? reactive<Array<string>>(JSON.parse(localHistory))
    : reactive<Array<string>>([])

  /**
   * @description: 增加历史搜索
   */
  const useSearch = (value: string) => {
    return new Promise<void>((resolve) => {
      if (!value) return
      history.unshift(value)

      localStorage.setItem('searchHistory', JSON.stringify(history))
      resolve()
    })
  }

  /**
   * @description: 清空历史搜索
   */
  const removeHistory = () => {
    history.splice(0, history.length)
    localStorage.removeItem('searchHistory')
  }

  return {
    history,
    useSearch,
    removeHistory,
  }
}

export default useSearchHistory
