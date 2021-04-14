<template>
  <!-- 居中 -->
  <Article :posts="post" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

// 参数列表 // 标记

interface IData {
  post: {
    title: string
    content: string
  }
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
  layout: 'container',
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
      post: {
        title: '',
        content: '',
      },
      query: {
        id: '',
        forumId: '',
      },
    }
  },
  head() {
    const title = this.post.title as string
    const { content }: any = this.post
    const description = content.slice(0, 50)
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: title,
        },
      ],
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
}
</style>
