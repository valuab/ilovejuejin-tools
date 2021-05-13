<template>
  <div class="body">
    <ad-box
      v-if="adList[0]"
      class="ad-header"
      :ad-source="adList[0]"
      :ad-height="100"
    />
    <!-- 广告 -->
    <aside class="article-body">
      <!-- 分享挂件 -->
      <div v-if="!query.videoType" class="article-share">
        <ArticleShare :post="article" @support="support" />
      </div>

      <article
        class="article"
        :class="query.videoType ? 'article-video-width' : 'article-width'"
      >
        <ArticleHeader :post="article" />
        <!-- 视频组件 -->
        <ArticleVideo
          v-if="article && query.videoType"
          :post="article"
          :video-url="query.videoUrl"
          :qq-vid="query.qqVid"
        />
        <!-- 文章内容组件 -->
        <!-- 文字段落 -->
        <div
          v-for="item in article.stepList"
          v-show="!query.videoType"
          :key="item.id"
          class="article"
          :class="
            !item.content && !item.smallImageUrl && !item.smallShowImageUrl
              ? 'article-none'
              : ''
          "
        >
          <p v-if="item.content">
            {{ item.content }}
          </p>
          <!-- 图片 -->
          <img
            v-if="item.videoId === 0"
            class="poster"
            :src="item.smallImageUrl || item.smallShowImageUrl"
            :class="
              item.smallImageUrl || item.smallShowImageUrl ? '' : 'article-none'
            "
          />
          <!-- 视频展示    -->
          <nuxt-link
            v-if="item.videoId !== 0"
            class="video"
            :to="{
              name: 'videoDetails',
              query: {
                id: article.id,
                forumId: article.forumId,
                step: item.step,
              },
            }"
            target="_blank"
          >
            <img
              class="video-poster"
              :src="item.smallImageUrl || item.smallShowImageUrl"
            />
            <div class="video-icon">
              <img src="../../assets/images/video_play.png" />
            </div>
          </nuxt-link>
          <!-- 腾讯视频展示 -->
          <nuxt-link
            v-else-if="item.qqVid"
            class="video"
            :to="{
              name: 'videoDetails',
              query: {
                id: article.id || article.postId,
                forumId: article.forumId,
                step: item.step,
              },
            }"
            target="_blank"
          >
            <img
              class="video-poster"
              :src="item.smallImageUrl || item.smallShowImageUrl"
            />
            <div class="video-icon">
              <img src="../../assets/images/video_play.png" />
            </div>
          </nuxt-link>
        </div>
        <ArticleFooter
          v-if="article.tagNameList.length"
          class="ArticleFooter"
          :post="article"
        />
        <!-- 评论区ad -->
        <ad-box v-if="adList[1]" :ad-source="adList[1]" :ad-height="100" />
        <p class="column-title publish">发表评论</p>
        <CommentInput
          class="commentInput"
          :comment-value="commentValue"
          :post="article"
          @send="send"
        />
        <CommentList ref="commentListRef" :post="article" />
      </article>
      <aside class="subs">
        <ArticleSort :post="article" />
        <ArticleSubs :post="article" :change="query.videoType" />
        <ArticlePostList :post="article" />
      </aside>
    </aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { handleTime } from '@/utils/data'
import { AD_NUMBER_TYPE, IAdListType } from '@apiModules/adList'

// 加密脚本
import { mid } from '@/assets/ts/mid'

// 评论数据结构

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
    query: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      IComment: {
        ...this.$accessor.userInfo,
        id: '',
        smallUserIconUrl: '',
        userName: '',
        time: '',
        content: '',
        openAllReply: [],
        shortCommentReplyList: [],
      },
      commentValue: '', // 输入清除
      adList: [] as IAdListType[],
    }
  },
  async fetch() {
    // 更新浏览量
    const { id, forumId } = this.article
    this.$http.posts.updateViewCountForAsync({
      id,
      forumId,
    })

    // 获取广告
    const adList = []
    for (let i = 0; i < 2; i++) {
      const ad = await this.$http.adList.getGuangGaoList({
        pageName: this.$props.query.videoType ? 'video' : 'article',
        number: AD_NUMBER_TYPE[i],
      })
      adList.push(ad[0])
    }
    this.adList = adList
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
     * @description: 发布评论
     */
    async send(comentValue: string) {
      if (!comentValue) return
      const post: any = await this.postComment(comentValue)
      if (post?.id) {
        const IComment: any = {}
        IComment.time = handleTime(Date.now())
        IComment.id = post.id.toString()
        IComment.rootId = post.id.toString()
        IComment.typeId = '19'
        IComment.content = comentValue
        IComment.userName = this.$accessor.userInfo.nickname
        IComment.smallUserIconUrl = this.$accessor.userInfo.smallImageUrl
        // 参数
        IComment.supportCount = 0
        IComment.userVoteCommentFlag = 0

        IComment.openAllReply = false // 关闭全部回复
        IComment.newCommentReplyList = [] //
        IComment.shortCommentReplyList = [] //
        IComment.replayCommentDtoList = [] //

        // 点赞，评论回复所需参数
        IComment.contentId = this.article.id || this.article.postId
        IComment.shardId = this.article.forumId
        IComment.shardTypeId = '2' // 一级评论

        // 添加帖子
        const {
          newsCommentList,
          commentPage,
          commentList,
        }: any = this.$refs.commentListRef

        // 0 回复
        if (newsCommentList.length === 0) {
          const data = Object.assign(
            {
              list: [IComment],
              total: 1,
              page: 1,
              listLoad: false,
            },
            newsCommentList
          )
          newsCommentList.push(data)
        } else {
          const { list } = newsCommentList[commentPage]
          list.reverse()
          list.push(IComment)
          list.reverse()
        }
        commentList.length = 0
        commentList.push(...newsCommentList[commentPage].list)

        // 评论数自增
        this.article.commentCount++

        // 清除评论内容
        this.commentValue = ''
      } else {
        // 评论失败
        this.$message.error(post.msg)
      }
    },
    /**
     * @description: 添加帖子评论
     */
    postComment(content: string) {
      const shardId = this.posts.forumId
      const contentId = this.posts.id
      const commentId = '0' // 对帖子评论填写0，对评论的回复填写评论id // 如果是对评论的 进行回复 contentid  就是 评论id shardid 就是 评论的contentid
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
.ad-header {
  margin-top: 40px !important;
}
.article-body {
  display: flex;
  padding: 60px 0 0 0;
}

.article-width {
  width: 780px;
}
.article-video-width {
  width: 886px;
}

.column-title {
  font-size: 20px !important;
  color: #000 !important;
  font-weight: bold !important;
}

.article {
  display: flex;
  width: 780px;
  margin-right: 60px;
  flex-direction: column;
  position: relative;
  margin-bottom: 0 !important;

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
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 60px;
      height: 60px;
    }
  }

  > * {
    margin-bottom: 20px;
  }

  .ArticleFooter {
    margin-bottom: 40px;
    display: block;
  }
}

.publish {
  margin-top: 40px;
  margin-bottom: 10px;
}

.article-share {
  margin-top: 124px;
  margin-right: 45px;
}

.article-none {
  margin-bottom: 0;
}

.commentInput {
  margin-bottom: 40px;
}
</style>
