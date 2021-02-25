<template>
  <div class="error-wrap">
    <h1 class="error-title">404</h1>
    <p class="error-content">很抱歉，您访问的页面不存在或已被删除</p>
    <nuxt-link class="error-btn" to="/">去首页</nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'blog',
})
</script>
<style lang="scss" scoped>
.error-wrap {
  margin: 200px auto 0;
  text-align: center;

  .error-title {
    margin-bottom: 16px;
    line-height: 1;

    @include text(60px, #333);
  }

  .error-content {
    margin-bottom: 48px;

    @include text(16px, #666);
  }

  .error-btn {
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: $primary-color;
    border-radius: 4px;
    color: #fff;
  }
}
</style>
