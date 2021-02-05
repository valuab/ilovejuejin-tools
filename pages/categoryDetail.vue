<template>
  <menu-container :style="{ width: '100%' }">
    <Header :detail="detail"></Header>
    <Recommend :list="recommendList"></Recommend>
    <div class="main">
      <div class="bg"></div>
      <!-- <tabs :tabs="tabs" class="tabs" @tabActive="tabActive"></tabs> -->
      <radio-and-search
        class="radio-search"
        @search="onSearch"
        @radio="onRadio"
      ></radio-and-search>
      <article-list
        :load="listLoad"
        :list="articleList.list"
        class="article-list"
      ></article-list>
      <Pagination :total="articleList.total" class="pagination"></Pagination>
    </div>
  </menu-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from '@nuxtjs/composition-api'
// import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
// import { http } from '/@/api/http'
// import ApiLink from '/@/api/apiLink'

import Header from '@/components/categoryDetail/Header.vue'
import Recommend from '@/components/categoryDetail/Recommend.vue'
// import Tabs from '/@components/display/Tabs.vue'
import RadioAndSearch from '@/components/categoryDetail/RadioAndSearch.vue'
import ArticleList from '@/components/display/ArticleList.vue'
import Pagination from '@/components/operate/Pagination.vue'

// import useSearchHistory from '/@/hooks/useSearchHistory.ts'
import type { IDetail } from '@/components/categoryDetail/Header.vue'
// import type { ITabItem } from '/@components/display/Tabs.vue'

export default defineComponent({
  name: 'CategoryDetail',
  components: {
    Header,
    Recommend,
    // Tabs,
    RadioAndSearch,
    ArticleList,
    Pagination,
  },
  setup() {
    // const router = useRouter()
    // const { params } = toRefs(useRoute())
    // let categoryId = params.value.id
    // const { useSearch } = useSearchHistory()
    const detail = reactive<IDetail>({
      name: '',
      des: '',
      imgUrl: '',
    })
    const recommendList = ref([])
    // const tabs = ref<Array<ITabItem>>([{}])
    const tabs = ref('')
    // const activeTab = ref<number>(0)
    const articleList = reactive({
      list: [],
      total: 0,
    })
    const listLoad = ref<Boolean>(false)
    function onShow() {
      listLoad.value = true
      // http(ApiLink.getCategoryDetail, { id: categoryId }).then((res: any) => {
      //   const { name, description, smallImageUrl } = res.result
      //   detail.name = name
      //   detail.des = description
      //   detail.imgUrl = smallImageUrl
      // })
      // http(ApiLink.getItemListByCategoryId, { categoryId }).then((res: any) => {
      //   recommendList.value = res.result.list
      // })
      // http(ApiLink.getHostListByCategoryId, { categoryId }).then((res: any) => {
      //   const list = []
      //   const resList = res.result.list
      //   if (res.result.total) {
      //     for (let i = 0; i < resList?.length; i++) {
      //       list.push({
      //         title: resList[i].nickname,
      //         key: Number(resList[i].userId),
      //       })
      //     }
      //     activeTab.value = list[0].key
      //   }
      //   tabs.value = list
      //   getArticleList()
      // })
    }
    /**
     * @description: 初始化数据
     */
    onShow()
    /**
     * @description: 路由更新
     */
    // onBeforeRouteUpdate((to) => {
    //   categoryId = to.params.id
    //   onShow()
    // })
    /**
     * @description: 获取文章列表
     * @param typeId 类型 0图文，1视频，不选默认所有
     */
    function getArticleList(typeId?: number | string) {
      console.log(typeId)
      // http(ApiLink.getListByCategoryIdHostUserId, {
      //   categoryId,
      //   hostUserId: activeTab.value,
      //   typeId,
      // }).then((res: any) => {
      //   listLoad.value = false
      //   articleList.list = res.result.list
      //   articleList.total = res.result.total
      // })
    }
    /**
     * @description: tab切换
     */
    function tabActive(key: any) {
      console.log(key)
    }
    /**
     * @description: 点击搜索
     */
    const onSearch = (value: string) => {
      console.log(value)
      // router.push({ name: 'Search' }).then(() => {
      //   useSearch(value)
      // })
    }
    /**
     * @description: 单选框
     */
    const onRadio = (value: number) => {
      listLoad.value = true
      const typeId = value === 1 ? 0 : value === 2 ? 1 : ''
      getArticleList(typeId)
    }
    return {
      detail,
      recommendList,
      tabs,
      articleList,
      listLoad,
      onSearch,
      onRadio,
      tabActive,
    }
  },
})
</script>
<style lang="scss" scoped>
.main {
  position: relative;

  & > .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 810px;
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
