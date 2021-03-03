<template>
  <div :style="{ width: '100%' }">
    <Header :detail="detail"></Header>
    <Recommend :list="recommendList"></Recommend>
    <div v-if="categoryTabs.length !== 0" class="main">
      <div class="bg" :style="{ maxHeight: ListBgHeight }"></div>
      <tabs
        id="tabsAnchor"
        :tabs="categoryTabs"
        class="tabContainer"
        @tabActive="tabActive"
      >
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
                class="article-list"
              ></article-list>
            </div>
            <Pagination
              v-anchor="'tabsAnchor'"
              :total="articleList[index].total"
              class="pagination"
              @change="pageChange"
            ></Pagination>
          </div>
        </template>
      </tabs>
    </div>
    <global-empty v-else />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IchangeParam } from '@/components/operate/Pagination.vue'
import { ITopicListType } from '@apiModules/kol'
import { setSearchHistory } from '@/utils/search'
import { SEARCH_TYPE, POST_RADIO_TYPE } from '@/enums/content'
import { IArticleList } from '@/api/apiPublic/type'

interface ICategoryTabs {
  title: string
  id: number
  key: number
}

interface IData {
  detail: {
    name: string
    description: string
    imgUrl: string
  } // kol详情
  kolId: string // kolId
  recommendList: ITopicListType[] // 王牌推荐俩表
  categoryTabs: ICategoryTabs[]
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
    let categoryTabs: ICategoryTabs[] = []
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
        viewUserId: app.$accessor.userInfo.userId,
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
  head() {
    return {
      title: 'kol',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'my website description',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'my website keywords',
        },
      ],
    }
  },
  computed: {
    ListBgHeight(): string {
      return this.articleList[this.articleIndex]?.total < 5 ? '478px' : '810px'
    },
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
      setSearchHistory(value).then(() => {
        this.$router.push(
          `/search?type=${SEARCH_TYPE.HOST}&keyword=${value}&hostUserId=${this.kolId}&typeName=${this.detail.name}`
        )
      })
    },

    /**
     * @description: 单选框
     */
    onRadio(value: number) {
      const typeId =
        value === 1
          ? POST_RADIO_TYPE.IMAGE_POST
          : value === 2
          ? POST_RADIO_TYPE.VIDEO_POST
          : ''
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
          viewUserId: this.$accessor.userInfo.userId,
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
    height: 810px;
    background-image: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);
  }

  .tabContainer {
    width: 1280px;
    padding: 30px 20px 0;
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
