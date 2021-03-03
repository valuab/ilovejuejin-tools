<template>
  <div :style="{ width: '100%' }">
    <Header :detail="detail"></Header>
    <Recommend :list="recommendList"></Recommend>
    <div v-if="userTabs.length !== 0" class="main">
      <div class="bg" :style="{ maxHeight: ListBgHeight }"></div>
      <tabs
        id="tabsAnchor"
        :tabs="userTabs"
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
              ></article-list>
            </div>
            <Pagination
              v-anchor="'tabsAnchor'"
              :total="articleList[index].total || 0"
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
import { IProgramListType } from '@apiModules/category'
import { SEARCH_TYPE, POST_RADIO_TYPE } from '@/enums/content'
import { setSearchHistory } from '@/utils/search'
import { IArticleList } from '@/api/apiPublic/type'
import GlobalEmpty from '~/components/global/GlobalEmpty.vue'

interface IUserTabs {
  title: string
  id: number
  key: number
}

interface IData {
  detail: {
    name: string
    description: string
    imgUrl: string
  }
  categoryId: string
  recommendList: IProgramListType[]
  userTabs: IUserTabs[]
  articleIndex: number // 分组选择index
  articleList: IArticleList[]
}

export default defineComponent({
  components: { GlobalEmpty },
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
    let userTabs: IUserTabs[] = []
    const copyUserList = []
    let articleList: IArticleList[] = []
    const userRes = await app.$http.category.getHostListByCategoryId({
      categoryId: route.params.id,
    })

    if (userRes.total) {
      for (let i = 0; i < userRes.list?.length; i++) {
        copyUserList.push({
          title: userRes.list[i].nickname,
          id: userRes.list[i].userId,
          key: i,
        })
      }
      // 获取文章列表
      const articleRes = await app.$http.category.getListByCategoryIdHostUserId(
        {
          page: 1,
          categoryId: route.params.id,
          hostUserId: copyUserList[0].id,
          viewUserId: app.$accessor.userInfo.userId,
        }
      )
      userTabs = copyUserList
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
      categoryId: route.params.id,
      recommendList,
      userTabs,
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
      categoryId: '',
      recommendList: [],
      userTabs: [],
      articleIndex: 0,
      articleList: [],
    }
  },
  head() {
    return {
      title: 'category',
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
          `/search?type=${SEARCH_TYPE.ITEM}&keyword=${value}&categoryId=${this.categoryId}&typeName=${this.detail.name}`
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
      this.$http.category
        .getListByCategoryIdHostUserId({
          categoryId: this.categoryId,
          hostUserId: this.userTabs[this.articleIndex].id,
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
.none {
  margin-top: 50px;
  @include flex(column, center, center);
  @include text($font-size-base, #cccccc);
}
</style>
