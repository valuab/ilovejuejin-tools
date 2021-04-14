<template>
  <!-- 居中 -->
  <Article :posts="post" :query="query" />
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
    id: string
    forumId: string
    videoType?: Boolean
    videoUrl?: string
  }
}

/**
 * 参数 id 帖子id
 * 参数 forumId  栏目id
 */
export default defineComponent({
  name: 'Details',
  layout: 'container',
  async asyncData({ app, route }) {
    const query = Object.assign(
      {
        id: '',
        forumId: '',
        videoType: true,
      },
      route.query
    )
    const viewUserId = app.$accessor.userInfo.userId

    // 获取帖子对象
    const post = await app.$http.posts.getPost({
      id: String(query.id),
      forumId: Number(query.forumId),
      viewUserId,
    })

    // 遍历取第一条 //或者根据视频位置id取链接
    for (const i in post.stepList.reverse()) {
      if (post.stepList[i].url || post.stepList[i].showVideoUrl) {
        if (query.step === post.stepList[i].step.toString()) {
          query.videoUrl = post.stepList[i].url || post.stepList[i].showVideoUrl
          // 腾讯视频
          if (post.stepList[i].qqVid) {
            query.qqVid = post.stepList[i].qqVid
          }
        } else {
          query.videoUrl = post.stepList[i].url || post.stepList[i].showVideoUrl
          // 腾讯视频
          if (post.stepList[i].qqVid) {
            query.qqVid = post.stepList[i].qqVid
          }
        }
      }
    }

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
