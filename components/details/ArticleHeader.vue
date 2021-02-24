<template>
  <header class="header">
    <!-- 文章标题部分 -->
    <h1 class="title">榜上有名，这三部车凭什么？</h1>
    <p class="article-msg">3小时前 · 浏览 78238</p>
  </header>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ArticleHeader',
  components: {},
})
</script>
<style lang="scss" scoped>
.header {
  margin-bottom: 40px;

  .title {
    margin-bottom: 10px;
    font-size: 40px;
    line-height: 60px;
    color: #000;
  }

  .article-msg {
    font-size: 14px;
    line-height: 14px;
    color: #666;
  }
}
</style>
