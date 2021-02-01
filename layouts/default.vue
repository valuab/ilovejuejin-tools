<template>
  <a-layout class="root-container" has-sider>
    <a-layout-header class="header">
      <global-header></global-header>
      <nuxt />
    </a-layout-header>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
})
</script>
<style lang="scss">
.root-container {
  background: #fff;

  .header {
    height: 80px;
    padding: 0;
    background: #fff;
  }
}
</style>
