<template>
  <header class="header">
    <!-- 文章标题部分 -->
    <h1 class="title">{{ post.title }}</h1>
    <p class="article-msg">
      {{ time }}{{ isViewCount ? ' · 浏览 ' + post.totalViewCount : '' }}
    </p>
  </header>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref } from '@nuxtjs/composition-api'
import { handleTime } from '@/utils/data'

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
  setup(props) {
    const { post } = toRefs(props)
    const isViewCount = ref(true)
    const date = post.value.publishTime.replace(/-/g, '/')
    const postTimeStamp = new Date(date).getTime()
    const time: string = handleTime(postTimeStamp)
    isViewCount.value =
      new Date().getTime() - postTimeStamp >= 24 * 60 * 60 * 1000

    return {
      time,
      isViewCount,
    }
  },
})
</script>
<style lang="scss" scoped>
.header {
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
