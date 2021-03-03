<template>
  <aside class="article-body">
    <article class="article">
      <ArticleHeader :post="article" />

      <section></section>
      <!-- 文字段落 -->
      <div v-for="item in article.stepList" :key="item.id" class="article">
        <p>
          {{ item.content }}
        </p>
        <!-- 图片 -->
        <img class="poster" :src="item.smallShowImageUrl" />
        <!-- 视频展示    -->
        <aside class="video">
          <img class="video-poster" :src="item.smallShowImageUrl" />
          <!-- <img class="video-icon" src="~" /> -->
        </aside>
      </div>
      <ArticleFooter v-if="article.tagNameList.length" :post="article" />
      <CommentInput :post="article" />
      <p class="column-title">全部评论（673）</p>
      <Comment :post="article" />
    </article>
    <aside class="subs">
      <ArticleSort :post="article" />
      <ArticleSubs :post="article" />
      <ArticlePostList :post="article" />
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
import ArticleSort from './ArticleSort.vue'
import ArticlePostList from './ArticlePostList.vue'

export default defineComponent({
  name: 'Article',
  components: {
    ArticleHeader,
    ArticleFooter,
    ArticleSubs,
    ArticleSort,
    ArticlePostList,
    CommentInput,
    Comment,
  },
  props: {
    // 帖子数据
    posts: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  fetch() {
    console.log(this.article)
  },
  computed: {
    article(): any {
      return Object.assign(
        {
          stepList: [],
        },
        this.posts
      )
    },
  },
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
