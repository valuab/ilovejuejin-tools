<template>
  <div :style="{ width: '100%' }">
    <Header :detail="detail"></Header>
    <Recommend :list="recommendList"></Recommend>
    <div class="main">
      <div
        class="bg"
        :style="{ maxHeight: articleList.total < 5 ? '30rem' : '45rem' }"
      ></div>
      <!-- <tabs :tabs="userTabs" class="tabs" @tabActive="tabActive"></tabs> -->
      <radio-and-search
        class="radio-search"
        @search="onSearch"
        @radio="onRadio"
      ></radio-and-search>
      <article-list
        :load="listLoad"
        :list="articleList.list"
        :none="articleList.total === 0"
        class="article-list"
      ></article-list>
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
import Pagination from '@/components/operate/Pagination.vue'

// import useSearchHistory from '/@/hooks/useSearchHistory.ts'

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
      name,
      description,
      smallImageUrl,
    } = await app.$http.category.getOpItemCategory({
      id: route.params.id,
    })

    // 获取王牌节目列表
    const {
      list: recommendList,
    } = await app.$http.category.getItemListByCategoryId({
      categoryId: route.params.id,
    })

    // 获取kol列表
    let activeTab: number = 0
    let userTabs: any[] = []
    const copyUserList = []
    let articleRes: any = {
      list: [],
      total: 0,
    }
    const userRes = await app.$http.category.getHostListByCategoryId({
      categoryId: route.params.id,
    })

    if (userRes.total) {
      for (let i = 0; i < userRes.list?.length; i++) {
        copyUserList.push({
          title: userRes.list[i].nickname,
          key: Number(userRes.list[i].userId),
        })
      }
      activeTab = copyUserList[0].key
      // 获取文章列表
      articleRes = await app.$http.category.getListByCategoryIdHostUserId({
        categoryId: route.params.id,
        hostUserId: activeTab,
      })
      userTabs = copyUserList
    }

    return {
      detail: {
        name,
        description,
        imgUrl: smallImageUrl,
      },
      categoryId: route.params.id,
      recommendList,
      userTabs,
      activeTab,
      articleList: {
        list: articleRes.list,
        total: articleRes.total,
      },
    }
  },
  data(): any {
    return {
      listLoad: false,
    }
  },
  methods: {
    /**
     * @description: tab切换
     */
    tabActive(key: any) {
      console.log(key)
    },

    /**
     * @description: 点击搜索
     */
    onSearch(value: string) {
      console.log(value)
      // router.push({ name: 'Search' }).then(() => {
      //   useSearch(value)
      // })
    },

    /**
     * @description: 单选框
     */
    onRadio(value: number) {
      this.listLoad = true
      const typeId = value === 1 ? 0 : value === 2 ? 1 : ''
      this.getArticleList(typeId)
    },

    /**
     * @description: 页码改变
     */
    pageChange() {},

    /**
     * @description: 获取文章列表
     * @param typeId 类型 0图文，1视频，不选默认所有
     */
    getArticleList(typeId?: number | string) {
      this.$http.category
        .getListByCategoryIdHostUserId({
          categoryId: this.categoryId,
          hostUserId: this.activeTab,
          typeId,
        })
        .then((res: any) => {
          this.listLoad = false
          this.articleList = {
            list: res.list,
            total: res.total,
          }
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
    margin: 20px auto 0;
  }

  .pagination {
    margin-top: 30px;
  }
}
</style>
