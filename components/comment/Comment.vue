<template>
  <article class="comment">
    <img :src="comment.smallUserIconUrl" class="comment-profile" />
    <article class="comment-msg">
      <div class="comment-user">
        <div class="comment-user-name">{{ comment.userName }}</div>
        <div class="comment-user-author">作者</div>
        <div class="comment-user-time">{{ comment.createTime }}</div>
      </div>
      <p class="comment-content">
        {{ comment.content }}
      </p>
      <div class="comment-handle">
        <div class="comment-handle-support" @click="support">
          <img src="" class="comment-handle-support-img" />
          <div>点赞</div>
        </div>
        <div class="comment-handle-answer" @click="reply">回复</div>
      </div>
      <CommentInput v-if="isReply" />
    </article>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CommentInput from '@/components/comment/CommentInput.vue'

export default defineComponent({
  name: 'Comment',
  components: {
    CommentInput,
  },
  props: {
    comment: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  emits: ['reply'],
  data() {
    return {
      isReply: false,
    }
  },
  methods: {
    /**
     * @description: 回复评论
     */
    reply() {
      // 判断登录态
      // 调出评论
    },
    /**
     * @description: 点赞
     */
    support() {
      // 判断登录态
      if (this.$accessor.userInfo.userId === 0) {
        // 调取登录弹窗
        this.$accessor.global.showLoginPopUpOrHide()
        return
      }
      const { commentId, contentId, shardId, shardTypeId } = this.$props.comment
      this.$http.comment.supportComment({
        commentId,
        contentId,
        shardId,
        shardTypeId,
      })
    },
  },
})
</script>
<style lang="scss" scoped>
.comment {
  display: flex;
  width: 100%;

  &-profile {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 50%;
  }

  &-msg {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  &-user {
    display: flex;
    height: 20px;
    align-items: center;

    &-name {
      @include text(12px, #333333);
    }

    &-author {
      display: flex;
      width: 24px;
      height: 12px;
      background-color: #fff0e6;
      border-radius: 2px;
      align-items: center;
      justify-content: center;

      @include text(10px, #ff8022);
    }

    &-time {
      @include text(10px, #666666);
    }

    > * {
      // 子间距为4px
      margin-right: 4px;
    }
  }

  &-content {
    @include text(14px, #000000);

    line-height: 24px;
  }

  &-handle {
    display: flex;
    height: 20px;
    align-items: center;

    @include text(12px, #666666);

    &-support {
      display: flex;
      margin-right: 16px;
      align-items: center;

      &-img {
        width: 20px;
        height: 20px;
        margin-right: 4px;
      }
    }

    &-answer {
      display: flex;
      align-items: center;
    }
  }

  > * {
    // 子间距为4px
    margin-bottom: 4px;
  }
}
</style>
