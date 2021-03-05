<template>
  <div class="ArticleVideo">
    <iframe
      v-if="!post.isMp4"
      frameborder="0"
      :src="post.videoUrl"
      allowFullScreen="true"
    ></iframe>
    <video v-else :src="post.videoUrl"></video>
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
