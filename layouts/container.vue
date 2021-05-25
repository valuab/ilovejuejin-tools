<template>
  <global-config-provider>
    <a-layout class="root-container">
      <a-layout-header class="header">
        <global-header></global-header>
      </a-layout-header>
      <a-layout class="root-main">
        <a-layout-content class="content-wrap">
          <nuxt />
          <a-layout-footer class="root-footer">
            <global-footer></global-footer>
          </a-layout-footer>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </global-config-provider>
</template>

<script lang="ts" scoped>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Container',
  props: {
    backgroundColor: {
      type: String,
      default: 'rgb(240, 242, 245)',
    },
  },
})
</script>

<style lang="scss" scoped>
.root-container {
  background: #fff;

  .header {
    width: 100%;
    height: auto;
    padding: 0;
    background: #fff;
  }

  .root-main {
    padding-top: 80px;
    min-height: 100vh;
    box-sizing: border-box;
  }

  .content-wrap {
    min-width: 1280px;
    background: #fff !important;
    @include flex(column, space-between, center);

    .root-footer {
      width: 1240px;
      margin: 0 auto;
      padding: 100px 0 0;
      padding-top: 100px;
      background: #fff;
    }
  }
}
</style>
