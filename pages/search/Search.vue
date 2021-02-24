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
// import {
//   getSearchAll,
//   getSearchByItemCategoryId,
//   getSearchByItemKeywordId,
//   getSearchByHostUserId,
//   getSearchByCars,
// } from './search.service'

import ArticleList from '@/components/display/ArticleList.vue'

// 参数列表 // 标记
// const params = [
// 	{
// 		name: 'ALL',
// 		text: '全部',
// 		parmasName: ['keyword'],
// 	},
// 	{
// 		name: 'ITEM',
// 		text: '分类',
// 		parmasName: ['keyword', 'categoryId'],
// 	},
// 	{
// 		name: 'LABEL',
// 		text: '标签',
// 		parmasName: ['keyword', 'keywordId'],
// 	},
// 	{
// 		name: 'HOST',
// 		text: '主持人',
// 		parmasName: ['keyword', 'hostUserId'],
// 	},
// 	{
// 		name: 'CAR',
// 		text: '车型',
// 		parmasName: ['keyword', 'categoryId', 'keywordId', 'hostUserId'],
// 	},
// ]

export default defineComponent({
  name: 'Search',
  components: {
    SearchInput,
    SearchError,
    ArticleList,
  },
  // setup(_props: any, _context: any) {
  //   const route: any = useRoute()
  //   const params = toRefs(route.params) // 参数

  //   const headerData = localStorage.getItem('headerData') || '{}'
  //   const viewUserId = JSON.parse(headerData)?.uid || 0

  //   // 参数类型判断
  //   const keyword = ref(params.keyword) //搜索关键字
  //   let categoryId: number, keywordId: number, hostUserId: number
  //   switch (params.name.value) {
  //     case 'ITEM':
  //       categoryId = params.categoryId.value
  //       break
  //     case 'LABEL':
  //       keywordId = params.keywordId.value
  //       break
  //     case 'HOST':
  //       hostUserId = params.hostUserId.value
  //       break
  //     case 'CAR':
  //       categoryId = params.categoryId.value
  //       keywordId = params.keywordId.value
  //       hostUserId = params.hostUserId.value
  //       break
  //     default:
  //       break
  //   }

  //   const allList = ref(new Array())
  //   const typeList = ref(new Array())
  //   const getData = async () => {
  //     const searchAll: any = await getAllList() //搜索全部

  //     let { list } = searchAll.result
  //     allList.value = allList.value.concat(list)

  //     switch (params.name.value) {
  //       case 'ITEM':
  //         const searchCategory: any = await getSearchByItemCategoryIdList()
  //         typeList.value = searchCategory.result.list
  //         break
  //       case 'LABEL':
  //         const searchByItemKeyword: any = await getSearchByItemKeywordIdList()
  //         typeList.value = searchByItemKeyword.result.list
  //         break
  //       case 'HOST':
  //         const searchByHostUser: any = await getSearchByHostUserIdList()
  //         typeList.value = searchByHostUser.result.list
  //         break
  //       case 'CAR':
  //         const searchByCars: any = await getSearchByCarsList()
  //         typeList.value = searchByCars.result.list
  //         break
  //       default:
  //         break
  //     }
  //   }

  //   // 获取全部
  //   const getAllList = async (page: number = 1) => {
  //     return getSearchAll(keyword.value, viewUserId, page)
  //   }

  //   // 搜索栏目
  //   const getSearchByItemCategoryIdList = async () => {
  //     return getSearchByItemCategoryId(keyword.value, categoryId, viewUserId)
  //   }

  //   // 搜索获取标签搜索帖子列表
  //   const getSearchByItemKeywordIdList = async () => {
  //     return getSearchByItemKeywordId(keyword.value, keywordId, viewUserId)
  //   }

  //   // 主持人搜索
  //   const getSearchByHostUserIdList = async () => {
  //     return getSearchByHostUserId(keyword.value, hostUserId, viewUserId)
  //   }
  //   // 搜索车型
  //   const getSearchByCarsList = async () => {
  //     return getSearchByCars(
  //       keyword.value,
  //       categoryId,
  //       keywordId,
  //       hostUserId,
  //       viewUserId
  //     )
  //   }

  //   getData()
  //   return {
  //     keyword, //搜索字段

  //     allList, //全部数据
  //     typeList, // 类型数据

  //     getData, // f
  //     getAllList, // f
  //     getSearchByItemCategoryIdList, // f
  //     getSearchByItemKeywordIdList, // f
  //     getSearchByHostUserIdList, // f
  //     getSearchByCarsList, // f
  //   }
  // },
  methods: {
    // search(e: any) {
    //   // console.log(e)
    // },
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
