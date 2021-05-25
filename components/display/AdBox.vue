<template>
  <div class="advertis-container">
    <a
      :target="adSource.url ? '_blank' : '_self'"
      :href="adSource.url || 'javascript:void(0)'"
    >
      <img
        :src="adSource.smallImageUrl || adSource.smallImage2Url"
        width="100%"
        :height="adHeight + 'px'"
        alt="ad"
      />
    </a>
  </div>
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
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  display: flex;

  & > a {
    display: block;
    flex: 1;
  }
}
</style>
