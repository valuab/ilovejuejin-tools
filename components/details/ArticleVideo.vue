<template>
  <div class="ArticleVideo">
    <iframe
      v-if="isQqvideo"
      frameborder="0"
      :src="url"
      allowFullScreen="true"
      class="video"
      width="100%"
      height="100%"
    ></iframe>
    <video v-else :src="videoUrl" class="video" controls="controls"></video>
    <ArticleVideoShare :post="post" @support="support" />
    <p class="videoWord">
      <span v-for="item in post.stepList" :key="item.id">{{
        item.content
      }}</span>
    </p>
    <nuxt-link
      class="videoSee"
      :to="{ name: 'details', query: { id: post.id, forumId: post.forumId } }"
      target="_blank"
      >查看内容详情 ></nuxt-link
    >
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
    isQqvideo: Boolean,
  },
  emits: ['support'],
  data() {
    return {
      url: '', // 腾讯视频
    }
  },
  fetch() {
    const qqVideoUrl = 'https://v.qq.com/txp/iframe/player.html'
    const urlParams = this.$props.videoUrl.split('?')[1]
    const url = `${qqVideoUrl}?${urlParams}`

    this.url = url
  },
  methods: {
    support() {
      this.$props.post.isSupport = 1
      this.$props.post.supportCount++
      this.$emit('support')
    },
  },
})
</script>
<style lang="scss" scoped>
.video {
  width: 100%;
  height: calc(780px * 0.5625);
  max-height: 500px;
}

.videoWord {
  margin: 20px 0 12px;
  font-size: 16px;
  line-height: 32px;
  @include text-multi(2);
}

.videoSee {
  height: 14px;
  font-size: 14px;
  line-height: 14px;
  color: #666;
  cursor: pointer;
  display: block;
  margin-bottom: 20px;
  white-space: normal;
}
</style>
