<template>
  <figure class="container" @click="navDetail(item.postId, item.forumId)">
    <img
      v-lazy="item.smallImageUrl"
      :src="item.smallImageUrl"
      class="img"
      :alt="item.title"
    />
    <span v-if="item.itemKeywordName" class="column-tag">
      {{ item.itemKeywordName }}
    </span>
    <figcaption>
      <cite>
        <p class="tag">{{ item.itemCategoryName }}</p>
        <p class="name">{{ title }}</p>
      </cite>
      <aside>
        <div>
          <p>{{ item.userName }}</p>
          <p>{{ time }}</p>
        </div>
        <div>
          <p v-if="isViewCount">
            <Icon icon="ListView" size="10"></Icon
            ><span>{{ item.totalViewCount }}</span>
          </p>
          <p>
            <Icon icon="ListComment" size="10"></Icon
            ><span>{{ item.commentCount }}</span>
          </p>
        </div>
      </aside>
    </figcaption>
  </figure>
</template>
<script lang="ts">
import {
  defineComponent,
  PropType,
  toRefs,
  watch,
  ref,
} from '@nuxtjs/composition-api'
import { IArticleItemType } from '@/api/apiPublic/type'
import { handleTime, substrByByte } from '@/utils/data'

export default defineComponent({
  name: 'ContentCard',
  props: {
    item: {
      type: Object as PropType<IArticleItemType>,
      default: null,
    },
  },
  setup(props) {
    const { item } = toRefs(props)
    const time = ref('') // 文章时间
    const title = ref('') // 文章标题
    const isViewCount = ref(true) // 阅读数展示
    const dataInit = () => {
      const date = item.value.publishTime.replace(/-/g, '/')
      const postTimeStamp = new Date(date).getTime()
      isViewCount.value =
        new Date().getTime() - postTimeStamp >= 24 * 60 * 60 * 1000
      time.value = handleTime(postTimeStamp)
      title.value = substrByByte(item.value.title, 62)
    }

    dataInit()

    watch(item, () => dataInit())

    return {
      time,
      title,
      isViewCount,
    }
  },
  methods: {
    /**
     * 跳转详情
     * @param id 帖子id
     * @param forumId 帖子forumId
     */
    navDetail(id: string, forumId: number) {
      const history = this.$router.resolve(
        `/details?id=${id}&forumId=${forumId}`
      )
      window.open(history.href, '_blank')
    },
  },
})
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  max-width: 295px;
  height: 312px;
  margin: 0;
  cursor: pointer;
  background-color: #fff;
  border: solid 1px #e6e6e6;
  border-radius: 4px;

  .img {
    height: 166px;
    width: 100%;
  }

  &:hover {
    box-shadow: 0 2px 20px $box-shadow-base;
  }

  & > .column-tag {
    position: absolute;
    top: -4px;
    right: 8px;
    z-index: 3;
    height: 30px;
    padding: 0 8px;
    line-height: 30px;
    text-align: center;
    background-color: $primary-color;

    @include text($font-size-base, #ffffff);

    &::after {
      position: absolute;
      top: 0;
      right: -4px;
      content: '';
      border: {
        right: 4px solid transparent;
        bottom: 4px solid $primary-color;
        left: 4px solid transparent;
      }
    }
  }

  & > figcaption {
    display: flex;
    height: 146px;
    padding: 20px 16px;
    flex-direction: column;
    justify-content: space-between;

    cite {
      font-style: normal;

      .tag {
        @include text($font-size-base, $primary-color, bold);
      }

      .name {
        @include text($font-size-lg, $text-color, bold);

        max-height: 48px;
        overflow: hidden;
      }
    }

    p {
      margin: 0;
    }

    & > aside {
      display: flex;
      justify-content: space-between;

      & > div {
        display: flex;
        align-items: center;

        @include text($font-size-sm, #666666);
      }

      & > div:nth-child(1) {
        p:nth-child(1) {
          margin-right: 8px;
        }
      }

      & > div:nth-child(2) {
        color: #999;

        p {
          display: flex;
          align-items: center;

          span {
            margin-left: 5px;
          }
        }

        p:nth-child(1) {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
