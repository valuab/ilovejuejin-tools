<template>
  <div class="container">
    <div class="box">
      <div class="header">
        <h2>王牌节目推荐</h2>
        <Toggle
          v-if="toggle.ifToggle"
          :disabled-left="toggle.disabledLeft"
          :disabled-right="toggle.disabledRight"
          @clickLeft="toggle.onTolggleBtn"
          @clickRight="toggle.onTolggleBtn"
        ></Toggle>
      </div>
      <div ref="listContainer" class="list-container">
        <div
          ref="listBox"
          class="list-box"
          :style="{ left: `${toggle.styleLeft}px` }"
        >
          <figure
            v-for="(item, index) in list"
            :key="index"
            class="list-item"
            @click="navDetail(item.id)"
          >
            <img :src="item.smallImageUrl" alt="图片加载失败" srcset="" />
            <figcaption>{{ item.name }}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  PropType,
  ref,
} from '@nuxtjs/composition-api'

import { ITopicListType } from '@/api/apiPublic/modules/categoryDetail'
// import { useRouter } from 'vue-router'

import Toggle from '@/components/operate/Toggle.vue'

import type { ToggleType } from '@/components/operate/Toggle.vue'
import useToggleShowOrHide from '@/hooks/useToggleShowOrHide'
import useMoveContainerPosition from '@/hooks/useMoveContainerPosition'

export default defineComponent({
  name: 'Recommend',
  components: {
    Toggle,
  },
  props: {
    list: {
      type: Array as PropType<Array<ITopicListType>>,
      default: [],
    },
  },
  setup() {
    /** ***** TOGGLE START ******************/
    const offsetX: number = 420
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
    // /** ***** TOGGLE END ******************/
    // const router = useRouter()
    // /**
    //  * @description: 跳转节目详情
    //  */
    function navDetail(id: number) {
      console.log(id)
      // router.push({ name: 'TopicDetail', params: { id } })
    }
    return {
      navDetail,
      toggle,
      listBox,
      listContainer,
    }
  },
})
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  background-color: #f5f5f5;

  .box {
    display: flex;
    width: 1280px;
    height: 406px;
    padding: 0 20px;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;

    .header {
      display: flex;
      margin-bottom: 20px;
      justify-content: space-between;

      h2 {
        @include text($font-size-heading, #000000, bold);
      }
    }

    .list-container {
      width: 1240px;
      overflow: hidden;

      .list-box {
        position: relative;
        display: flex;
        transition: all 0.5s linear;

        .list-item {
          cursor: pointer;
        }

        & > figure {
          margin-right: 20px;
          & > img {
            width: 190px;
            height: 254px;
          }

          & > figcaption {
            margin-top: 16px;

            @include text($font-size-lg, #000000);
          }
        }
      }
    }
  }
}
</style>
