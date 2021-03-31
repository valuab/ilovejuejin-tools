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
      v-if="typeList.length && typeList[typePage - 1].list.length"
      class="column-title"
    >
      {{ keyword }}
      <div class="tag">车型</div>
      <div
        v-if="typeList.length && typeList[typePage - 1].list.length > 4"
        class="column-title-nav"
        @click="seeAll"
      >
        查看全部 >
      </div>
    </h2>
    <!-- 查看全部结果 -->
    <h2
      v-if="openCarType && typeList[typePage - 1].list.length"
      class="column-title"
    >
      <div class="backAll" @click="backAll">返回全部</div>
      <div class="tag">为你搜索到“飞度”车型结果：</div>
    </h2>
    <article-list
      v-if="openCarType && typeList[typePage - 1].list.length"
      class="article-list"
      :data-source="typeList[0].list"
    />
    <!-- 全部 -->
    <h2
      v-if="allList.length && allList[searchAllPage - 1].list.length"
      class="column-title"
    >
      全部出品
    </h2>
    <article-list
      v-if="allList.length && allList[searchAllPage - 1].list.length"
      class="article-list"
      :data-source="allList[searchAllPage - 1].list"
    />

    <!-- 搜索分页 -->
    <Pagination
      v-if="!openCarType && allList.length && allList[0].list.length"
      v-anchor="'tabsAnchor'"
      :total="allList[searchAllPage - 1].total"
      class="pagination"
      @change="pageChange"
    ></Pagination>
    <!-- 车型搜索分页 -->
    <Pagination
      v-if="openCarType && typeList.length && typeList[0].list.length"
      v-anchor="'tabsAnchor'"
      :total="typeList[typePage - 1].total"
      class="pagination"
      @change="typePageChange"
    ></Pagination>
    <!-- 需要添加异步 -->
    <SearchError v-if="!typeList.length && !allList[0].list.length" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ICommentList } from '@apiPublic/type'
import { SEARCH_TYPE, POST_RADIO_TYPE } from '~/enums/content'

// 参数列表 // 标记

interface IData {
  keyword: String
  type: number // 搜索类型
  typeName: String // 搜索类型关键字
  allList: ICommentList[]
  searchAllPage: number
  typeList: ICommentList[]
  typePage: number
  openCarType: boolean
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
  async asyncData({ app, route }) {
    const query = route.query
    const viewUserId = app.$accessor.userInfo.userId

    const keyword: string = unescape(query.keyword as string) // 搜索关键字
    const type = Number(query.type) // 搜索关键字
    const typeName = query.typeName // 搜索关键字

    let categoryId: number, keywordId: number, hostUserId: number
    const allList: any[] = []
    const page = 1
    let allRes: any, temporary
    switch (type) {
      case SEARCH_TYPE.ALL:
        allRes = await app.$http.search.getSearchAll({
          keyword,
          viewUserId,
          page: 1,
        })
        break
      case SEARCH_TYPE.ITEM:
        categoryId = Number(query.categoryId)
        allRes = await app.$http.search.getSearchByItemCategoryId({
          keyword,
          categoryId,
          viewUserId,
          page,
        })
        break
      case SEARCH_TYPE.LABEL:
        keywordId = Number(query.keywordId)
        allRes = await app.$http.search.getSearchByItemKeywordId({
          keyword,
          keywordId,
          viewUserId,
          page,
        })
        break
      case SEARCH_TYPE.HOST:
        hostUserId = Number(query.hostUserId)
        allRes = await app.$http.search.getSearchByHostUserId({
          keyword,
          hostUserId,
          viewUserId,
          page,
        })

        categoryId = Number(query.categoryId) || 0
        keywordId = Number(query.keywordId) || 0
        hostUserId = Number(query.hostUserId) || 0
        temporary = await app.$http.search.getSearchByCars({
          keyword,
          categoryId,
          keywordId,
          hostUserId,
          viewUserId,
          page,
        })
        break
      case SEARCH_TYPE.CAR:
        // 关键字匹配车型
        categoryId = Number(query.categoryId) || 0
        keywordId = Number(query.keywordId) || 0
        hostUserId = Number(query.hostUserId) || 0
        temporary = await app.$http.search.getSearchByCars({
          keyword,
          categoryId,
          keywordId,
          hostUserId,
          viewUserId,
          page,
        })

        // 搜索全部
        allRes = await app.$http.search.getSearchAll({
          keyword,
          viewUserId,
          page: 1,
        })
        break
      default:
        break
    }

    allList.push(allRes)

    const typeList = []
    if (type === 5 && temporary && temporary?.list.length !== 0) {
      const typeRes = Object.assign(
        {
          list: [],
          total: 0,
          page: 1,
          listLoad: false,
        },
        temporary
      )
      typeList.push(typeRes)
    }

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
      searchAllPage: 1, // 初始页码
      keyword: '', // 搜索关键字
      typeList: [], // 搜索类型文章列表
      typePage: 1, // 分类页码
      openCarType: false, // 车型搜索切换
      type: 0, // 模式类型
      typeName: '',
      query: {
        keyword: '',
        type: 0,
      },
    }
  },
  methods: {
    /**
     * @description: 全部列表页码改变
     */
    async pageChange(page: number) {
      // 每页十六条数据
      // 获取数据存在本地变量

      // 判断是否是车型

      // 请求数据 or 直接切换页码
      if (
        this.allList.length > page - 1 &&
        this.allList[page - 1].list.length > 0
      ) {
        // 当前页有数据
        this.searchAllPage = page
        return
      }

      this.searchAllPage = page - 1
      const newsCommentList = await this.getSearchAll(page)

      const data = Object.assign(
        {
          list: [],
          total: 0,
          typeId: POST_RADIO_TYPE,
          page: 0,
          listLoad: false,
        },
        newsCommentList
      )

      this.allList.push(data)
    },
    /**
     * @description: 车型页码改变
     */
    async typePageChange(page: number) {
      // 获取数据存在本地变量
      // 判断搜索状态
      // 请求数据 or 直接切换页码
      if (
        this.typeList.length > page &&
        this.typeList[this.typePage].list.length > 0
      ) {
        // 当前页有数据
        this.typePage = page
        return
      }

      this.typePage = page
      const newsCommentList = await this.searchByCars(page)

      const data = Object.assign(
        {
          list: [],
          total: 0,
          typeId: POST_RADIO_TYPE,
          page: 0,
          listLoad: false,
        },
        newsCommentList
      )

      this.typeList.push(data)
    },
    /**
     * @description: 搜索全部
     */
    getSearchAll(page: number) {
      const keyword = this.query.keyword
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
    getSearchByItemCategoryId(page: number) {
      const { keyword } = this.query
      const categoryId = Number(this.query.categoryId)
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
    getSearchByItemKeywordId(page: number) {
      const { keyword } = this.query
      const keywordId = Number(this.query.keywordId)
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
    searchByHostUserId(page: number) {
      const { keyword } = this.query
      const hostUserId = Number(this.query.hostUserId)
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
    searchByCars(page: number) {
      const { keyword } = this.query
      const categoryId = Number(this.query.categoryId) || 0
      const keywordId = Number(this.query.keywordId) || 0
      const hostUserId = Number(this.query.keywordId) || 0
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

    /**
     * @description 搜索
     */
    async search(value: string) {
      // 重定向
      this.keyword = value
      this.query.keyword = value
      let allRes: any
      const page = 1

      switch (this.type) {
        case SEARCH_TYPE.ALL:
          allRes = await this.getSearchAll(page)
          break
        case SEARCH_TYPE.ITEM:
          allRes = await this.getSearchByItemCategoryId(page)
          break
        case SEARCH_TYPE.LABEL:
          allRes = await this.getSearchByItemKeywordId(page)
          break
        case SEARCH_TYPE.HOST:
          allRes = await this.searchByHostUserId(page)
          break
        default:
          break
      }

      if (allRes && allRes?.list.length !== 0) {
        const allResType = Object.assign(
          {
            list: [],
            total: 0,
            page: 1,
            listLoad: false,
          },
          allRes
        )
        this.allList.length = 0 // 清除之前数据
        this.allList.push(allResType)
      } else {
        this.allList.length = 0 // 清除之前数据
      }
      // 搜索车型
      const temporary: any = await this.searchByCars(page)
      if (temporary && temporary?.list.length !== 0) {
        const typeRes = Object.assign(
          {
            list: [],
            total: 0,
            page: 1,
            listLoad: false,
          },
          temporary
        )
        this.typeList.length = 0 // 清除之前数据
        this.typeList.push(typeRes)
      } else {
        this.typeList.length = 0 // 清除之前数据
      }
    },
    /**
     * @description 清除搜索
     */
    deleteSearch() {
      this.type = 1 // 改为全部搜索
    },
    /**
     * @description 查看全部
     */
    seeAll() {
      this.openCarType = true
    },
    /**
     * @description 返回全部
     */
    backAll() {
      this.openCarType = true
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

.article-list {
  margin-left: 20px;
}
</style>
