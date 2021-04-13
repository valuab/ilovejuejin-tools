<template>
  <article class="commentInput">
    <div v-if="isLogin" class="commentInput-table">
      <input
        v-model="comment"
        class="commentInput-input"
        placeholder="请输入评论内容："
        @keyup.enter="send()"
      />
      <a-button
        type="primary"
        :loading="loading"
        class="commentInput-button"
        @click="send()"
      >
        发布评论
      </a-button>
    </div>
    <div v-else class="commentInput-table">
      <div class="commentInput-input">
        <div class="login-error">登录后可发表评论</div>
        <LoginButton class="login" @click="showLoginPopUp"> 登录 </LoginButton>
      </div>
      <a-button
        type="button"
        class="commentInput-button"
        @click="showLoginPopUp"
      >
        发布评论
      </a-button>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CommentInput',
  props: {
    commentValue: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
  emits: ['send'],
  data() {
    return {
      isLogin: false,
      comment: this.$props.commentValue,
      loading: false,
    }
  },
  fetch() {
    // 判断登录
    if (this.$accessor.userInfo.isLogin) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  watch: {
    userId(newName) {
      this.userId = newName
      if (this.userId !== 0) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
  },
  methods: {
    /**
     * @description: 发布内容
     */
    showLoginPopUp() {
      this.$accessor.global.showLoginPopUpOrHide()
    },
    /**
     * @description: 发布内容
     */
    send() {
      if (!this.$accessor.global.isCommentType) {
        this.$message.error('提交太频繁，请稍等 10 秒后再尝试！O(∩_∩)O')
        return
      }
      this.$accessor.global.allowComment(false)
      // 十秒后允许评论
      if (!this.comment) return
      if (!this.comment.trim()) return
      this.loading = true
      this.$emit('send', this.comment)
      this.comment = ''
      setTimeout(() => {
        this.loading = false
      }, 1000)
      setTimeout(() => {
        this.$accessor.global.allowComment(true)
      }, 10000)
    },
  },
})
</script>
<style lang="scss" scoped>
.commentInput {
  &-table {
    display: flex;
    width: 100%;
    align-items: center;
  }

  &-input {
    display: flex;
    height: 40px;
    padding: 0 16px;
    margin-right: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
    box-sizing: border-box;
    flex: 1;
    align-items: center;

    .login {
      display: flex;
      width: 48px;
      height: 24px;
      background-color: #ff8022;
      border-radius: 2px;
      align-items: center;
      justify-content: center;

      @include text(14px, #ffffff);

      &-error {
        @include text(14px, #666666);

        margin-right: 8px;
        line-height: 40px;
      }
    }
  }

  &-button {
    display: flex;
    width: 80px;
    height: 40px;
    background-color: #ff8022;
    border: 0;
    border-radius: 4px;
    align-items: center;
    justify-content: center;

    @include text(14px, #ffffff);
  }
}
</style>
