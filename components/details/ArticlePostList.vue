<template>
  <aside v-show="getNewListByHostUserId" class="post">
    <div class="post-title">最近发表</div>
    <div class="post-msg">
      <div class="post-msg-img">
        <img src="" alt="" />
      </div>
      <div class="post-msg-text">
        <div class="post-msg-text-name">从来没有一台双门车，分量有它重</div>
        <div class="post-msg-text-data">
          <div class="post-msg-text-data-time">1小时前</div>
          <div class="post-msg-text-data-num"></div>
        </div>
      </div>
    </div>
    <div class="post-more" @click="seeMore">查看更多</div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

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
  async fetch() {
    // 获取最近发表
    const viewUserId = this.$accessor.userInfo.userId
    this.getNewListByHostUserId = await this.$http.posts.getNewListByHostUserId(
      {
        hostUserId: this.$props.post.userId,
        viewUserId,
      }
    )
  },
  methods: {
    /**
     * @description: 查看更多
     */
    seeMore() {},
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
