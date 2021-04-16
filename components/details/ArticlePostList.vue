<template>
  <aside v-if="newListByHostUserId.list.length" class="post">
    <div class="post-title">最近发表</div>
    <nuxt-link
      v-for="item in newListByHostUserId.list"
      :key="item.postId"
      class="post-msg"
      :to="{
        name: item.videoNum ? `videoDetails` : `details`,
        query: { id: item.id || item.postId, forumId: item.forumId },
      }"
      target="_blank"
    >
      <div class="post-msg-img">
        <img :src="item.smallImageUrl" alt="" />
      </div>
      <div class="post-msg-text">
        <div class="post-msg-text-name">{{ item.title }}</div>
        <div class="post-msg-text-data">
          <div class="post-msg-text-data-time">{{ item.time }}</div>

          <div v-if="item.isViewCount" class="post-msg-text-data-num">
            <Icon icon="ListView" :size="'12'" />
            <span>{{ item.totalViewCount }}</span>
          </div>

          <div class="post-msg-text-data-num">
            <Icon icon="ListComment" :size="'12'" />
            <span>{{ item.commentCount }}</span>
          </div>
        </div>
      </div>
    </nuxt-link>
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
import { defineComponent } from '@nuxtjs/composition-api'
import { handleTime } from '@/utils/data'

interface IData {
  newListByHostUserId: {
    total: number
    list: any[]
  }
  page: number
  list: any[]
  show: boolean
  isViewCount: boolean
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
  data(): IData {
    return {
      newListByHostUserId: {
        total: 0,
        list: [],
      },
      page: 1, // 页码
      list: [],
      show: true,
      isViewCount: true, // 阅读数展示
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

    // 处理列表阅读数
    this.newListByHostUserId.list.forEach((val) => {
      const date = val.publishTime.replace(/-/g, '/')
      const postTimeStamp = new Date(date).getTime()
      val.time = handleTime(postTimeStamp)
      val.isViewCount =
        new Date().getTime() - postTimeStamp >= 24 * 60 * 60 * 1000

      return val
    })
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
  cursor: pointer;

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
        @include text-multi(2);

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
