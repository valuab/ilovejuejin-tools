<template>
  <div class="KOL-container">
    <a-avatar :size="60" :src="item.smallImageUrl"></a-avatar>
    <div class="right">
      <p>{{ item.nickname }}</p>
      <p>{{ item.postCount }}篇评测 ></p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IKolListType } from '@apiModules/search'

export default defineComponent({
  name: 'SearchKol',
  props: {
    item: {
      type: Object as PropType<IKolListType>,
      default: () => {
        return {
          smallImageUrl: '',
          nickname: '',
          postCount: 0,
        }
      },
    },
  },
})
</script>
<style lang="scss" scoped>
.KOL-container {
  display: flex;
  align-items: center;

  &:hover {
    color: $link-color;
  }

  & > .right {
    margin-left: 10px;

    p {
      margin: 0;

      @include text($font-size-base, #666666);
    }

    & > p:first-child {
      margin-bottom: 10px;

      @include text($font-size-lg, $heading-color, bold);
    }
  }
}
</style>
