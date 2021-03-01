<template>
  <!-- 居中 -->
  <container class="container">
    <Article :article="article" />
  </container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Article from '@/components/details/Article.vue'

/**
 * 参数 id 帖子id
 * 参数 forumId  栏目id
 */
export default defineComponent({
  name: 'Details',
  components: {
    Article,
  },
  async asyncData({ app, route }) {
    const params = route.params
    const headerData = localStorage.getItem('headerData') || '{}'
    const viewUserId = JSON.parse(headerData)?.uid || 0

    // 获取帖子对象
    const post = await app.$http.posts.getPost({
      id: Number(params.id),
      forumId: Number(params.forumId),
      viewUserId,
    })

    // 获取最近发表
    const getItemListByHostUserId = await app.$http.posts.getItemListByHostUserId(
      {
        hostUserId: post.userId,
        viewUserId,
      }
    )

    // 帖子浏览量更新
    const updateViewCountForAsync = app.$http.posts.updateViewCountForAsync({
      id: Number(params.id),
      forumId: Number(params.forumId),
    })

    // 帖子点赞
    const supportPost = app.$http.posts.supportPost({
      postId: Number(params.id),
      forumId: Number(params.forumId),
    })

    return {
      post,
      getItemListByHostUserId,
      updateViewCountForAsync,
      supportPost,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
}
</style>
