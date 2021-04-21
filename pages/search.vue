<template>
  <div id="tabsAnchor" class="menu-container">
    <!-- 输入组件 -->
    <div class="search-bg">
      <div class="search">
        <SearchInput
          class="searchInput"
          :keyword="keyword"
          :type="type"
          :type-name="typeName"
          @search="search"
          @deleteSearch="deleteSearch"
        />
      </div>
    </div>
    <div class="search-content">
      <!-- 车型搜索详情 -->
      <h2 v-if="ifTypeShow() && !openCarType" class="column-title">
        {{ keyword }}
        <div class="tag">车型</div>
        <div
          v-if="ifTypeShow() && typeList[typePage].list.length > 4"
          class="column-title-nav"
          @click="seeAll"
        >
          查看全部 >
        </div>
      </h2>
      <!-- 车型展示 -->
      <article-list
        v-if="!openCarType && ifTypeShow()"
        class="article-list"
        :data-source="typeList[typePage].copyList"
      />
      <!-- 查看全部结果 -->
      <h2 v-if="openCarType && ifTypeShow()" class="column-title">
        <div class="backAll" @click="backAll">返回全部</div>
        <div class="tag">为你搜索到“{{ keyword }}”车型结果：</div>
      </h2>
      <article-list
        v-if="openCarType && ifTypeShow()"
        class="article-list"
        :data-source="typeListCopy"
        :loading="typeList[1].listLoad"
      />
      <!-- 全部 -->
      <h2 v-if="allListCopy.length && !openCarType" class="column-title">
        全部出品
      </h2>
      <article-list
        v-if="!openCarType && allListCopy.length"
        class="article-list"
        :data-source="allListCopy"
        :loading="allList[1].listLoad"
      />

      <!-- 搜索分页 -->
      <Pagination
        v-if="!openCarType && allListCopy.length"
        v-anchor="'tabsAnchor'"
        :default-page-size="16"
        :total="allList[searchAllPage].total"
        :current="allList[searchAllPage].page"
        class="pagination"
        @change="pageChange"
      />
      <!-- 车型搜索分页 -->
      <Pagination
        v-if="openCarType && typeListCopy.length"
        v-anchor="'tabsAnchor'"
        :default-page-size="16"
        :total="typeList[typePage].total"
        :current="typeList[typePage].page"
        class="pagination"
        @change="typePageChange"
      />
      <!-- 需要添加异步 -->
      <SearchError
        v-if="!allListCopy.length && !typeListCopy.length"
        :keyword="keyword"
      />
    </div>
  </div>
</template>

<script lang="ts">
import merge from 'webpack-merge'
import { defineComponent } from '@nuxtjs/composition-api'
import { ICommentList, IArticleItemType } from '@apiPublic/type'
import { setSearchHistory } from '@/utils/search'
import { SEARCH_TYPE, POST_RADIO_TYPE } from '~/enums/content'

// 参数列表 // 标记

interface IData {
  keyword: string
  type: number // 搜索类型
  typeName: string // 搜索类型关键字
  allList: ICommentList[]
  allListCopy: IArticleItemType[]
  searchAllPage: number
  typeList: ICommentList[]
  typeListCopy: IArticleItemType[]
  typePage: number
  openCarType: boolean
  query: {
    keyword: string
    type: string
    typeName: string
    categoryId?: string
    itemId?: string
    hostUserId?: string
  }
}

export default defineComponent({
  name: 'Search',
  async asyncData({ app, route }) {
    const query = route.query
    const viewUserId = app.$accessor.userInfo.userId.toString()
    const keyword: any = query.keyword // 搜索关键字
    const type = Number(query.type) // 搜索类型
    const typeName = query.typeName // 搜索分类名称

    let categoryId, itemId: string, hostUserId: string
    const allList: any[] = []
    const allListCopy: any[] = []
    const page = 1
    let allRes: any
    switch (type) {
      case SEARCH_TYPE.ALL:
        allRes = await app.$http.search.getSearchAll({
          keyword: encodeURI(keyword),
          viewUserId,
          page: 1,
        })
        break
      case SEARCH_TYPE.ITEM:
        categoryId = query.categoryId.toString()
        allRes = await app.$http.search.getSearchByItemCategoryId({
          keyword: encodeURI(keyword),
          categoryId,
          viewUserId,
          page,
        })
        break
      case SEARCH_TYPE.LABEL:
        itemId = query.itemId.toString()
        allRes = await app.$http.search.getSearchByItemKeywordId({
          keyword: encodeURI(keyword),
          itemId,
          viewUserId,
          page,
        })
        break
      case SEARCH_TYPE.HOST:
        hostUserId = query?.hostUserId?.toString() || '0'
        allRes = await app.$http.search.getSearchByHostUserId({
          keyword: encodeURI(keyword),
          hostUserId,
          viewUserId,
          page,
        })
        break
      case SEARCH_TYPE.CAR:
        // 全部字段匹配车型
        break
      default:
        break
    }

    // 关键字匹配车型
    categoryId = query?.categoryId?.toString() || '0'
    itemId = query?.itemId?.toString() || '0'
    hostUserId = query?.hostUserId?.toString() || '0'
    const temporary = await app.$http.search.getSearchByCars({
      keyword: encodeURI(keyword),
      categoryId,
      itemId,
      hostUserId,
      viewUserId,
      page,
    })

    const allTemporary = Object.assign(
      {
        list: [],
        copyList: [],
        total: 0,
        page: 1,
        listLoad: false,
      },
      allRes
    )

    allList[1] = allTemporary
    allListCopy.push(...allTemporary.list)

    const typeList = []
    const typeListCopy: any = []
    const typeRes = Object.assign(
      {
        list: [],
        copyList: [],
        total: 0,
        page: 1,
        listLoad: false,
      },
      temporary
    )
    typeList[1] = typeRes
    typeListCopy.push(...typeRes.list)
    if (temporary && temporary.list.length > 4) {
      for (let i = 0; i < 4; i++) {
        typeList[1].copyList.push(typeList[1].list[i])
      }
    }

    return {
      allList,
      allListCopy,
      keyword,
      typeList,
      typeListCopy,
      query,
      typeName,
      type,
      searchAllPage: 1,
      typePage: 1,
    }
  },

  data(): IData {
    return {
      allList: [], // 全部文章列表数据存储
      allListCopy: [],
      searchAllPage: 1, // 初始页码
      keyword: '', // 搜索关键字
      typeList: [], // 搜索类型文章列表数据存储
      typeListCopy: [],
      typePage: 1, // 分类页码
      openCarType: false, // 车型搜索切换
      type: 0, // 模式类型
      typeName: '',
      query: {
        keyword: '',
        type: '0',
        typeName: '',
      },
    }
  },
  watch: {
    // 监听路由
    $route() {
      const query = this.$route.query
      const keyword: any = query.keyword // 搜索关键字
      this.type = Number(query.type) // 搜索类型
      this.openCarType = false
      // 初始化数据
      this.allListCopy.length = 0
      this.searchAllPage = 1 // 初始页码
      this.typeListCopy.length = 0
      this.typePage = 1 // 分类页码
      this.searchData(keyword)
    },
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
      if (this.allList.length > page && this.allList[page]?.list.length > 0) {
        // 当前页有数据
        this.searchAllPage = page
        this.allListCopy.length = 0
        this.allListCopy.push(...this.allList[page].list)
        return
      }
      this.allList[1].listLoad = true
      const newsCommentList = await this.getSearchAll(page)

      const data = Object.assign(
        {
          list: [],
          total: 0,
          typeId: POST_RADIO_TYPE,
          page,
          listLoad: false,
        },
        newsCommentList
      )
      this.allList[page] = data
      this.searchAllPage = page
      this.allListCopy.length = 0
      this.allListCopy.push(...data.list)
      this.allList[1].listLoad = false
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
        this.typeListCopy.length = 0
        this.typeListCopy.push(...this.typeList[page].list)
        return
      }
      this.typeList[1].listLoad = true
      const newsCommentList = await this.searchByCars(page)
      const data = Object.assign(
        {
          list: [],
          total: 0,
          typeId: POST_RADIO_TYPE,
          page,
          listLoad: false,
        },
        newsCommentList
      )

      this.typeList[page] = data
      this.typePage = page
      this.typeListCopy.length = 0
      this.typeListCopy.push(...data.list)
      this.typeList[1].listLoad = false
    },
    /**
     * @description: 搜索全部
     */
    getSearchAll(page: number) {
      const keyword = this.query.keyword.toString()
      const viewUserId = this.$accessor.userInfo.userId.toString()
      return this.$http.search.getSearchAll({
        keyword: encodeURI(keyword),
        viewUserId,
        page,
      })
    },
    /**
     * @description: 搜索分类
     */
    getSearchByItemCategoryId(page: number) {
      const { query } = this
      const keyword = query.keyword.toString()
      const categoryId = query?.categoryId?.toString() || '0'
      const viewUserId = this.$accessor.userInfo.userId.toString()
      return this.$http.search.getSearchByItemCategoryId({
        keyword: encodeURI(keyword),
        categoryId,
        viewUserId,
        page,
      })
    },
    /**
     * @description: 搜索标签  即王牌节目
     */
    getSearchByItemKeywordId(page: number) {
      const { query } = this
      const keyword = query.keyword.toString()
      const itemId = query?.itemId?.toString() || '0'
      const viewUserId = this.$accessor.userInfo.userId.toString()
      return this.$http.search.getSearchByItemKeywordId({
        keyword: encodeURI(keyword),
        itemId,
        viewUserId,
        page,
      })
    },
    /**
     * @description: 搜索kol
     */
    searchByHostUserId(page: number) {
      const { query } = this
      const keyword = query.keyword.toString()
      const hostUserId = query?.hostUserId?.toString() || '0'
      const viewUserId = this.$accessor.userInfo.userId.toString()
      return this.$http.search.getSearchByHostUserId({
        keyword: encodeURI(keyword),
        hostUserId,
        viewUserId,
        page,
      })
    },
    /**
     * @description: 搜索车型
     */
    searchByCars(page: number) {
      const { query } = this
      const keyword = query.keyword
      const categoryId = query?.categoryId?.toString() || '0'
      const itemId = query?.itemId?.toString() || '0'
      const hostUserId = query?.itemId?.toString() || '0'
      const viewUserId = this.$accessor.userInfo.userId.toString()
      const parmas: any = {
        categoryId,
        itemId,
        hostUserId,
        viewUserId,
      }
      // 排空
      for (const key in parmas) {
        if (+parmas[key] === 0) {
          delete parmas[key]
        }
      }
      return this.$http.search.getSearchByCars({
        keyword: encodeURI(keyword),
        ...parmas,
        page,
      })
    },

    /**
     * @description 搜索方法
     * @param type 搜索类型区分
     * @param value 搜索关键字
     */
    search(value: string) {
      let query: any
      if (this.type === 1) {
        query = merge({}, { keyword: value, type: this.type.toString() })
      } else {
        query = merge(this.query, {
          keyword: value,
          type: this.type.toString(),
          typeName: this.typeName,
        })
      }
      this.$router.push({
        query,
      })
    },
    /**
     * @description 搜索获取数据
     * @param type 搜索类型区分
     * @param value 搜索关键字
     */
    async searchData(value: string) {
      // 重定向
      if (value === this.keyword && this.type === +this.query.type && value)
        return // 没有更改搜索内容

      // 加入缓存
      setSearchHistory(value)
      // 加入缓存
      this.keyword = value
      this.query.keyword = value
      this.query.type = this.type.toString()
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
      this.allList[1] = allResType
      this.allListCopy.length = 0
      this.allListCopy.push(...allResType.list)
      // 搜索车型
      const temporary: any = await this.searchByCars(page)
      const typeList = []
      const typeRes = Object.assign(
        {
          list: [],
          copyList: [],
          total: 0,
          page: 1,
          listLoad: false,
        },
        temporary
      )
      typeList[1] = typeRes

      if (temporary && temporary.list.length > 4) {
        for (let i = 0; i < 4; i++) {
          typeList[1].copyList.push(temporary.list[i])
        }
      }
      this.typeList.length = 0
      this.typeList = typeList
      this.typeListCopy.length = 0
      this.typeListCopy.push(...typeRes.list)
    },
    /**
     * @description 清除搜索
     */
    deleteSearch() {
      this.type = 1 // 改为全部搜索
      this.typeName = '' // 改为全部搜索
      this.$router.push({
        query: {
          keyword: this.keyword,
          type: this.type.toString(),
          typeName: this.typeName,
        },
      })
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
      this.openCarType = false
    },
    /**
     * @description 判断是否展示车型
     */
    ifTypeShow() {
      return this.typeList.length && this.typeList[this.typePage].list.length
    },
  },
})
</script>

<style lang="scss" scoped>
.menu-container::v-deep .slot-wrap {
  margin: 0 0 !important;
}

.search-bg {
  width: 100%;
  min-height: 88px;
  padding: 20px 0;
  background: #fff;
  align-items: center;
  justify-content: center;

  .search {
    width: 1280px;
    padding-left: 20px;
    margin: 0 auto;
  }
}

.search-content {
  max-width: 1240px !important;
  margin: 0 auto;
}

.column-title {
  padding-top: 40px;
  margin-bottom: 20px;

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
    padding-left: 20px;
    cursor: pointer;

    @extend .flex-row-vertical-center;
    @include text($font-size-base, #666);
    @include hoverColor(#333);
  }

  .backAll {
    color: #ff8022;
    cursor: pointer;
  }
}
</style>
