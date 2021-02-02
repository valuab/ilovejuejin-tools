import { Ref } from '@nuxtjs/composition-api'

/**
 * 滚动容器 hook
 */
const useMoveContainerPosition = (
  containerRef: Ref<null | HTMLElement>,
  scrollViewRef: Ref<null | HTMLElement>,
  offset: number
) => {
  // 外层容器
  const containerWidth = containerRef.value?.offsetWidth || 0
  // 当前滚动容器
  const scrollViewWidth = scrollViewRef.value?.scrollWidth || 0
  // 当前滚动条宽度
  const offsetScroll = scrollViewWidth - containerWidth
  let disabledLeft = false
  let disabledRight = false

  // 判断是否溢出容器宽度
  if (offset >= 0) {
    offset = 0
    disabledLeft = true
  } else {
    disabledLeft = false
  }

  if (offset <= -offsetScroll) {
    offset = -offsetScroll
    disabledRight = true
  } else {
    disabledRight = false
  }

  return { offset, disabledLeft, disabledRight }
}

export default useMoveContainerPosition
