<template>
  <a target="_blank" :href="adSource.url" class="advertis-container">
    <img
      :src="adSource.smallImageUrl || adSource.smallImage2Url"
      width="100%"
      :height="adHeight + 'px'"
      alt="ad"
    />
  </a>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IAdListType } from '@apiPublic/modules/adList'

export default defineComponent({
  name: 'AdBox',
  props: {
    adSource: {
      type: Object as PropType<IAdListType>,
      default: {},
    },
    adHeight: {
      // 广告位高度
      type: Number,
      default: 0,
    },
  },
})
</script>
<style lang="scss" scoped>
.advertis-container {
  max-width: 1240px;
  padding: 40px 0 0;
  margin: 0 auto;
  display: block;
}
</style>
