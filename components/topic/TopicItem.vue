<template>
  <article>
    <header :class="data.description ? '' : 'not-desc'" class="header">
      <div>
        <nuxt-link
          :to="{ name: 'topic-id', params: { id: data.id } }"
          :target="$accessor.global.navTarget"
        >
          <h1>
            {{ data.name }}
          </h1>
        </nuxt-link>
        <p v-if="data.description" class="text-hidden-1">
          {{ data.description }}
        </p>
      </div>
      <nuxt-link
        class="nav-detail"
        :to="{ name: 'topic-id', params: { id: data.id } }"
        :target="$accessor.global.navTarget"
        >查看全部 >
      </nuxt-link>
    </header>
    <div class="main">
      <topic-img class="topicImg" :img-url="data.smallImageUrl"></topic-img>
      <article-card
        v-for="(item, index) in articleList"
        :key="index"
        :item="item"
        class="card-box"
      ></article-card>
    </div>
  </article>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IArticleItemType } from '@/api/apiPublic/type'
import { ICommendListType } from '@apiModules/program'

interface IData {
  articleList: Array<IArticleItemType>
}

export default defineComponent({
  name: 'TopicItem',
  props: {
    data: {
      type: Object as PropType<ICommendListType>,
      default: null,
    },
  },
  data(): IData {
    return {
      articleList: [],
    }
  },
  async fetch() {
    const { list } = await this.$http.program.getListByItemId({
      itemId: this.$props.data.id,
      viewUserId: this.$accessor.userInfo.userId,
      count: 3,
    })
    this.articleList = list
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffff;

  h1 {
    margin-bottom: 10px;
    line-height: 20px;
    @include text($font-size-heading, #000000, bold);
  }

  /* .name-not-desc {
    margin: 0;
    line-height: 24px;
    font-size: 24px;
  } */

  p {
    width: 58rem;
    line-height: 14px;
    margin: 0 0 20px;
    @include text($font-size-base, #666);
  }

  .nav-detail {
    background-color: #ffff;
    border: none;
    box-shadow: none;

    @include text($font-size-lg, #666666);

    &:hover {
      color: $heading-color;
    }
  }
}

.not-desc {
  margin-bottom: 24px;
  h1 {
    margin: 0;
    line-height: 24px;
    font-size: 24px;
  }
}

.main {
  display: flex;

  .topicImg {
    margin-right: 21px;
  }

  .card-box:not(:last-child) {
    margin-right: 20px;
  }
}
</style>
