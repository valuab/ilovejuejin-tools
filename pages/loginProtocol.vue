<template>
  <div>loginProtocol</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

/**
 * 参数 id 帖子id
 * 参数 forumId  栏目id
 */
export default defineComponent({
  layout: 'container',
  data() {
    return {
      post: {},
      query: {
        id: '',
        forumId: '',
      },
    }
  },
})
</script>
