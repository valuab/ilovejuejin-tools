<template>
  <article class="commentInput">
    <div v-if="isLogin" class="commentInput-table">
      <input value="" class="commentInput-input" />
      <button type="button" class="commentInput-button">发布评论</button>
    </div>
    <div v-else class="commentInput-table">
      <div class="commentInput-input">
        <div class="login-error">登录后可发表评论</div>
        <div class="login">登录</div>
      </div>
      <button type="button" class="commentInput-button">发布评论</button>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CommentInput',
  data() {
    return {
      isLogin: false,
    }
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
