<template>
  <div class="mask-container" :style="style" @click.stop="hide">
    <div class="mask-box" @click.stop="stop">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  unref,
} from '@nuxtjs/composition-api'

export type directionType = 'Center' | 'Top'

export default defineComponent({
  name: 'PopupMask',
  props: {
    // 内容居中方向
    direction: {
      type: String,
      default: 'Center',
    },

    // 是否显示顶部header
    showHeader: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['hide'],
  setup(props, context) {
    /** ** 布局设置START *****/
    const { direction, showHeader } = toRefs(props)

    let alignItems: String = ''
    switch (unref(direction)) {
      case 'Center':
        alignItems = 'Center'
        break
      case 'Top':
        alignItems = 'Start'
        break
      default:
        alignItems = 'Stretch'
        break
    }
    const style = reactive({
      top: unref(showHeader) ? '80px' : '0px',
      alignItems,
    })
    /** ** 布局设置END *****/

    /**
     * @description: 关闭弹窗
     */
    function hide() {
      context.emit('hide')
    }

    /**
     * @description: 拦截冒泡
     */
    function stop() {
      return false
    }

    return {
      hide,
      stop,
      style,
    }
  },
})
</script>
<style lang="scss" scoped>
.mask-container {
  position: fixed;
  left: 0;
  z-index: 100;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: $popup-bg;
  justify-content: center;
}
</style>
