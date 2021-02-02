<template>
  <div>
    <h2 class="column-title" :style="{ justifyContent: 'space-between' }">
      我们的KOL
      <toggle
        v-if="toggle.ifToggle"
        :disabled-left="toggle.disabledLeft"
        :disabled-right="toggle.disabledRight"
        @clickLeft="toggle.onTolggleBtn"
        @clickRight="toggle.onTolggleBtn"
      />
    </h2>
    <div ref="listContainer" class="kol-list-container">
      <div
        ref="listBox"
        class="kol-list-box"
        :style="{ left: `${toggle.styleLeft}px` }"
      >
        <div
          v-for="(listItem, listIndex) in kolList"
          :key="listIndex"
          class="kol-list-wrap"
        >
          <a v-for="(item, index) in listItem" :key="index" class="kol-item">
            <a-avatar :size="30"></a-avatar>
            <strong class="kol-name">{{ item }}</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  PropType,
} from '@nuxtjs/composition-api'
import type { ToggleType } from '~/components/operate/Toggle.vue'
import useToggleShowOrHide from '~/hooks/useToggleShowOrHide'
import useMoveContainerPosition from '~/hooks/useMoveContainerPosition'

export default defineComponent({
  name: 'KolList',
  props: {
    kolList: {
      type: Array as PropType<Array<Array<string>>>,
      default: [[]],
    },
  },
  setup() {
    const offsetX: number = 170
    const listBox = ref<any>(null)
    const listContainer = ref<any>(null)
    const toggle = reactive({
      ifToggle: useToggleShowOrHide(listContainer, listBox),
      disabledLeft: true,
      disabledRight: false,
      styleLeft: 0,
      onTolggleBtn(direction: ToggleType) {
        let currentOffset = toggle.styleLeft
        switch (direction) {
          case 'Left':
            currentOffset += offsetX
            break
          case 'Right':
            currentOffset += -offsetX
            break
          default:
            break
        }

        handleToggleBtnDisable(currentOffset)
      },
    })

    /**
     * 处理 toggle 是否禁止
     */
    const handleToggleBtnDisable = (currentOffset: number) => {
      const { offset, disabledLeft, disabledRight } = useMoveContainerPosition(
        listContainer,
        listBox,
        currentOffset
      )
      toggle.styleLeft = offset
      toggle.disabledLeft = disabledLeft
      toggle.disabledRight = disabledRight
    }

    return {
      toggle,
      listBox,
      listContainer,
    }
  },
})
</script>
<style lang="scss" scoped>
.column-title {
  padding-top: 40px;
  margin-bottom: 20px;
  line-height: 1;
  @include flex(row, center);
  @include text($font-size-heading, #000, bold);
}

// kol
.kol-list-container {
  width: 170px;
  overflow: hidden;

  .kol-list-box {
    position: relative;
    display: flex;
    transition: all 0.5s linear;

    .kol-list-wrap {
      width: 170px;
      min-height: 320px;
      padding: 20px;
      background-color: #fff;
      border: solid 1px #e6e6e6;
      flex-shrink: 0;
      flex-wrap: wrap;
      @include flex(column, space-between);

      .kol-item {
        margin-bottom: 20px;
        color: #000;
        box-sizing: border-box;
        @include flex(row, center);
        @include hoverColor($primary-color);

        .kol-name {
          padding-left: 10px;
        }
      }

      .kol-item:last-child {
        margin: 0;
      }
    }
  }
}
</style>
