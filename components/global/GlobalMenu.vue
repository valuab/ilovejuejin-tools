<template>
  <a-menu class="menu-wrap">
    <a-menu-item key="home" class="menu-item flex-row-vertical-center">
      <icon icon="NavHome"></icon>
      <span class="menu-item-title">首页</span>
    </a-menu-item>
    <a-menu-item-group>
      <template #title>
        <div class="menu-item flex-row-vertical-center">
          <icon icon="NavStar"></icon>
          <span class="menu-item-title">王牌节目</span>
        </div>
      </template>
      <a-menu-item
        v-for="commend in commendList"
        :key="commend.id"
        class="group-menu-item"
        >{{ commend.name }}</a-menu-item
      >
    </a-menu-item-group>
    <a-menu-item-group>
      <template #title>
        <div class="menu-item flex-row-vertical-center">
          <icon icon="NavSort"></icon>
          <span class="menu-item-title">内容分类</span>
        </div>
      </template>
      <a-menu-item key="5" class="group-menu-item">垃圾栏目</a-menu-item>
      <a-menu-item key="6" class="group-menu-item">垃圾栏目</a-menu-item>
      <a-menu-item key="7" class="group-menu-item">垃圾栏目</a-menu-item>
      <a-menu-item key="8" class="group-menu-item">垃圾栏目</a-menu-item>
    </a-menu-item-group>
    <a-menu-item-group>
      <template #title>
        <div class="menu-item flex-row-vertical-center">
          <icon icon="NavKol"></icon>
          <span class="menu-item-title">我们的KOL</span>
        </div>
      </template>
      <a-menu-item key="9" class="group-menu-item">垃圾栏目</a-menu-item>
      <a-menu-item key="10" class="group-menu-item">垃圾栏目</a-menu-item>
      <a-menu-item key="11" class="group-menu-item">垃圾栏目</a-menu-item>
      <a-menu-item key="12" class="group-menu-item">垃圾栏目</a-menu-item>
      <a-menu-item key="13" class="group-menu-item">垃圾栏目</a-menu-item>
      <a-menu-item key="14" class="group-menu-item">垃圾栏目</a-menu-item>
      <a-menu-item key="15" class="group-menu-item">垃圾栏目</a-menu-item>
      <a-menu-item key="16" class="group-menu-item">垃圾栏目</a-menu-item>
      <a-menu-item key="17" class="group-menu-item">垃圾栏目</a-menu-item>
    </a-menu-item-group>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalMenu',
  computed: {
    commendList() {
      return this.$accessor.layouts.commendList
    },
  },
})
</script>
<style lang="scss" scope>
.menu-wrap {
  position: fixed;
  left: 0;
  width: 160px;
  height: 91.5vh;
  padding: 10px 0;
  overflow-y: scroll;
  border-right: 1px solid #e6e6e6;
  box-sizing: border-box;

  @include scrollHover;

  .menu-item-title {
    margin-left: 8px;

    @include text($font-size-lg, $heading-color, 600);
  }

  .group-menu-item {
    margin-left: 16px;
  }

  .anticon {
    margin-right: 0;
  }
}
// 去掉选中颜色
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #fff;
}
</style>
