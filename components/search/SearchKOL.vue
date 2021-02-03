<template>
  <div class="KOL-container">
    <a-avatar :size="60"></a-avatar>
    <div class="right">
      <p>YYP颜宇鹏</p>
      <p>1191篇评测 ></p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SearchKOL',
})
</script>
<style lang="scss" scoped>
.KOL-container {
  display: flex;
  align-items: center;

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
