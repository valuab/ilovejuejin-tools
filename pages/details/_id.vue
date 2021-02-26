<template>
  <!-- 居中 -->
  <container class="container">
    <Article :article="article" />
  </container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Article from '@/components/details/Article.vue'

export default defineComponent({
  name: 'Details',
  components: {
    Article,
  },
  // setup(_props: any, _context: any) {
  //   const route: any = useRoute()
  //   const params = toRefs(route.params) // 参数
  //   const { id, forumId, viewUserId, hostUserId } = params

  //   // 获取帖子
  //   const getPostDetail = async () => {
  //     return getPost(id, forumId, viewUserId)
  //   }
  //   // 最近发表
  //   const getNewListByHostUserIdDetails = async () => {
  //     return getNewListByHostUserId(hostUserId, viewUserId)
  //   }
  //   // 帖子浏览量更新
  //   const updateViewCountForAsyncDetails = async () => {
  //     return updateViewCountForAsync(id, forumId)
  //   }
  //   // 帖子点赞
  //   const supportPostDetails = async () => {
  //     return supportPost(id, forumId)
  //   }

  //   return {
  //     getPostDetail,
  //     getNewListByHostUserIdDetails,
  //     updateViewCountForAsyncDetails,
  //     supportPostDetails,
  //   }
  // },
  // async asyncData({ app, route }) {
  //   const params = route.params
  //   const { id, forumId, viewUserId, hostUserId } = params
  //   const getPostDetail = await app.$http.posts.getPost(
  //     id,
  //   )
  // },
})
</script>

<style lang="scss" scoped>
.container {
  background: #fff;
}
</style>
