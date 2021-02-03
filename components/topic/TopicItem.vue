<template>
  <article>
    <header class="header">
      <div>
        <h1>{{ data.name }}</h1>
        <p>{{ data.description }}</p>
      </div>
      <global-button class="nav-detail" @click="navDetail"
        >查看全部 ></global-button
      >
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
import { defineComponent, ref } from '@nuxtjs/composition-api'
// import { useRouter } from 'vue-router'
import ArticleCard from '@/components/display/ArticleCard.vue'
import TopicImg from './TopicImg.vue'

// import { http } from '/@/api/http'
// import ApiLink from '/@/api/apiLink'

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
  setup() {
    // const { data } = toRefs(props)
    // const router = useRouter()
    const articleList = ref()

    // http(ApiLink.getListByKeywordId, { keywordId: data.value.id }).then(
    //   (res: any) => {
    //     articleList.value = res.result.list
    //   }
    // )

    /**
     * @description: 跳转节目详情
     */
    // function navDetail(): void {
    //   const routeData = router.resolve({
    //     name: 'TopicDetail',
    //     params: { id: data.value.id },
    //   })
    //   window.open(routeData.href, '_blank')
    // }
    return {
      articleList,
      // navDetail,
    }
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
