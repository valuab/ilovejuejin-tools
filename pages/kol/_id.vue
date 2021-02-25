<template>
  <div :style="{ width: '100%' }">
    <Header :detail="detail"></Header>
    <Recommend :list="recommendList"></Recommend>
    <div class="main">
      <div
        class="bg"
        :style="{
          maxHeight: articleList[articleIndex].total < 5 ? '30rem' : '45rem',
        }"
      ></div>
      <tabs :tabs="categoryTabs" class="tabContainer" @tabActive="tabActive">
        <template v-for="(articleColumn, index) in articleList">
          <div :key="index" :hidden="articleIndex !== index">
            <radio-and-search
              class="radio-search"
              @search="onSearch"
              @radio="onRadio"
            ></radio-and-search>
            <div class="article-list">
              <article-list
                :load="articleList[index].listLoad"
                :list="articleList[index].list || []"
                :none="articleList[index].total == 0"
                class="article-list"
              ></article-list>
            </div>
            <Pagination
              :total="articleList[index].total || 0"
              class="pagination"
              @change="pageChange"
            ></Pagination>
          </div>
        </template>
      </tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IchangeParam } from '@/components/operate/Pagination.vue'

import { ITopicListType } from '@apiModules/kol'
import { setSearchHistory } from '@/utils/search'
import { IArticleList } from '@/typings/post'

interface IData {
  detail: {
    name: string
    description: string
    imgUrl: string
  } // kol详情
  kolId: string // kolId
  recommendList: ITopicListType[] // 王牌推荐俩表
  categoryTabs: {
    title: string
    id: number
    key: number
  }[]
  articleIndex: number // 分组选择index
  articleList: IArticleList[] // 文章数组
}

export default defineComponent({
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
    let categoryTabs: any[] = []
    const copyUserList = []
    let articleList: IArticleList[] = []
    const categoryRes = await app.$http.kol.getListByHostUserId({
      userId: route.params.id,
    })

    if (categoryRes.total) {
      for (let i = 0; i < categoryRes.list?.length; i++) {
        copyUserList.push({
          title: categoryRes.list[i].name,
          id: categoryRes.list[i].id,
          key: i,
        })
      }
      // 获取文章列表
      const articleRes = await app.$http.kol.getListByCategoryIdHostUserId({
        page: 1,
        categoryId: copyUserList[0].id,
        hostUserId: route.params.id,
      })
      categoryTabs = copyUserList
      articleList = Array(copyUserList.length).fill({})
      articleList[0] = {
        list: articleRes.list,
        total: articleRes.total,
        typeId: '',
        page: 1,
        listLoad: false,
      }
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
      articleList,
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
      categoryTabs: [],
      articleIndex: 0,
      articleList: [],
    }
  },
  methods: {
    /**
     * @description: tab切换
     */
    tabActive(key: number) {
      this.articleIndex = key

      if (!this.articleList[key]?.list) {
        this.getArticleList()
      }
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
      const typeId = value === 1 ? '0' : value === 2 ? '1' : ''
      this.articleList[this.articleIndex].typeId = typeId
      this.articleList[this.articleIndex].page = 1
      this.getArticleList()
    },

    /**
     * @description: 页码改变
     */
    pageChange(param: IchangeParam) {
      const { page } = param
      this.articleList[this.articleIndex].page = page
      this.getArticleList()
    },

    /**
     * @description: 获取文章列表
     */
    getArticleList() {
      const { typeId, page } = this.articleList[this.articleIndex]
      this.articleList[this.articleIndex].listLoad = true
      this.$http.kol
        .getListByCategoryIdHostUserId({
          categoryId: this.categoryTabs[this.articleIndex].id,
          hostUserId: this.kolId,
          typeId,
          page,
        })
        .then(({ list, total }) => {
          this.$set(this.articleList, this.articleIndex, {
            listLoad: false,
            list,
            total,
            page,
            typeId,
          })
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

  .tabContainer {
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
