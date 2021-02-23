<template>
  <div :style="{ width: '100%' }">
    <Header :detail="detail"></Header>
    <Recommend :list="recommendList"></Recommend>
    <div class="main">
      <div
        class="bg"
        :style="{ maxHeight: articleList.total < 5 ? '30rem' : '45rem' }"
      ></div>
      <!-- <tabs :tabs="categoryTabs" class="tabs" @tabActive="tabActive"></tabs> -->
      <radio-and-search
        class="radio-search"
        @search="onSearch"
        @radio="onRadio"
      ></radio-and-search>
      <div class="article-list">
        <article-list
          :load="articleList.listLoad"
          :list="articleList.list"
          :none="articleList.total === 0"
          class="article-list"
        ></article-list>
      </div>
      <Pagination
        :total="articleList.total"
        class="pagination"
        @change="pageChange"
      ></Pagination>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

import Header from '@/components/categoryDetail/Header.vue'
import Recommend from '@/components/categoryDetail/Recommend.vue'
// import Tabs from '/@components/display/Tabs.vue'
import RadioAndSearch from '@/components/categoryDetail/RadioAndSearch.vue'
import ArticleList from '@/components/display/ArticleList.vue'
import Pagination, { IchangeParam } from '@/components/operate/Pagination.vue'

import { ITopicListType } from '@apiModules/kol'
import { setSearchHistory } from '@/utils/search'
import { IArticleItemType } from '~/utils/type'

interface IData {
  detail: {
    name: string
    description: string
    imgUrl: string
  }
  kolId: string
  recommendList: ITopicListType[]
  activeTab: number
  articleList: {
    list: IArticleItemType[]
    total: number
    typeId: string
    page: number
    listLoad: boolean
  }
}

export default defineComponent({
  components: {
    Header,
    Recommend,
    // Tabs,
    RadioAndSearch,
    ArticleList,
    Pagination,
  },
  async asyncData({ app, route }) {
    // 获取分类详情
    const {
      nickname: name,
      description,
      smallImageUrl,
    } = await app.$http.kol.getUserInfo({
      userId: Number(route.params.id),
    })

    // 获取王牌节目列表
    const { list: recommendList } = await app.$http.kol.getItemListByHostUserId(
      {
        hostUserId: route.params.id,
      }
    )

    // 获取分类列表
    let activeTab: number = 0
    let categoryTabs: any[] = []
    const copyUserList = []
    let articleRes: any = {
      list: [],
      total: 0,
    }
    const categoryRes = await app.$http.kol.getListByHostUserId({
      userId: route.params.id,
    })

    if (categoryRes.total) {
      for (let i = 0; i < categoryRes.list?.length; i++) {
        copyUserList.push({
          title: categoryRes.list[i].name,
          key: categoryRes.list[i].id,
        })
      }
      activeTab = copyUserList[0].key
      // 获取文章列表
      articleRes = await app.$http.kol.getListByCategoryIdHostUserId({
        page: 1,
        categoryId: activeTab,
        hostUserId: route.params.id,
      })
      categoryTabs = copyUserList
    }

    return {
      detail: {
        name,
        description,
        imgUrl: smallImageUrl,
      },
      kolId: route.params.id,
      recommendList,
      categoryTabs,
      activeTab,
      articleList: {
        list: articleRes.list,
        total: articleRes.total,
        typeId: '',
        page: 1,
        listLoad: false,
      },
    }
  },
  data(): IData {
    return {
      detail: {
        name: '',
        description: '',
        imgUrl: '',
      },
      kolId: '',
      recommendList: [],
      activeTab: 0,
      articleList: {
        list: [],
        total: 0,
        typeId: '',
        page: 1,
        listLoad: false,
      },
    }
  },
  methods: {
    /**
     * @description: tab切换
     */
    tabActive(key: number) {
      console.log(key)
    },

    /**
     * @description: 点击搜索
     */
    onSearch(value: string) {
      setSearchHistory(value)
    },

    /**
     * @description: 单选框
     */
    onRadio(value: number) {
      this.articleList.listLoad = true
      const typeId = value === 1 ? '0' : value === 2 ? '1' : ''
      this.articleList.typeId = typeId
      this.articleList.page = 1
      this.getArticleList()
    },

    /**
     * @description: 页码改变
     */
    pageChange(param: IchangeParam) {
      const { page } = param
      this.articleList.listLoad = true
      this.articleList.page = page
      this.getArticleList()
    },

    /**
     * @description: 获取文章列表
     * @param typeId 类型 0图文，1视频，不选默认所有
     */
    getArticleList() {
      this.$http.kol
        .getListByCategoryIdHostUserId({
          categoryId: this.activeTab,
          hostUserId: this.kolId,
          typeId: this.articleList.typeId,
          page: this.articleList.page,
        })
        .then((res: any) => {
          this.articleList.listLoad = false
          this.articleList.list = res.list
          this.articleList.total = res.total
        })
    },
  },
})
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  min-height: 30rem;

  & > .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 45rem;
    background-image: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);
  }

  .tabs {
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
  }

  .radio-search {
    margin-top: 20px;
  }

  .article-list {
    max-width: 1240px;
    margin: 20px auto 0;
  }

  .pagination {
    margin-top: 30px;
  }
}
</style>
