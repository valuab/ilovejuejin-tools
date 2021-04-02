<template>
  <div class="ArticleVideo">
    <iframe
      v-if="post.qqVid"
      frameborder="0"
      :src="videoUrl"
      allowFullScreen="true"
      class="video"
    ></iframe>
    <video v-else :src="videoUrl" class="video" controls="controls"></video>
    <ArticleVideoShare :post="post" />
    <p class="videoWord">
      <span v-for="item in post.stepList" :key="item.id">{{
        item.content
      }}</span>
    </p>
    <a class="videoSee" @click="seeDatails">查看内容详情 ></a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ArticleVideo',
  props: {
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
    videoUrl: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
  methods: {
    seeDatails() {
      // 跳转文章详情
      const id = this.$props.post.id || this.$props.post.postId
      const forumId = this.$props.post.forumId
      const { href } = this.$router.resolve({
        path: `/details?id=${id}&forumId=${forumId}`,
      })
      window.open(href, '_blank')
    },
  },
})
</script>
<style lang="scss" scoped>
.video {
  width: 100%;
  max-height: 500px;
}

.videoWord {
  line-height: 32px;
  @include text-multi(2);
}

.videoSee {
  width: 98px;
  height: 14px;
  font-size: 14px;
  line-height: 14px;
  color: #666;
}
</style>
