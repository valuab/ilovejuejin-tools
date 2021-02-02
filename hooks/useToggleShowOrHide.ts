import { ref, onMounted, Ref } from '@nuxtjs/composition-api'

/**
 * 初始化判断当前 toggle 按钮是否显示
 */
const useToggleShowOrHide = (
  containerRef: Ref<null | HTMLElement>,
  scrollViewRef: Ref<null | HTMLElement>
) => {
  const showToggleBtn = ref(false)
  const handleTolggleBtnState = () => {
    const containerWidth = scrollViewRef.value?.offsetWidth || 0
    const scrollViewWidth = containerRef.value?.scrollWidth || 0
    // 判断切换按钮是否显示
    if (scrollViewWidth > containerWidth) {
      showToggleBtn.value = true
    } else {
      showToggleBtn.value = false
    }
  }
  onMounted(() => {
    handleTolggleBtnState()
  })

  return showToggleBtn
}

export default useToggleShowOrHide
