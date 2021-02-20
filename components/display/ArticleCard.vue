<template>
  <figure class="container" @click="navDetail">
    <img class="img" :src="item.smallImageUrl" alt="图片加载失败" />
    <span v-if="item.itemKeywordName" class="column-tag">{{
      item.itemKeywordName
    }}</span>
    <figcaption>
      <cite>
        <p class="tag">{{ item.itemCategoryName }}</p>
        <p class="name">{{ item.title }}</p>
      </cite>
      <aside>
        <div>
          <p>{{ item.userName }}</p>
          <p>{{ time }}</p>
        </div>
        <div>
          <p>
            <Icon icon="ListView" :size="'10'"></Icon
            ><span>{{ item.totalViewCount }}</span>
          </p>
          <p>
            <Icon icon="ListComment" :size="'10'"></Icon
            ><span>{{ item.commentCount }}</span>
          </p>
        </div>
      </aside>
    </figcaption>
  </figure>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
// import { useRouter } from 'vue-router'
// import { handleTime } from '@/utils/data'
// import moment from 'moment'

export default defineComponent({
  name: 'ContentCard',
  props: {
    item: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        smallImageUrl:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        itemCategoryName: 'test',
        itemKeywordName: 'test',
        title: 'test',
        userName: 'test',
        totalViewCount: 'test',
        commentCount: 'test',
      },
    },
  },
  setup() {
    // const { item } = toRefs(props)
    // const router = useRouter()
    // const publishTime = new Date(item.value.publishTime).getTime()

    // const time = handleTime(publishTime)
    const time = ''
    return {
      time,
    }
  },
  methods: {
    navDetail() {
      // const history = this.$router.resolve({name: '/TopicDetail')
    },
  },
})
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  width: 295px;
  height: 312px;
  margin: 0;
  // overflow: hidden;
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
