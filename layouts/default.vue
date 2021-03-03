<template>
  <global-config-provider>
    <a-layout class="root-container">
      <a-layout-header class="header">
        <global-header></global-header>
      </a-layout-header>
      <a-layout class="root-main" :has-sider="true">
        <a-layout-sider width="160px" theme="light">
          <global-menu></global-menu>
        </a-layout-sider>
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
    padding: 80px 0 0;
    min-height: 100vh;
    box-sizing: border-box;
  }

  .content-wrap {
    display: flex;
    flex-direction: column;
    min-height: 90vh;

    .root-footer {
      width: 100%;
      max-width: 1240px;
      padding: 100px 0 0;
      margin: auto auto 0;
    }
  }
}
</style>
