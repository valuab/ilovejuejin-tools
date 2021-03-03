<template>
  <header class="header">
    <!-- 文章标题部分 -->
    <h1 class="title">{{ post.title }}</h1>
    <p class="article-msg">{{ post.createTime }} · 浏览 {{ post.viewCount }}</p>
  </header>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ArticleHeader',
  components: {},
  props: {
    // 帖子数据
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
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
