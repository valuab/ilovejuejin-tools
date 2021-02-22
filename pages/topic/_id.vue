<template>
  <div :style="{ width: '100%' }">
    <article class="container">
      <header class="header-bg">
        <div class="header-box">
          <div class="header-left">
            <topic-img :img-url="detail.smallImageUrl"></topic-img>
            <div class="des">
              <h1>{{ detail.name }}</h1>
              <p>{{ detail.description }}</p>
            </div>
          </div>
          <aside class="qrimg">
            <img src="/assets/images/logo.png" />
          </aside>
        </div>
      </header>
      <div class="main">
        <div class="main-bg"></div>
        <radio-and-search
          class="radio-search"
          @search="onSearch"
          @radio="onRadio"
        ></radio-and-search>
        <article-list
          :load="listLoad"
          :none="total === 0"
          :list="list"
          class="article-list"
        ></article-list>
        <Pagination class="pagination" @change="pageChange"></Pagination>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

import TopicImg from '@/components/topic/TopicImg.vue'
import RadioAndSearch from '@/components/categoryDetail/RadioAndSearch.vue'
import ArticleList from '@/components/display/ArticleList.vue'
import Pagination from '@/components/operate/Pagination.vue'
import { IArticleListParams } from '@/api/apiPublic/modules/program'
import { IArticleItemType } from '@/utils/type'

interface IData {
  id: number | string
  listLoad: Boolean
  list: Array<IArticleItemType>
  total: number
}

// import useSearchHistory from '/@/hooks/useSearchHistory.ts'

export default defineComponent({
  components: {
    TopicImg,
    RadioAndSearch,
    ArticleList,
    Pagination,
  },

  async asyncData({ app, route }) {
    const detail = await app.$http.program.getOpItem({
      id: route.params.id,
    })
    const { list, total } = await app.$http.program.getListByItemId({
      itemId: route.params.id,
    })
    return {
      id: route.params.id,
      detail,
      list,
      total,
      listLoad: false,
    }
  },
  data(): IData {
    return {
      id: 0,
      listLoad: true,
      list: [],
      total: 0,
    }
  },
  methods: {
    /**
     * @description: 点击搜索
     */
    onSearch(value: string) {
      console.log(value)
      //   router.push({ name: 'Search' }).then(() => {
      //     useSearch(value)
      //   })
    },

    /**
     * @description: 单选框
     */
    onRadio(value: number) {
      console.log(value)

      this.listLoad = true
      const typeId = value === 1 ? '0' : value === 2 ? '1' : ''
      this.getArticleList({ itemId: this.id, typeId })
    },

    async getArticleList(prams: IArticleListParams) {
      const { list, total } = await this.$http.program.getListByItemId(prams)
      this.list = list
      this.total = total
      this.listLoad = false
    },

    /**
     * @description: 改变页码
     */
    pageChange(param: any) {
      const { page, pageSize } = param
      console.log(page, pageSize)
    },
  },
})
</script>
<style lang="scss" scoped>
.container {
  .header-bg {
    width: 100%;
    background-color: #fff;

    .header-box {
      display: flex;
      width: 1280px;
      height: 392px;
      padding: 0 20px;
      margin: 0 auto;
      background-color: #fff;
      align-items: center;
      justify-content: space-between;

      .header-left {
        display: flex;
        align-items: center;

        .des {
          margin-left: 44px;

          & > h1 {
            @include text(32px, #000000, bold);

            margin-bottom: 10px;
          }

          & > p {
            @include text($font-size-lg, #717171);

            width: 37rem;
          }
        }
      }
      .qrimg {
        & > img {
          width: 100px;
          height: 100px;
        }
      }
    }
  }

  .main {
    position: relative;

    .radio-search {
      padding-top: 20px;
    }

    .main-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 45rem;
      background-image: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);
      z-index: -1;
    }

    .article-list {
      margin: 20px auto 0;
    }

    .pagination {
      margin-top: 10px;
    }
  }
}
</style>
