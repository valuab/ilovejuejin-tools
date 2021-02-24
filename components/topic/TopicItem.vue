<template>
  <article>
    <header class="header">
      <div>
        <h1>{{ data.name }}</h1>
        <p>{{ data.description }}</p>
      </div>
      <a-button class="nav-detail" @click="navAllDetail">查看全部 ></a-button>
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
import ArticleCard from '@/components/display/ArticleCard.vue'
import TopicImg from '@/components/topic/TopicImg.vue'
import { IArticleItemType } from '@/typings/post'
import { ICommendListType } from '@apiModules/program'

interface IData {
  articleList: Array<IArticleItemType>
}

export default defineComponent({
  name: 'TopicItem',
  components: {
    TopicImg,
    ArticleCard,
  },
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
  async created() {
    const userId = this.$accessor.userInfo.userId
    const { list } = await this.$http.program.getListByKeywordId({
      keywordId: this.$props.data.id,
      viewUserId: userId,
    })
    this.articleList = list
  },
  methods: {
    navAllDetail() {
      const history = this.$router.resolve(`/topic/${this.$props.data.id}`)
      window.open(history.href, '_blank')
    },
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: inherit;

  h1 {
    margin-bottom: 10px;

    @include text($font-size-heading, #000000, bold);
  }

  p {
    width: 58rem;
    font-size: 14px;
    color: #666;
  }

  .nav-detail {
    background-color: inherit;
    border: none;
    box-shadow: none;

    @include text($font-size-lg, #666666);

    &:hover {
      color: $heading-color;
    }
  }
}

.main {
  display: flex;

  .topicImg {
    margin-right: 21px;
  }

  .card-box {
    margin-right: 20px;
  }
}
</style>
