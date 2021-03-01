<template>
  <default class="menu-container">
    <!-- 输入组件 -->
    <div class="search-content">
      <SearchInput
        :keyword="keyword"
        :type="type"
        :type-name="typeName"
        @search="search"
      />
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
    <h2 v-if="allList.list.length" class="column-title">全部出品</h2>
    <article-list
      v-if="allList.list.length"
      class="article-list"
      :list="allList.list"
    />
    <!--  -->
    <!-- 需要添加异步 -->
    <SearchError v-if="!typeList.length && !allList.list.length" />
  </default>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SearchInput from '@/components/search/SearchInput.vue'
import SearchError from '@/components/search/SearchError.vue'
import ArticleList from '@/components/display/ArticleList.vue'
import { ISearchList } from '@apiPublic/type'
import { SEARCH_TYPE } from '~/enums/content'

// 参数列表 // 标记

interface IData {
  keyword: String
  type: number // 搜索类型
  typeName: String // 搜索类型关键字
  allList: ISearchList[]
  typeList: ISearchList[]
}

export default defineComponent({
  name: 'Search',
  components: {
    SearchInput,
    SearchError,
    ArticleList,
  },
  async asyncData({ app, route }) {
    const query = route.query
    const viewUserId = app.$accessor.userInfo.userId

    const keyword: string = query.keyword as string // 搜索关键字
    const type = Number(query.type) // 搜索关键字

    let categoryId: number, keywordId: number, hostUserId: number
    const typeList = []
    let itemList
    let itemKeyList
    let hostUserList
    let carsList
    switch (type) {
      case SEARCH_TYPE.ITEM:
        categoryId = Number(query.categoryId)
        itemList = await app.$http.search.getSearchByItemCategoryId({
          keyword,
          categoryId,
          viewUserId,
        })
        typeList.push(itemList)
        break
      case SEARCH_TYPE.LABEL:
        keywordId = Number(query.keywordId)
        itemKeyList = await app.$http.search.getSearchByItemKeywordId({
          keyword,
          keywordId,
          viewUserId,
        })
        typeList.push(itemKeyList)
        break
      case SEARCH_TYPE.HOST:
        hostUserId = Number(query.hostUserId)
        hostUserList = await app.$http.search.searchByHostUserId({
          keyword,
          hostUserId,
          viewUserId,
        })
        typeList.push(hostUserList)
        break
      case SEARCH_TYPE.CAR:
        categoryId = Number(query.categoryId)
        keywordId = Number(query.keywordId)
        hostUserId = Number(query.hostUserId)

        carsList = await app.$http.search.searchByCars({
          keyword,
          categoryId,
          keywordId,
          hostUserId,
          viewUserId,
        })
        typeList.push(carsList)
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
      keyword,
      typeList,
      type,
    }
  },

  data(): IData {
    return {
      allList: [], // 全部文章列表
      keyword: '',
      typeList: [], // 搜索类型文章列表
      type: 0,
      typeName: '',
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
