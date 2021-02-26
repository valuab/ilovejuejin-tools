<template>
  <article :style="{ width: '100%' }" class="container">
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
      <div
        class="main-bg"
        :style="{ maxHeight: total < 5 ? '384px' : '716px' }"
      ></div>
      <radio-and-search
        class="radio-search"
        @search="onSearch"
        @radio="onRadio"
      ></radio-and-search>
      <div class="article-list">
        <article-list :load="listLoad" :list="list"></article-list>
      </div>
      <Pagination
        :total="total"
        class="pagination"
        @change="pageChange"
      ></Pagination>
    </div>
  </article>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { IchangeParam } from '@/components/operate/Pagination.vue'
import { IArticleItemType } from '@/typings/post'
import { setSearchHistory } from '@/utils/search'
import { SEARCH_TYPE, POST_RADIO_TYPE } from '~/enums/content'

interface IData {
  id: string
  listLoad: Boolean
  list: Array<IArticleItemType>
  total: number
  typeId: number | string
  page: number
}

export default defineComponent({
  async asyncData({ app, route }) {
    const detail = await app.$http.program.getOpItem({
      id: route.params.id,
    })
    const { list, total } = await app.$http.program.getListByItemId({
      page: 1,
      itemId: route.params.id,
      viewUserId: app.$accessor.userInfo.userId,
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
      id: '', // 节目ID
      listLoad: true, // 加载动画
      list: [], // 文章列表
      total: 0, // 总数
      typeId: '', // 单选id
      page: 1, // 页码
    }
  },
  methods: {
    /**
     * @description: 单选框
     */
    onRadio(value: number) {
      this.listLoad = true
      const typeId =
        value === 1
          ? POST_RADIO_TYPE.IMAGE_POST
          : value === 2
          ? POST_RADIO_TYPE.VIDEO_POST
          : ''
      this.typeId = typeId
      this.page = 1
      this.getArticleList()
    },

    /**
     * @description: 搜索
     */
    onSearch(value: string) {
      setSearchHistory(value).then(() => {
        this.$router.push(`/search?type=${SEARCH_TYPE.LABEL}&keyword=${value}`)
      })
    },

    /**
     * @description: 获取文章列表
     */
    async getArticleList() {
      const { id: itemId, typeId, page } = this
      const { list, total } = await this.$http.program.getListByItemId({
        itemId,
        typeId,
        page,
      })
      this.list = list
      this.total = total
      this.listLoad = false
    },

    /**
     * @description: 改变页码
     */
    pageChange(param: IchangeParam) {
      const { page } = param
      this.listLoad = true
      this.page = page
      this.getArticleList()
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
    min-height: 30rem;

    .radio-search {
      padding: 20px 20px 0;
    }

    .main-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 45rem;
      background-image: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);
    }

    .article-list {
      max-width: 1240px;
      margin: 20px auto 0;
    }

    .pagination {
      margin-top: 10px;
    }
  }
}
</style>
