<template>
  <div class="container">
    <a-row class="column-wrap" :gutter="20">
      <a-col>
        <div class="column-item">
          <h2 class="column-title">最新推荐</h2>
          <a-carousel class="carousel-wrap" dots-class="dots" autoplay arrows>
            <template #prevArrow>
              <div class="custom-slick-arrow-left">
                <icon icon="ArrowWhite"></icon>
              </div>
            </template>
            <template #nextArrow>
              <div class="custom-slick-arrow-right">
                <icon icon="ArrowWhite"></icon>
              </div>
            </template>
            <div class="carousel-item">
              <p class="carousel-title text-hidden-1">
                从来没有一台双门车，分量有它重从来没有一台双门车，分量有它重
              </p>
            </div>
            <div class="carousel-item">
              <p class="carousel-title text-hidden-1">
                从来没有一台双门车，分量有它重从来没有一台双门车，分量有它重
              </p>
            </div>
          </a-carousel>
        </div>
      </a-col>
      <a-col>
        <h2 class="column-title">
          精选王牌节目
          <router-link class="column-title-nav" to="/topic"
            >查看全部 ></router-link
          >
        </h2>
        <a-row class="column-list-wrap" :gutter="20">
          <a-col span="12">
            <div class="column-list-item">1</div>
          </a-col>
          <a-col span="12">
            <div class="column-list-item">2</div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="column-wrap">
      <a-col flex="1">
        <h2 class="column-title">
          猜你喜欢
          <a-button class="column-title-nav" type="link" @click="replaceList">
            <icon :style="{ marginRight: '5px' }" icon="IndexChange" />
            换一批
          </a-button>
        </h2>
        <div class="like-column-list-wrap">
          <nuxt-link
            v-for="(item, index) in likeList"
            :key="index"
            to="/"
            class="like-column-item"
          >
            <img width="100%" height="106px" src="@images/logo.png" />
            <p>{{ item.des }}</p>
          </nuxt-link>
        </div>
      </a-col>
      <a-col>
        <kol-list :kol-list="kolList"></kol-list>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Index',
  setup() {
    const num = 10
    const tabs = [] // tab列表
    const kolList = [] // kol列表
    const likeList = [] // 猜你喜欢

    for (let i = 0; i < num; i++) {
      const tab = {
        title: `全部出品${i}`,
        key: i,
      }
      tabs.push(tab)
      kolList.push([
        'kolList',
        'kolList',
        'kolList',
        'kolList',
        'kolList',
        'kolList',
      ])
      likeList.push({
        des: '来，你绝对想不到这里是干嘛的',
      })
    }

    /**
     * @description: 猜你喜欢换一批
     */
    const replaceList = () => {
      // console.log('猜你喜欢')
    }

    return {
      tabs,
      kolList,
      likeList,
      replaceList,
    }
  },
  asyncData({ app }) {
    console.log(app.$accessor.userInfo, '123')
  },
  data() {
    return {
      id: 0,
    }
  },
  computed: {
    test(): number {
      return this.$store.state.counter
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
        transform: rotate(180deg);
      }

      .dots {
        padding: 0 16px;
        text-align: left;
      }

      .carousel-wrap {
        width: 590px;

        .carousel-item {
          position: relative;
          width: 100%;
          height: 332px;
          background: #364d79;

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
      line-height: 1;
      @include flex(row, flex-start, center);
      @include text($font-size-heading, #000, bold);

      .column-title-nav {
        height: 20px;
        padding-left: 10px;
        @include flex(row, flex-start, center);
        @include text($font-size-base, #666);
        @include hoverColor(#333);
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
        @include text($font-size-base, #000);
        @include hoverColor($primary-color);
      }
    }
  }

  .article-list {
    margin: 20px -20px 10px;
  }
}
</style>
