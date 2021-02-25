<template>
  <menu-container class="menu-container">
    <!-- 输入组件 -->
    <div class="search-content">
      <SearchInput :keyword="keyword" @search="search" />
    </div>
    <!-- 详情 -->
    <h2 v-if="typeList.length" class="column-title">
      飞度
      <div class="tag">车型</div>
      <router-link class="column-title-nav" to="/toAll">查看全部 ></router-link>
    </h2>
    <article-list
      v-if="typeList.length"
      class="article-list"
      :list="typeList"
    />
    <!-- 全部 -->
    <h2 v-if="allList.length" class="column-title">全部出品</h2>
    <article-list v-if="allList.length" class="article-list" :list="allList" />
    <!--  -->
    <!-- 需要添加异步 -->
    <SearchError v-if="!typeList.length && !allList.length" />
  </menu-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SearchInput from '@/components/search/SearchInput.vue'
import SearchError from '@/components/search/SearchError.vue'
import ArticleList from '@/components/display/ArticleList.vue'
import { IArticleList } from '@/typings/post'

// 参数列表 // 标记
const TYPE = ['ALL', 'ITEM', 'LABEL', 'HOST', 'CAR']

interface IData {
  allList: IArticleList[]
  typeList: IArticleList[]
}

export default defineComponent({
  name: 'Search',
  components: {
    SearchInput,
    SearchError,
    ArticleList,
  },
  async asyncData({ app, route }) {
    const params = route.params
    const headerData = localStorage.getItem('headerData') || '{}'
    const viewUserId = JSON.parse(headerData)?.uid || 0

    const keyword = params.keyword // 搜索关键字

    let categoryId: number, keywordId: number, hostUserId: number
    switch (params.name) {
      case TYPE[1]:
        categoryId = Number(params.categoryId)
        await app.$http.search.getSearchByItemCategoryId({
          keyword,
          categoryId,
          viewUserId,
        })
        break
      case TYPE[2]:
        keywordId = Number(params.keywordId)
        await app.$http.search.getSearchByItemKeywordId({
          keyword,
          keywordId,
          viewUserId,
        })
        break
      case TYPE[3]:
        hostUserId = Number(params.hostUserId)
        await app.$http.search.searchByHostUserId({
          keyword,
          hostUserId,
          viewUserId,
        })
        break
      case TYPE[4]:
        categoryId = Number(params.categoryId)
        keywordId = Number(params.keywordId)
        hostUserId = Number(params.hostUserId)

        await app.$http.search.searchByCars({
          keyword,
          categoryId,
          keywordId,
          hostUserId,
          viewUserId,
        })
        break
      default:
        break
    }

    // 获取全部搜索
    const allList = await app.$http.search.getSearchAll({
      keyword,
      viewUserId,
    })

    return {
      allList,
    }
  },

  data(): IData {
    return {
      allList: [], // 全部文章列表
      typeList: [], // 搜索类型文章列表
    }
  },
  methods: {
    search(e: any) {
      console.log(e)
    },
  },
})
</script>

<style lang="scss" scoped>
.menu-container::v-deep .slot-wrap {
  margin: 0 0 !important;
}

.search-content {
  width: 100%;
  min-height: 88px;
  padding: 20px 0 20px 20px;
  background: #fff;
  align-items: center;
  justify-content: center;
}

.column-title {
  padding-top: 40px;
  padding-left: 20px;
  margin-bottom: 20px;
  line-height: 1;

  @extend .flex-row-vertical-center;

  @include text($font-size-heading, #000, bold);

  .tag {
    height: 20px;
    padding-left: 10px;

    @extend .flex-row-vertical-center;

    @include text($font-size-heading, #666);
    @include hoverColor(#333);
  }

  &-nav {
    height: 20px;
    padding-left: 10px;

    @extend .flex-row-vertical-center;

    @include text($font-size-base, #666);
    @include hoverColor(#333);
  }
}
</style>
