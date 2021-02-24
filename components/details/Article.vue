<template>
  <aside class="article-body">
    <article class="article">
      <ArticleHeader />

      <section></section>
      <!-- 文字段落 -->
      <p>
        会9月份的销量数据出来了，上个月国内狭义乘用车市场销量达191.2万辆，同比增长7.4%，环比增长12.2%。
        销量数据的大涨，是不是说明，因为疫情压抑的消费需求，在“金九银十”集中释放了？如果是，2020剩下的几个月份能否保持销量增长，补补年初欠下的功课？我的第六感，如果疫情不反扑，四季度汽车销量应该高于去年同期。上个月的榜单里，还有几辆车很有意思，我们单独拿出来说说。
      </p>
      <!-- 图片 -->
      <img
        class="poster"
        src="https://image.djcars.cn/38/f2595cdb-0cf8-4582-99e4-c12074e20f3d"
      />
      <!-- 视频展示    -->
      <aside class="video">
        <img
          class="video-poster"
          src="https://image.djcars.cn/38/f2595cdb-0cf8-4582-99e4-c12074e20f3d"
        />
        <!-- <img class="video-icon" src="~" /> -->
      </aside>
      <ArticleFooter />
      <CommentInput />
      <p class="column-title">全部评论（673）</p>
      <Comment />
    </article>
    <aside class="subs">
      <ArticleSubs />
      <ArticlePostList />
    </aside>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CommentInput from '@/components/comment/CommentInput.vue'
import Comment from '@/components/comment/Comment.vue'
import ArticleHeader from './ArticleHeader.vue'
import ArticleFooter from './ArticleFooter.vue'
import ArticleSubs from './ArticleSubs.vue'
import ArticlePostList from './ArticlePostList.vue'

export default defineComponent({
  name: 'Article',
  components: {
    ArticleHeader,
    ArticleFooter,
    ArticleSubs,
    ArticlePostList,
    CommentInput,
    Comment,
  },
  props: {
    article: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup() {},
})
</script>
<style lang="scss" scoped>
.article-body {
  display: flex;
}

.article {
  display: flex;
  width: 780px;
  margin-right: 60px;
  flex-direction: column;

  p {
    font-size: 16px;
    line-height: 32px;
    color: #333;
  }

  .poster {
    display: block;
    width: 100%;
  }

  .video {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-poster {
    width: 100%;
  }

  .video-icon {
    position: absolute;
    width: 30px;
    height: 30px;
  }

  > * {
    margin-bottom: 20px;
  }
}

.column-title {
  @include text(20px, #000000, bold);
}
</style>
