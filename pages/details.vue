<template>
  <!-- 居中 -->
  <container class="container">
    <Article :posts="post" />
  </container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

// 参数列表 // 标记

interface IData {
  post: Object
  query: {
    id: String
    forumId: String
  }
}

/**
 * 参数 id 帖子id
 * 参数 forumId  栏目id
 */
export default defineComponent({
  name: 'Details',
  layout: 'profile',
  async asyncData({ app, route }) {
    const query = route.query
    const viewUserId = app.$accessor.userInfo.userId

    // 获取帖子对象
    const post = await app.$http.posts.getPost({
      id: String(query.id),
      forumId: Number(query.forumId),
      viewUserId,
    })

    return {
      post,
      query,
    }
  },
  data(): IData {
    return {
      post: {},
      query: {
        id: '',
        forumId: '',
      },
    }
  },
  methods: {
    /**
     * @description: 点赞
     */
    supportPost() {
      const { query } = this
      return this.$http.posts.supportPost({
        postId: query.id,
        forumId: Number(query.forumId),
      })
    },
    updateViewCountForAsync() {
      const { query } = this
      return this.$http.posts.updateViewCountForAsync({
        id: query.id,
        forumId: Number(query.forumId),
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
}
</style>
