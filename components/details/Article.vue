<template>
  <aside class="article-body">
    <!-- 分享挂件 -->
    <div v-if="!videoType" class="article-share">
      <ArticleShare :post="article" @ />
    </div>
    <article
      class="article"
      :class="videoType ? 'article-video-width' : 'article-width'"
    >
      <ArticleHeader :post="article" />
      <ArticleVideo
        v-if="article && videoType"
        :post="article"
        :video-url="videoUrl"
        @seeDatails="seeDatails"
      />
      <!-- 文字段落 -->
      <div
        v-for="item in article.stepList"
        v-show="!videoType"
        :key="item.id"
        class="article"
        :class="!item.content && !item.smallShowImageUrl ? 'article-none' : ''"
      >
        <p v-if="item.content">
          {{ item.content }}
        </p>
        <!-- 图片 -->
        <img
          v-if="item.videoId === 0"
          class="poster"
          :src="item.smallShowImageUrl"
        />
        <!-- 视频展示    -->
        <aside v-if="item.videoId !== 0" class="video" @click="playVideo(item)">
          <img class="video-poster" :src="item.smallShowImageUrl" />
          <Icon icon="ArticleVideoPaly" class="video-icon" size="30" />
        </aside>
      </div>
      <ArticleFooter v-if="article.tagNameList.length" :post="article" />
      <CommentInput :post="article" @send="send" />
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

// 加密脚本
import { mid } from '@/assets/ts/mid'

interface IStepList {
  qqVid: string
  realVideoUrl: string
}

export default defineComponent({
  name: 'Article',
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

    // 更新浏览量
    const { id, forumId } = this.article
    this.$http.posts.updateViewCountForAsync({
      id,
      forumId,
    })
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
     * @description: 增加浏览量
     */
    /**
     * @description: 视频播放
     */
    playVideo(item: IStepList) {
      this.videoType = true
      this.videoUrl = item.realVideoUrl
    },
    /**
     * @description: send
     */
    send(value: string) {
      this.postComment(value)
    },
    /**
     * @description: 添加帖子评论
     */
    postComment(content: string) {
      const shardId = this.posts.forumId
      const contentId = this.posts.id
      const commentId = 0 // 对帖子评论填写0，对评论的回复填写评论id // 如果是对评论的 进行回复 contentid  就是 评论id shardid 就是 评论的contentid
      const userId = this.$accessor.userInfo.userId
      const path = this.$route.name || 'index'
      const token = this.$cookies.get('token')
      const uuid = token.uuid
      const djcarsmid = mid(path, userId, uuid).toString()
      return this.$http.comment.postComment({
        commentId,
        shardId,
        contentId,
        content,
        djcarsmid,
      })
    },
    /**
     * @description: 查看详情
     */
    seeDatails() {
      this.videoType = false
    },
    /**
     * @description: 点赞
     */
    support() {
      this.$props.posts.isSupport = 1
      this.$props.posts.supportCount++
    },
  },
})
</script>
<style lang="scss" scoped>
.article-body {
  display: flex;
  padding: 60px 0 0 0;
}

.article-none {
  margin-bottom: 0;
}
.article-width {
  width: 780px;
}
.article-video-width {
  width: 886px;
}

.article {
  display: flex;
  width: 780px;
  margin-right: 60px;
  flex-direction: column;
  position: relative;

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
    width: 30px !important;
    height: 20px !important;
  }

  > * {
    margin-bottom: 20px;
  }
}

.column-title {
  @include text(20px, #000000, bold);
}

.article-share {
  margin-top: 124px;
  margin-right: 45px;
}
</style>
