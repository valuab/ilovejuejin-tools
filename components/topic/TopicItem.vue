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
import { defineComponent } from '@nuxtjs/composition-api'
import ArticleCard from '@/components/display/ArticleCard.vue'
import TopicImg from '@/components/topic/TopicImg.vue'
import { ICommendItemType } from '@/api/apiPublic/modules/topic'

interface IData {
  articleList: Array<ICommendItemType>
}

export default defineComponent({
  name: 'TopicItem',
  components: {
    TopicImg,
    ArticleCard,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data(): IData {
    return {
      articleList: [],
    }
  },
  async created() {
    const { list } = await this.$http.topic.getListByKeywordId({
      keywordId: this.$props.data.id,
    })
    this.articleList = list
  },
  methods: {
    navAllDetail() {
      const history = this.$router.resolve({
        name: '/TopicDetail-id',
        params: { id: this.$props.data.id },
      })
      console.log(history)
      // window.open(history.href, '_blank')
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
