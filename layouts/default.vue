<template>
  <a-layout class="root-container">
    <a-layout-header class="header">
      <global-header></global-header>
    </a-layout-header>
    <a-layout class="root-main" :has-sider="true">
      <a-layout-sider width="160px" theme="light">
        <global-menu></global-menu>
      </a-layout-sider>
      <a-layout-content class="content-wrap" v-bind="$attrs">
        <nuxt />
        <a-layout-footer class="root-footer">
          <global-footer></global-footer>
        </a-layout-footer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>
<style lang="scss">
.root-container {
  background: #fff;

  .header {
    width: 100%;
    height: auto;
    padding: 0;
    background: #fff;
  }

  .root-main {
    padding: 80px 0 0;
    min-height: 100vh;
    box-sizing: border-box;
  }

  .content-wrap {
    @include flex(column, space-between, center);

    .root-footer {
      width: 1240px;
      margin: 0 auto;
      padding: 100px 0 0;
    }
  }
}
</style>
