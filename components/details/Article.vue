<template>
  <aside class="article-body">
    <article class="article">
      <ArticleHeader :post="article" />
      <ArticleVideo
        v-if="article && videoType"
        :post="article"
        :video-url="videoUrl"
      />
      <section></section>
      <!-- 文字段落 -->
      <div v-for="item in article.stepList" :key="item.id" class="article">
        <p>
          {{ item.content }}
        </p>
        <!-- 图片 -->
        <img class="poster" :src="item.smallShowImageUrl" />
        <!-- 视频展示    -->
        <aside class="video" @click="playVideo(item.videoUrl)">
          <img class="video-poster" :src="item.smallShowImageUrl" />
          <!-- <img class="video-icon" src="~" /> -->
        </aside>
      </div>
      <ArticleFooter v-if="article.tagNameList.length" :post="article" />
      <CommentInput :post="article" />
      <p class="column-title">全部评论（{{ article.commentCount }}）</p>
      <CommentList :post="article" />
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
import CommentList from '@/components/comment/CommentList.vue'
import ArticleHeader from './ArticleHeader.vue'
import ArticleVideo from './ArticleVideo.vue'
import ArticleFooter from './ArticleFooter.vue'
import ArticleSubs from './ArticleSubs.vue'
import ArticleSort from './ArticleSort.vue'
import ArticlePostList from './ArticlePostList.vue'

export default defineComponent({
  name: 'Article',
  components: {
    ArticleHeader,
    ArticleVideo,
    ArticleFooter,
    ArticleSubs,
    ArticleSort,
    ArticlePostList,
    CommentInput,
    CommentList,
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
  data() {
    return {
      videoUrl: '', // 视频链接
      videoType: false, // 切换视频
    }
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
  methods: {
    /**
     * @description: 视频播放
     */
    playVideo(videoUrl: string) {
      this.videoType = true
      this.videoUrl = videoUrl
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
