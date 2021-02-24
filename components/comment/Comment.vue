<template>
  <article class="comment">
    <img
      src="https://image.djcars.cn/7/377e7fb6-96cc-4099-8f40-b9593878d3db.jpg"
      class="comment-profile"
    />
    <article class="comment-msg">
      <div class="comment-user">
        <div class="comment-user-name">用户名称</div>
        <div class="comment-user-author">作者</div>
        <div class="comment-user-time">5小时前</div>
      </div>
      <p class="comment-content">
        评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容
      </p>
      <div class="comment-handle">
        <div class="comment-handle-suppot">
          <img src="" class="comment-handle-suppot-img" />
          <div>点赞</div>
        </div>
        <div class="comment-handle-answer">回复</div>
      </div>
    </article>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Comment',
  components: {},
  template: ``,
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

    &-suppot {
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
