<template>
  <div class="menu-container">
    <!-- 输入组件 -->
    <div class="search-content">
      <SearchInput
        :keyword="keyword"
        :type="type"
        :type-name="typeName"
        @search="search"
        @deleteSearch="deleteSearch"
      />
    </div>
    <!-- 车型搜索详情 -->
    <h2
      v-if="type === 5 && typeList[typePage].list.length"
      class="column-title"
    >
      {{ keyword }}
      <div class="tag">车型</div>
      <div
        v-if="type > 1 && typeList[typePage].list.length > 4"
        class="column-title-nav"
        @click="seeAll"
      >
        查看全部 >
      </div>
    </h2>
    <!-- 查看全部结果 -->
    <h2
      v-if="type === 5 && typeList[typePage].list.length"
      class="column-title"
    >
      <div class="backAll">返回全部</div>
      <div class="tag">为你搜索到“飞度”车型结果：</div>
    </h2>
    <article-list
      v-if="type > 1 && typeList[typePage].list.length"
      class="article-list"
      :list="typeList[0].list"
    />
    <!-- 全部 -->
    <h2 v-if="allList[0].list.length" class="column-title">全部出品</h2>
    <article-list
      v-if="allList[0].list.length"
      class="article-list"
      :list="allList[searchAllPage].list"
    />

    <!-- 搜索分页 -->
    <Pagination
      v-anchor="'tabsAnchor'"
      :total="allList[0].total"
      class="pagination"
      @change="pageChange"
    ></Pagination>
    <!-- 车型搜索分页 -->
    <!-- <Pagination
      v-anchor="'tabsAnchor'"
      :total="allList[searchAllPage].total"
      class="pagination"
      @change="pageChange"
    ></Pagination> -->
    <!-- 需要添加异步 -->
    <SearchError v-if="!typeList.length && !allList[0].list.length" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Pagination, { IchangeParam } from '@/components/operate/Pagination.vue'
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
    Pagination,
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
        break
      case SEARCH_TYPE.LABEL:
        keywordId = Number(query.keywordId)
        temporary = await app.$http.search.getSearchByItemKeywordId({
          keyword,
          keywordId,
          viewUserId,
          page,
        })
        break
      case SEARCH_TYPE.HOST:
        hostUserId = Number(query.hostUserId)
        temporary = await app.$http.search.getSearchByHostUserId({
          keyword,
          hostUserId,
          viewUserId,
          page,
        })
        break
      case SEARCH_TYPE.CAR:
        categoryId = Number(query.categoryId)
        keywordId = Number(query.keywordId)
        hostUserId = Number(query.hostUserId)
        temporary = await app.$http.search.getSearchByCars({
          keyword,
          categoryId,
          keywordId,
          hostUserId,
          viewUserId,
          page,
        })
        break
      default:
        break
    }
    if (type > 1) {
      typeList = [
        {
          list: temporary?.list,
          total: temporary?.total,
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
      return page
      // console.log(this.allList[0].list)
      // this.searchAllPage = page - 1
      // this.allList[this.searchAllPage].page = page
      // this.getSearchAll()
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
      return this.$http.search.getSearchByHostUserId({
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
      return this.$http.search.getSearchByCars({
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
   * @description 查看全部
   */
  seeAll() {},
  /**
   * @description 搜索
   */
  search(value: string) {
    // 重定向
    this.keyword = value
    switch (this.type) {
      case SEARCH_TYPE.ITEM:
        this.getSearchByItemCategoryId()
        break
      case SEARCH_TYPE.LABEL:
        this.getSearchByItemKeywordId()
        break
      case SEARCH_TYPE.HOST:
        this.searchByHostUserId()
        break
      case SEARCH_TYPE.CAR:
        this.searchByCars()
        break
      default:
        this.getSearchAll()
        break
    }
  },
  /**
   * @description 清除搜索
   */
  deleteSearch() {
    this.type = 1 // 改为全部搜索
  },

  /**
   * @description 列表分页初始化
   */
  // turnDown(list) {

  // },
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
