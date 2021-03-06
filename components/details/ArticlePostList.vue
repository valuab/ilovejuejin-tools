<template>
  <aside v-if="newListByHostUserId.list.length" class="post">
    <div class="post-title">最近发表</div>
    <div
      v-for="item in newListByHostUserId.list"
      :key="item.postId"
      class="post-msg"
    >
      <div class="post-msg-img">
        <img :src="item.smallImageUrl" alt="" />
      </div>
      <div class="post-msg-text">
        <div class="post-msg-text-name">{{ item.title }}</div>
        <div class="post-msg-text-data">
          <div class="post-msg-text-data-time">{{ item.publishTime }}</div>
          <div class="post-msg-text-data-num">{{ item.totalViewCount }}</div>
        </div>
      </div>
    </div>
    <div class="post-more" @click="seeMore">查看更多</div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

interface IData {
  newListByHostUserId: {
    total: number
    list: any[]
  }
  page: number
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
    this.newListByHostUserId.total = newListByHostUserId.total
    this.newListByHostUserId.list = this.newListByHostUserId.list.concat(
      newListByHostUserId.list
    )
  },
  computed: {
    article(): any {
      return Object.assign(
        {
          stepList: [],
        },
        this.posts
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
      if (
        this.newListByHostUserId.list.length <
        Number(this.newListByHostUserId.total)
      ) {
        this.getNewListByHostUserId()
      }
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

        &-time {
          @include text(12px, #717171);

          flex: 1;
        }

        &-num {
          @include text(12px, #999999);

          display: flex;
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
