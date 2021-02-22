<template>
  <div class="container">
    <!-- 栏目一 START -->
    <a-row class="column-wrap" :gutter="20">
      <a-col>
        <div class="column-item">
          <h2 class="column-title">最新推荐</h2>
          <a-carousel
            class="carousel-wrap"
            dots-class="dots"
            :initial-slide="0"
            autoplay
            arrows
          >
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
        </div>
      </a-col>
      <a-col>
        <h2 class="column-title">
          精选王牌节目
          <nuxt-link class="column-title-nav" to="/topiclist"
            >查看全部 ></nuxt-link
          >
        </h2>
        <a-row class="column-list-wrap" :gutter="20">
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
    <a-row class="column-wrap">
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
        <div class="like-column-list-wrap">
          <nuxt-link
            v-for="guessYouLikeItem in guessYouLikeList"
            :key="guessYouLikeItem.postId"
            to="/"
            class="like-column-item"
          >
            <img
              width="100%"
              height="106px"
              :src="guessYouLikeItem.smallImageUrl"
            />
            <p>{{ guessYouLikeItem.title }}</p>
          </nuxt-link>
        </div>
      </a-col>
      <a-col>
        <h2 class="column-title" :style="{ justifyContent: 'space-between' }">
          我们的KOL
          <toggle
            v-if="kolGroupList.length > 1"
            :disabled-left="!kolGroupIndex"
            :disabled-right="kolGroupIndex >= kolGroupList.length - 1"
            @clickLeft="toggleLeft"
            @clickRight="toggleRight"
          />
        </h2>
        <a-carousel
          ref="kolCarousel"
          class="kol-list-container"
          :initial-slide="0"
        >
          <div
            v-for="(kolGroup, index) in kolGroupList"
            :key="index"
            class="kol-list-wrap"
          >
            <a v-for="kolItem in kolGroup" :key="kolItem.id" class="kol-item">
              <a-avatar :size="30" :src="kolItem.smallImageUrl"></a-avatar>
              <strong class="kol-name text-hidden-1">{{ kolItem.name }}</strong>
            </a>
          </div>
        </a-carousel>
      </a-col>
    </a-row>
    <!-- 栏目二 END -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { NEW_LIST_TYPE } from '~/enums/content'
import {
  INewListData,
  IRecommendListData,
  IGuessYouLikeItem,
  ILayoutListData,
  IKolListData,
} from '~/api/apiPublic/modules/home'

export default defineComponent({
  name: 'Index',
  async asyncData({ app }) {
    const { userId: viewUserId } = app.$accessor.userInfo
    const newList = await app.$http.home.getNewList({
      viewUserId,
      type: NEW_LIST_TYPE.NEW_RECOMMEND,
    })
    const recommendList = await app.$http.home.getRecommendList()
    const guessYouLikeList = await app.$http.home.getGuessYouLikeList({
      count: 10,
    })

    return {
      newList,
      recommendList: recommendList.slice(0, 2),
      guessYouLikeList,
    }
  },
  data() {
    return {
      newList: [] as INewListData[],
      recommendList: [] as IRecommendListData[],
      guessYouLikeList: [] as IGuessYouLikeItem[],
      kolGroupIndex: 0,
      likeListLoad: false,
    }
  },
  computed: {
    kolGroupList() {
      const list = this.$accessor.layouts.kolList
      const kolGroupList = [] as (ILayoutListData & IKolListData)[][]
      const length = 6
      let index = 0

      while (index < list.length) {
        kolGroupList.push(list.slice(index, (index += length)))
      }

      return kolGroupList
    },
  },
  methods: {
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
    toggleLeft() {
      ;(this.$refs.kolCarousel as any).prev()
      this.kolGroupIndex -= 1
    },
    toggleRight() {
      ;(this.$refs.kolCarousel as any).next()
      this.kolGroupIndex += 1
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  max-width: 1280px;
  padding: 0 20px;

  .column-wrap {
    @include flex;

    .column-item {
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

      .carousel-wrap {
        width: 590px;
        height: 332px;
        overflow: hidden;

        .carousel-item {
          position: relative;
          width: 100%;
          height: 100%;

          &-img {
            width: 100%;
            height: 100%;
          }

          .carousel-title {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 0 16px;
            line-height: 24px;

            @include text(24px, #fff, bold);
          }
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
      width: 295px;
      height: 332px;
      background-color: #4d4d4d;
    }

    .like-column-list-wrap {
      position: relative;
      left: -10px;
      flex-wrap: wrap;

      @include flex;

      .like-column-item {
        width: 210px;
        height: 154px;
        padding: 0 10px;
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

      .kol-list-wrap {
        width: 100%;
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
}
</style>
