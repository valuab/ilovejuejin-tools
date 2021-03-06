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
    <div class="videoShare"></div>
    <p class="videoWord">
      <span v-for="item in post.stepList" :key="item.id">{{
        item.content
      }}</span>
    </p>
    <p class="videoSee">查看内容详情 ></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ArticleVideo',
  components: {},
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
})
</script>
<style lang="scss" scoped>
.video {
  width: 100%;
  height: 500px;
}

.videoWord {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.videoSee {
  width: 98px;
  height: 14px;
  font-size: 14px;
  line-height: 14px;
  color: #666;
}
</style>
