<template>
  <div class="menu-container">
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
      <div v-if="typeList.length > 4" class="column-title-nav" @click="seeAll">
        查看全部 >
      </div>
    </h2>
    <article-list
      v-if="typeList.length"
      class="article-list"
      :list="typeList[0].list"
    />
    <!-- 全部 -->
    <h2 v-if="allList.length" class="column-title">全部出品</h2>
    <article-list
      v-if="allList.length"
      class="article-list"
      :list="allList[searchAllPage].list"
    />

    <!-- 分页 -->
    <Pagination
      v-anchor="'tabsAnchor'"
      :total="allList[searchAllPage].total"
      class="pagination"
      @change="pageChange"
    ></Pagination>
    <!--  -->
    <!-- 需要添加异步 -->
    <SearchError v-if="!typeList.length && !allList[0].list.length" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IchangeParam } from '@/components/operate/Pagination.vue'
import SearchInput from '@/components/search/SearchInput.vue'
import SearchError from '@/components/search/SearchError.vue'
import ArticleList from '@/components/display/ArticleList.vue'
import { IArticleList } from '@apiPublic/type'
import { SEARCH_TYPE } from '~/enums/content'

// 参数列表 // 标记

interface IData {
  keyword: String
  type: number // 搜索类型
  typeName: String // 搜索类型关键字
  allList: IArticleList[]
  searchAllPage: number
  typeList: IArticleList[]
  typePage: number
  query: {
    keyword: String
    type: number
    categoryId?: number
    keywordId?: number
    hostUserId?: number
  }
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
    const typeName = query.typeName // 搜索关键字

    let categoryId: number, keywordId: number, hostUserId: number
    let typeList: any[] = []
    const page = 1
    let temporary
    switch (type) {
      case SEARCH_TYPE.ITEM:
        categoryId = Number(query.categoryId)
        temporary = await app.$http.search.getSearchByItemCategoryId({
          keyword,
          categoryId,
          viewUserId,
          page,
        })
        // typeList.push(itemList)
        break
      case SEARCH_TYPE.LABEL:
        keywordId = Number(query.keywordId)
        temporary = await app.$http.search.getSearchByItemKeywordId({
          keyword,
          keywordId,
          viewUserId,
          page,
        })
        // typeList.push(itemKeyList)
        break
      case SEARCH_TYPE.HOST:
        hostUserId = Number(query.hostUserId)
        temporary = await app.$http.search.searchByHostUserId({
          keyword,
          hostUserId,
          viewUserId,
          page,
        })
        // typeList.push(hostUserList)
        break
      case SEARCH_TYPE.CAR:
        categoryId = Number(query.categoryId)
        keywordId = Number(query.keywordId)
        hostUserId = Number(query.hostUserId)
        temporary = await app.$http.search.searchByCars({
          keyword,
          categoryId,
          keywordId,
          hostUserId,
          viewUserId,
          page,
        })
        // typeList.push(carsList)
        break
      default:
        break
    }
    if (type > 1) {
      typeList = [
        {
          list: temporary.list,
          total: temporary.total,
          page: 1,
          listLoad: false,
        },
      ]
    }

    // 获取全部搜索
    const allRes = await app.$http.search.getSearchAll({
      keyword,
      viewUserId,
      page: 1,
    })

    const allList = [
      {
        list: allRes.list,
        total: allRes.total,
        typeId: '',
        page: 1,
        listLoad: false,
      },
    ]

    return {
      allList,
      keyword,
      typeList,
      query,
      typeName,
      type,
    }
  },

  data(): IData {
    return {
      allList: [], // 全部文章列表
      searchAllPage: 0, // 初始页码
      keyword: '', // 搜索关键字
      typeList: [], // 搜索类型文章列表
      typePage: 0, // 分类页码
      type: 0,
      typeName: '',
      query: {
        keyword: '',
        type: 0,
      },
    }
  },
  methods: {
    /**
     * @description: 页码改变
     */
    pageChange(param: IchangeParam) {
      const { page } = param
      this.allList[this.searchAllPage].page = page
      this.getSearchAll()
    },
    /**
     * @description: 搜索全部
     */
    getSearchAll() {
      const keyword = this.query.keyword
      const page = this.allList[this.searchAllPage].page
      const viewUserId = this.$accessor.userInfo.userId
      return this.$http.search.getSearchAll({
        keyword,
        viewUserId,
        page,
      })
    },
    /**
     * @description: 搜索分类
     */
    getSearchByItemCategoryId() {
      const { keyword } = this.query
      const categoryId = Number(this.query.categoryId)
      const page = this.typeList[this.searchAllPage].page
      const viewUserId = this.$accessor.userInfo.userId
      return this.$http.search.getSearchByItemCategoryId({
        keyword,
        categoryId,
        viewUserId,
        page,
      })
    },
    /**
     * @description: 搜索标签
     */
    getSearchByItemKeywordId() {
      const { keyword } = this.query
      const keywordId = Number(this.query.keywordId)
      const page = this.typeList[this.searchAllPage].page
      const viewUserId = this.$accessor.userInfo.userId
      return this.$http.search.getSearchByItemKeywordId({
        keyword,
        keywordId,
        viewUserId,
        page,
      })
    },
    /**
     * @description: 搜索kol
     */
    searchByHostUserId() {
      const { keyword } = this.query
      const hostUserId = Number(this.query.keywordId)
      const page = this.typeList[this.searchAllPage].page
      const viewUserId = this.$accessor.userInfo.userId
      return this.$http.search.searchByHostUserId({
        keyword,
        hostUserId,
        viewUserId,
        page,
      })
    },
    /**
     * @description: 搜索车型
     */
    searchByCars() {
      const { keyword } = this.query
      const categoryId = Number(this.query.categoryId)
      const keywordId = Number(this.query.keywordId)
      const hostUserId = Number(this.query.keywordId)
      const page = this.typeList[this.searchAllPage].page
      const viewUserId = this.$accessor.userInfo.userId
      return this.$http.search.searchByHostUserId({
        keyword,
        categoryId,
        keywordId,
        hostUserId,
        viewUserId,
        page,
      })
    },
  },
  /**
   * @descripttion 查看全部
   */
  seeAll() {},
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
