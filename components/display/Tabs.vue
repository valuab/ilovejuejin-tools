<template>
  <div class="tabs-wrap">
    <div class="tabs">
      <div
        class="tabs-tab tabs-tab-heading"
        :class="{
          'tabs-tab-active':
            tabsReactive.activeKey === tabsReactive.headTab.key,
        }"
        @click="tabsReactive.onTabActive(tabsReactive.headTab.key, $event)"
      >
        {{ tabsReactive.headTab.title }}
      </div>
      <div class="line"></div>
      <div ref="subWrapRef" class="tabs-sub-wrap">
        <div
          ref="tabsScrollViewRef"
          class="tabs-scroll-view"
          :style="{ left: `${toggleReactive.tabsScrollOffset}px` }"
        >
          <div
            v-for="tabItem in tabsReactive.subTabs"
            :key="tabItem.key"
            class="tabs-tab"
            :class="{
              'tabs-tab-active': tabsReactive.activeKey === tabItem.key,
            }"
            @click="tabsReactive.onTabActive(tabItem.key, $event)"
          >
            {{ tabItem.title }}
          </div>
        </div>
      </div>
      <div class="tabs-toggle-wrap">
        <toggle
          v-if="toggleReactive.showToggleBtn"
          :disabled-left="toggleReactive.disabledToggleLeft"
          :disabled-right="toggleReactive.disabledToggleRight"
          @clickLeft="toggleReactive.onTolggleBtn"
          @clickRight="toggleReactive.onTolggleBtn"
        />
      </div>
    </div>
    <div class="tabs-slot">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  reactive,
  toRefs,
} from '@nuxtjs/composition-api'
import { ToggleType } from '~/components/operate/Toggle.vue'
import useToggleShowOrHide from '~/hooks/useToggleShowOrHide'
import useMoveContainerPosition from '~/hooks/useMoveContainerPosition'

export interface ITabItem {
  title: string
  key: string | number
}

export default defineComponent({
  name: 'Tabs',
  props: {
    tabs: {
      type: Array as PropType<ITabItem[]>,
      required: true,
    },
    offset: {
      type: Number,
      default: 150,
    },
  },
  emits: {
    tabActive: null,
  },
  setup(props, context) {
    const tabsScrollViewRef = ref<null | HTMLElement>(null)
    const subWrapRef = ref<null | HTMLElement>(null)
    const { tabs } = toRefs(props)
    const tabsReactive = reactive({
      headTab: tabs.value[0],
      subTabs: tabs.value.slice(1),
      activeKey: tabs.value[0].key,
      onTabActive(key: string | number, e: MouseEvent) {
        const curTabItem = e.target as HTMLElement
        tabsReactive.activeKey = key
        handleTabItemPosition(curTabItem)
        context.emit('tabActive', key)
      },
    })
    const toggleReactive = reactive({
      showToggleBtn: useToggleShowOrHide(subWrapRef, tabsScrollViewRef),
      tabsScrollOffset: 0,
      disabledToggleLeft: true,
      disabledToggleRight: false,
      onTolggleBtn(direction: ToggleType) {
        let currentOffset = toggleReactive.tabsScrollOffset
        switch (direction) {
          case 'Left':
            currentOffset += props.offset
            break
          case 'Right':
            currentOffset += -props.offset
            break
          default:
            break
        }

        handleToggleBtnDisable(currentOffset)
      },
    })

    /**
     * 处理 tab 点击移动
     */
    const handleTabItemPosition = (tabItem: HTMLElement) => {
      const offsetWidth = tabItem.offsetWidth
      const offsetLeft = tabItem.offsetLeft + offsetWidth
      const scrollLeft = Math.abs(toggleReactive.tabsScrollOffset)
      const scrollViewWidth = (tabsScrollViewRef.value as HTMLElement)
        .offsetWidth
      const scrollPosition = scrollViewWidth + scrollLeft
      const itemPosition = scrollViewWidth + offsetLeft
      const diffWidth = itemPosition - scrollPosition
      let currentOffset = toggleReactive.tabsScrollOffset

      if (diffWidth > scrollViewWidth) {
        const scrollTargetLeft = diffWidth - scrollViewWidth
        currentOffset += -scrollTargetLeft
      }
      if (diffWidth < offsetWidth) {
        const scrollTargetLeft = offsetWidth - diffWidth
        currentOffset += scrollTargetLeft
      }

      handleToggleBtnDisable(currentOffset)
    }
    /**
     * 处理 toggle 是否禁止
     */
    const handleToggleBtnDisable = (currentOffset: number) => {
      const { offset, disabledLeft, disabledRight } = useMoveContainerPosition(
        subWrapRef,
        tabsScrollViewRef,
        currentOffset
      )
      toggleReactive.tabsScrollOffset = offset
      toggleReactive.disabledToggleLeft = disabledLeft
      toggleReactive.disabledToggleRight = disabledRight
    }

    return {
      tabsReactive,
      toggleReactive,
      tabsScrollViewRef,
      subWrapRef,
    }
  },
})
</script>
<style lang="scss" scoped>
.tabs {
  height: 64px;
  border-bottom: 1px solid #e6e6e6;

  @include flex;

  .line {
    width: 1px;
    height: 18px;
    margin-top: 24px;
    margin-right: 20px;
    background-color: #e6e6e6;
  }

  .tabs-sub-wrap {
    flex: auto;
    overflow: hidden;

    .tabs-scroll-view {
      position: relative;
      transition: left 0.3s;

      @include flex;
    }
  }

  .tabs-toggle-wrap {
    width: 100px;
    height: 100%;
    margin-left: 20px;

    @include flex(row, center, center);
  }

  .tabs-tab {
    flex: none;
    height: 64px;
    margin-right: 20px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.2s;

    &-active {
      font-weight: bold;
      color: $primary-color;
      border-bottom: 4px solid $primary-color;
    }

    &:hover {
      color: $primary-color;
    }
  }

  .tabs-tab-heading {
    z-index: 1;
    font-size: $font-size-heading;
  }
}
</style>
