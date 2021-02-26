<template>
  <div class="container">
    <!-- 栏目一 START -->
    <a-row type="flex" :gutter="20">
      <a-col :span="12">
        <div class="column-item">
          <h2 class="column-title">最新推荐</h2>
          <div
            class="column-carousel"
            :style="{
              background: `url(${newList[0].smallImageUrl}) no-repeat 100% / 100%`,
            }"
          >
            <client-only>
              <a-carousel dots-class="dots" autoplay arrows>
                <template #prevArrow>
                  <div class="custom-slick-arrow-left">
                    <icon icon="ArrowWhite"></icon>
                  </div>
                </template>
                <template #nextArrow>
                  <div class="custom-slick-arrow-right">
                    <icon icon="ArrowWhite" rotate="180"></icon>
                  </div>
                </template>
                <div
                  v-for="newItem in newList"
                  :key="newItem.postId"
                  class="carousel-item"
                >
                  <img
                    class="carousel-item-img"
                    :src="newItem.smallImageUrl"
                    :alt="newItem.title"
                  />
                  <p class="carousel-title text-hidden-1">
                    {{ newItem.title }}
                  </p>
                </div>
              </a-carousel>
            </client-only>
          </div>
        </div>
      </a-col>
      <a-col :span="12">
        <h2 class="column-title">
          精选王牌节目
          <nuxt-link class="column-title-nav" to="/topiclist"
            >查看全部 ></nuxt-link
          >
        </h2>
        <a-row class="column-list-wrap" :gutter="20" type="flex">
          <a-col
            v-for="recommendItem in recommendList"
            :key="recommendItem.id"
            span="12"
          >
            <img
              class="column-list-item"
              :src="recommendItem.smallImageUrl"
              :alt="recommendItem.description"
            />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <!-- 栏目一 END -->
    <!-- 栏目二 START -->
    <a-row type="flex" :gutter="40">
      <a-col flex="1">
        <h2 class="column-title">
          猜你喜欢
          <a-button
            class="column-title-nav"
            type="link"
            @click="changeLikeList"
          >
            <icon icon="IndexChange" size="19" />
            换一批
          </a-button>
        </h2>
        <a-spin :spinning="likeListLoad">
          <a-row type="flex" :gutter="20">
            <a-col
              v-for="guessYouLikeItem in guessYouLikeList"
              :key="guessYouLikeItem.postId"
              class="like-column-list"
            >
              <nuxt-link to="/" class="like-column-item">
                <img
                  width="100%"
                  height="106px"
                  :src="guessYouLikeItem.smallImageUrl"
                />
                <p>{{ guessYouLikeItem.title }}</p>
              </nuxt-link>
            </a-col>
          </a-row>
        </a-spin>
      </a-col>
      <a-col>
        <h2 class="column-title" :style="{ justifyContent: 'space-between' }">
          我们的KOL
          <toggle
            v-if="kolGroupList.length > 1"
            :disabled-left="!kolGroupIndex"
            :disabled-right="kolGroupIndex >= kolGroupList.length - 1"
            @clickLeft="toggleKolLeftOrRight"
            @clickRight="toggleKolLeftOrRight"
          />
        </h2>
        <div class="kol-list-container">
          <div
            ref="kolCarousel"
            class="kol-carousel"
            :style="{ left: `${kolCarouselLeft}px` }"
          >
            <div
              v-for="(kolGroup, index) in kolGroupList"
              :key="index"
              class="kol-list-wrap"
            >
              <a v-for="kolItem in kolGroup" :key="kolItem.id" class="kol-item">
                <a-avatar :size="30" :src="kolItem.smallImageUrl"></a-avatar>
                <strong class="kol-name text-hidden-1">{{
                  kolItem.name
                }}</strong>
              </a>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
    <!-- 栏目二 END -->
    <!-- tabs START -->
    <tabs
      id="tabsAnchor"
      :tabs="categoryTabsList"
      @tabActive="getListByCategoryId"
    >
      <template v-for="(categoryColumn, index) in categoryList">
        <div
          :key="index"
          class="all-list-wrap"
          :hidden="categoryIndex !== index"
        >
          <article-list
            :list="categoryColumn.list || []"
            :load="categoryTabsLoad"
          ></article-list>
          <pagination
            v-anchor="'tabsAnchor'"
            :total="categoryColumn.total || 0"
            :default-page-size="16"
            @change="changeCategory"
          ></pagination>
        </div>
      </template>
    </tabs>
    <!-- tabs END -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { NEW_LIST_TYPE } from '~/enums/content'
import { ToggleType } from '~/components/operate/Toggle.vue'
import {
  INewListData,
  IRecommendListData,
  IGuessYouLikeItem,
  ILayoutListData,
  IKolListData,
  IGetCategoryIdResult,
} from '~/api/apiPublic/modules/home'

export default defineComponent({
  setup() {
    const kolGroupIndex = ref(0)
    const kolCarouselLeft = ref(0)
    const kolCarousel = ref<null | HTMLElement>(null)
    const toggleKolLeftOrRight = (direcion: ToggleType) => {
      const kolCarouselNode = kolCarousel.value
      const width = kolCarouselNode?.clientWidth

      if (width) {
        if (direcion === 'Left') {
          kolGroupIndex.value -= 1
          kolCarouselLeft.value += width
        } else {
          kolGroupIndex.value += 1
          kolCarouselLeft.value -= width
        }
      }
    }

    return {
      kolCarousel,
      kolGroupIndex,
      kolCarouselLeft,
      toggleKolLeftOrRight,
    }
  },
  async asyncData({ app }) {
    const { userId: viewUserId } = app.$accessor.userInfo
    const newListData = await app.$http.home.getNewList({
      viewUserId,
      type: NEW_LIST_TYPE.NEW_RECOMMEND,
    })
    const recommendList = await app.$http.home.getRecommendList()
    const guessYouLikeList = await app.$http.home.getGuessYouLikeList({
      count: 10,
    })
    const yieldListData = await app.$http.home.getNewList({
      viewUserId,
      type: NEW_LIST_TYPE.ALL_YIELD,
    })
    const list = app.$accessor.layouts.opItemCategoryList
    const categoryList = Array(list.length + 1).fill({})

    categoryList[0] = yieldListData

    return {
      newList: newListData.list, // 最新推荐
      recommendList: recommendList.slice(0, 2), // 王牌节目
      guessYouLikeList, // 猜你喜欢
      categoryList,
    }
  },
  data() {
    return {
      newList: [] as INewListData[],
      recommendList: [] as IRecommendListData[],
      guessYouLikeList: [] as IGuessYouLikeItem[],
      categoryList: [] as IGetCategoryIdResult['result'][],
      categoryIndex: 0,
      likeListLoad: false,
      categoryTabsLoad: false,
    }
  },
  computed: {
    kolGroupList() {
      const list = this.$accessor.layouts.kolList
      const kolGroupList: (ILayoutListData & IKolListData)[][] = []
      const length = 6
      let index = 0

      while (index < list.length) {
        kolGroupList.push(list.slice(index, (index += length)))
      }

      return kolGroupList
    },
    categoryTabsList() {
      const list = this.$accessor.layouts.opItemCategoryList
      const categoryTabsList = list.map((categoryItem, index) => {
        return {
          title: categoryItem.name,
          key: index + 1,
          id: categoryItem.id,
        }
      })

      categoryTabsList.unshift({
        title: '全部出品',
        key: 0,
        id: '',
      })

      return categoryTabsList
    },
  },
  methods: {
    // 点击换一批
    async changeLikeList() {
      const likeListLoad = this.likeListLoad

      if (!likeListLoad) {
        this.likeListLoad = true
        const guessYouLikeList = await this.$http.home.getGuessYouLikeList({
          count: 10,
        })
        this.guessYouLikeList = guessYouLikeList
        this.likeListLoad = false
      }
    },
    // 获取单个分类帖子
    async getListByCategoryId(index: number) {
      const categoryId = this.categoryTabsList[index].id
      const categoryList = this.categoryList

      if (categoryId && !categoryList[index].list) {
        this.categoryTabsLoad = true
        const { userId: viewUserId } = this.$accessor.userInfo
        const categoryItem = await this.$http.home.getListByCategoryId({
          viewUserId,
          categoryId,
        })
        this.$set(categoryList, index, categoryItem)
        this.categoryTabsLoad = false
      }

      this.categoryIndex = index
    },
    // 点击分类帖子分组分页
    async changeCategory(params: { page: number }) {
      const { userId: viewUserId } = this.$accessor.userInfo
      const categoryList = this.categoryList
      const index = this.categoryIndex
      const categoryId = this.categoryTabsList[index].id

      this.categoryTabsLoad = true
      if (categoryId) {
        const categoryItem = await this.$http.home.getListByCategoryId({
          viewUserId,
          categoryId,
          page: params.page,
        })
        this.$set(categoryList[index], 'list', categoryItem.list)
      } else {
        const result = await this.$http.home.getNewList({
          viewUserId,
          type: NEW_LIST_TYPE.ALL_YIELD,
          page: params.page,
        })
        const categoryItem = result as IGetCategoryIdResult['result']
        this.$set(categoryList[index], 'list', categoryItem.list)
      }
      this.categoryTabsLoad = false
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  max-width: 1280px;
  padding: 0 20px;
  position: relative;
  left: 50%;
  transform: translate(-50%);

  .column-item {
    position: relative;
    padding-right: 20px;

    .custom-slick-arrow-left {
      left: 0;
      z-index: 1;
      display: flex;
      width: 30px;
      height: 60px;
      margin-top: -30px;
      line-height: 80px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.7);
    }

    .custom-slick-arrow-right {
      right: 0;
      z-index: 1;
      display: flex;
      width: 30px;
      height: 60px;
      margin-top: -30px;
      line-height: 80px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.7);
    }

    .dots {
      padding: 0 16px;
      text-align: left;
    }

    .column-carousel {
      height: 332px;
    }

    .carousel-item {
      position: relative;
      height: 332px;

      &-img {
        width: 100%;
        height: 100%;
      }

      .carousel-title {
        position: absolute;
        left: 0;
        width: 100%;
        padding: 0 16px;
        line-height: 24px;

        @include text(24px, #fff, bold);
      }
    }
  }

  .column-title {
    padding-top: 40px;
    margin-bottom: 20px;

    @include flex(row, flex-start, center);
    @include text($font-size-heading, #000, bold);

    .column-title-nav {
      height: 20px;
      padding-left: 10px;

      @include flex(row, flex-start, center);
      @include text($font-size-base, #666);
      @include hoverColor(#333);

      span {
        margin: 0;
      }
    }
  }

  .column-list-item {
    width: 100%;
    height: 332px;
    background-color: #4d4d4d;
  }

  .like-column-list {
    width: 20%;

    .like-column-item {
      height: 154px;
      margin-bottom: 15px;

      @include text($font-size-base, #000, bold);
      @include hoverColor($primary-color);

      p {
        margin-top: 8px;
      }
    }
  }

  .kol-list-container {
    width: 170px;
    height: 320px;
    overflow: hidden;

    .kol-carousel {
      position: relative;
      left: 0;
      transition: left 0.5s;

      @include flex(row);

      .kol-list-wrap {
        width: 170px;
        height: 320px;
        padding: 20px 20px 0;
        background-color: #fff;
        border: solid 1px #e6e6e6;

        @include flex(column);

        .kol-item {
          margin-bottom: 20px;
          color: #000;
          box-sizing: border-box;
          word-break: break-all;

          @include flex(row, flex-start, center);
          @include hoverColor($primary-color);

          .kol-name {
            width: 100px;
            padding-left: 10px;
          }
        }

        .kol-item:last-child {
          margin: 0;
        }
      }
    }
  }
  .article-list {
    margin: 20px -20px 10px;
  }

  .all-list-wrap {
    margin-top: 20px;
  }
}
</style>
