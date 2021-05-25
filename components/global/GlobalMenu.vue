<template>
  <a-menu class="menu-wrap">
    <a-menu-item
      key="home"
      class="menu-item-group menu-item flex-row-vertical-center"
    >
      <nuxt-link to="/">
        <icon icon="NavHome"></icon>
        <span class="menu-item-title">首页</span>
      </nuxt-link>
    </a-menu-item>
    <a-menu-item-group
      v-for="(groupItem, index) in menuGroupList"
      :key="groupItem.id"
      class="menu-item-group"
    >
      <template #title>
        <div class="menu-item flex-row-vertical-center">
          <icon :icon="groupItem.icon"></icon>
          <span class="menu-item-title">{{ groupItem.title }}</span>
        </div>
      </template>
      <a-menu-item
        v-for="menuItem in groupItem.list"
        :key="menuItem.id"
        class="group-menu-item"
      >
        <nuxt-link
          class="text-hidden-1"
          :to="{ name: groupItem.page, params: { id: menuItem.id } }"
          >{{ menuItem.name }}</nuxt-link
        >
      </a-menu-item>
      <a-menu-item
        v-if="rawDataList[index].length > 5"
        class="group-menu-item"
        @click="onUnfoldMenuGroup(index)"
      >
        <a-button class="all-btn" type="link">
          {{ groupItem.unfold ? '收起全部' : '展开全部' }}
          <icon
            icon="NavTriangle"
            size="12"
            :rotate="groupItem.unfold ? `180` : `0`"
          ></icon>
        </a-button>
      </a-menu-item>
    </a-menu-item-group>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalMenu',
  data() {
    const commendList = this.$accessor.layouts.commendList
    const opItemCategoryList = this.$accessor.layouts.opItemCategoryList
    const kolList = this.$accessor.layouts.kolList

    return {
      rawDataList: [commendList, opItemCategoryList, kolList],
      menuGroupList: [
        {
          id: 0,
          title: '王牌节目',
          icon: 'NavStar',
          list: commendList.slice(0, 5),
          page: 'topic-id',
          unfold: false,
        },
        {
          id: 1,
          title: '内容分类',
          icon: 'NavSort',
          list: opItemCategoryList.slice(0, 5),
          page: 'category-id',
          unfold: false,
        },
        {
          id: 2,
          title: '我们的KOL',
          icon: 'NavKol',
          list: kolList.slice(0, 5),
          page: 'kol-id',
          unfold: false,
        },
      ],
    }
  },
  methods: {
    onUnfoldMenuGroup(index: number) {
      const rawDataList = this.rawDataList
      const unfold = !this.menuGroupList[index].unfold
      this.menuGroupList[index].unfold = unfold
      this.menuGroupList[index].list = unfold
        ? rawDataList[index]
        : rawDataList[index].slice(0, 5)
    },
  },
})
</script>
<style lang="scss" scoped>
.menu-wrap {
  position: fixed;
  left: 0;
  width: 160px;
  height: 91.5vh;
  padding: 10px 0;
  border-right: 1px solid #e6e6e6;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  z-index: 10;

  @include scrollHover;

  &:hover {
    overflow-y: scroll;
  }

  .menu-item-group {
    width: 144px;

    .menu-item-title {
      margin-left: 8px;
      white-space: nowrap;

      @include text($font-size-lg, $heading-color, 600);
    }

    .group-menu-item {
      margin-left: 16px;

      .all-btn {
        border: none;
        padding: 0;

        @include flex(row, flex-start, center);
        @include text(12px, #666);
      }
    }

    .anticon {
      margin-right: 0;
    }
  }
}
// 去掉选中颜色
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #fff;
  a {
    color: #000;
  }
}
</style>
