<template>
  <aside v-if="newListByHostUserId.list.length" class="post">
    <div class="post-title">最近发表</div>
    <div
      v-for="item in newListByHostUserId.list"
      :key="item.postId"
      class="post-msg"
      @click="navDetails(item.postId, item.forumId)"
    >
      <div class="post-msg-img">
        <img :src="item.smallImageUrl" alt="" />
        <Icon icon="NavKol" size="12"></Icon>
      </div>
      <div class="post-msg-text">
        <div class="post-msg-text-name">{{ item.title }}</div>
        <div class="post-msg-text-data">
          <div class="post-msg-text-data-time">{{ time }}</div>

          <div class="post-msg-text-data-num">
            <Icon icon="ListView" size="12"></Icon>
            <span>{{ item.totalViewCount }}</span>
          </div>

          <div class="post-msg-text-data-num">
            <Icon icon="ListComment" size="12"></Icon>
            <span>{{ item.commentCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="newListByHostUserId.total > 10 && show"
      class="post-more"
      @click="seeMore"
    >
      查看更多
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import { handleTime } from '@/utils/data'

interface IData {
  newListByHostUserId: {
    total: number
    list: any[]
  }
  page: number
  list: any[]
  show: boolean
}

export default defineComponent({
  name: 'ArticlePost',
  props: {
    // 帖子信息
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(props) {
    const { post } = toRefs(props)
    const date = post.value.publishTime.replace(/-/g, '/')
    const postTimeStamp = new Date(date).getTime()
    const time: string = handleTime(postTimeStamp)

    return {
      time,
    }
  },
  data(): IData {
    return {
      newListByHostUserId: {
        total: 0,
        list: [],
      },
      page: 1, // 页码
      list: [],
      show: true,
    }
  },
  async fetch() {
    // 获取最近发表
    const viewUserId = this.$accessor.userInfo.userId
    const newListByHostUserId = await this.$http.posts.getNewListByHostUserId({
      hostUserId: this.$props.post.userId,
      viewUserId,
      page: this.page,
    })

    if (newListByHostUserId.list.length < 10) {
      this.newListByHostUserId.total = newListByHostUserId.total
      this.newListByHostUserId.list = this.newListByHostUserId.list.concat(
        newListByHostUserId.list
      )
    } else {
      this.list = this.list.concat(newListByHostUserId.list)
      newListByHostUserId.list.length = 10
      this.newListByHostUserId.total = newListByHostUserId.total
      this.newListByHostUserId.list = this.newListByHostUserId.list.concat(
        newListByHostUserId.list
      )
    }
  },
  computed: {
    article(): any {
      return Object.assign(
        {
          stepList: [],
        },
        this.post
      )
    },
  },
  methods: {
    /**
     * @description: 跳转详情
     */
    navDetails(id: string, forumId: string) {
      const history = this.$router.resolve(
        `/details?id=${id}&forumId=${forumId}`
      )
      window.open(history.href, '_blank')
    },
    /**
     * @description: 获取数据
     */
    async getNewListByHostUserId() {
      const viewUserId = this.$accessor.userInfo.userId
      const newListByHostUserId = await this.$http.posts.getNewListByHostUserId(
        {
          hostUserId: this.$props.post.userId,
          viewUserId,
          page: this.page,
        }
      )

      this.newListByHostUserId.total = newListByHostUserId.total
      this.newListByHostUserId.list = this.newListByHostUserId.list.concat(
        newListByHostUserId.list
      )
    },
    /**
     * @description: 查看更多
     */
    seeMore() {
      this.newListByHostUserId.list.length = 0
      this.newListByHostUserId.list = this.newListByHostUserId.list.concat(
        this.list
      )
      this.show = false
    },
  },
})
</script>
<style lang="scss" scoped>
.post {
  display: flex;
  width: 295px;
  flex-direction: column;

  &-title {
    @include text(20px, #000000, bold);
  }

  &-msg {
    display: flex;

    &-img {
      width: 120px;
      height: 68px;
      margin-right: 10px;
      overflow: hidden;

      > img {
        width: 100%;
        height: 100%;
      }
    }

    &-text {
      display: flex;
      flex: 1;
      flex-direction: column;

      &-name {
        @include text(14px, #000000);

        margin-bottom: 10px;
        line-height: 20px;
      }

      &-data {
        display: flex;
        margin-top: auto;

        &-time {
          @include text(12px, #717171);

          flex: 1;
        }

        &-num {
          @include text(12px, #999999);

          display: flex;
          align-items: center;

          :nth-child(2) {
            margin-right: 10px;
          }

          > span {
            margin-left: 5px;
          }
        }
      }
    }
  }

  &-more {
    display: flex;
    width: 295px;
    height: 40px;
    background-color: #f5f5f5;
    align-items: center;
    justify-content: center;
    @include text(16px, #666666);
  }

  > * {
    // 子间距为4px
    margin-bottom: 20px;
  }
}
</style>
