<template>
  <div class="none">
    <icon icon="ArticleListNone" size="100"></icon>
    <span>暂无出品</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'GlobalEmpty',
})
</script>
<style lang="scss" scoped>
.none {
  margin-top: 50px;
  @include flex(column, center, center);
  @include text($font-size-base, #cccccc);

  & > span {
    margin-top: 20px;
  }
}
</style>
