<template>
  <article class="comment">
    <img :src="comment.smallUserIconUrl" class="comment-profile" />
    <article
      class="comment-msg"
      :class="commentType ? '' : 'comment-msg-border'"
    >
      <div class="comment-user">
        <div class="comment-user-name">{{ comment.userName }}</div>
        <div v-if="comment.parentName" class="comment-parent">
          <span>回复</span>
          {{ comment.parentName }}
        </div>
        <div v-if="comment.userId === post.userId" class="comment-user-author">
          作者
        </div>
        <div class="comment-user-time">{{ time }}</div>
      </div>
      <p class="comment-content">
        {{ comment.content }}
      </p>
      <div class="comment-handle">
        <div class="comment-handle-support" @click="support">
          <Icon v-if="comment.isSupport" icon="ArticleLikeOrange" size="24" />
          <Icon v-else icon="ArticleLikeGrey" size="24" />
          <span>点赞</span>
        </div>
        <div class="comment-handle-answer" @click="reply">回复</div>
      </div>
      <CommentInput v-if="isReply" @send="send" />
      <slot />
    </article>
  </article>
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import { handleTime } from '@/utils/data'

// 加密脚本
import { mid } from '@/assets/ts/mid'

// 回复数据结构
import { IComment } from '@apiModules/comment'

interface IData {
  isReply: boolean
  IComment: IComment
}
export default defineComponent({
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      default: () => {
        return {}
      },
    },
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
    openReplyId: {
      type: String,
      default: () => {
        return ''
      },
    },
    // 是否是评论回复
    commentType: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  emits: ['reply'],
  setup(props) {
    const { comment } = toRefs(props)
    const date = comment.value.createTime
    const postTimeStamp = new Date(date).getTime()
    const time: string = handleTime(postTimeStamp)

    return {
      time,
    }
  },
  data(): IData {
    return {
      isReply: false, // 评论展示
      // 初始化评论数据
      IComment: {
        ...this.$props.comment,
      },
    }
  },
  watch: {
    openReplyId(newVal: string) {
      if (this.comment.id === newVal) {
        // 调出评论
        this.isReply = true
      } else {
        this.isReply = false
      }
    },
  },
  methods: {
    /**
     * @description: 发布评论
     */
    async send(comentValue: any) {
      if (!comentValue) return
      const post: any = await this.postComment(comentValue)

      // 回复内容
      this.IComment.content = comentValue
      this.IComment.parentId = this.comment.id
      this.IComment.parentName = this.commentType ? this.comment.userName : ''

      if (post?.id) {
        this.$emit('send', this.IComment)
      } else {
        // 评论失败
      }
    },
    /**
     * @description: 添加评论回复
     */
    postComment(content: string) {
      const shardId = this.commentType
        ? this.comment.contentId
        : this.post.forumId
      const contentId = this.post.id
      const commentId = this.comment.id // 对帖子评论填写0，对评论的回复填写评论id // 如果是对评论的 进行回复 contentid  就是 评论id shardid 就是 评论的 contentid
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
     * @description: 回复评论
     */
    reply() {
      // 判断登录态
      if (this.$accessor.userInfo.userId === 0) {
        // 调取登录弹窗
        this.$accessor.global.showLoginPopUpOrHide()
        return
      }
      // 自己不能回复自己
      if (this.$accessor.userInfo.userId === this.$props.comment.userId) {
        return
      }
      this.$emit('reply', this.comment.id)
    },
    /**
     * @description: 点赞
     */
    async support() {
      // 判断登录态
      if (this.$accessor.userInfo.userId === 0) {
        // 调取登录弹窗
        this.$accessor.global.showLoginPopUpOrHide()
        return
      }
      // 自己不能点赞自己
      if (this.$accessor.userInfo.userId === this.$props.comment.userId) {
        return
      }
      const { contentId, shardId } = this.$props.comment
      const shardTypeId = this.$props.comment.typeId
      const commentId = this.$props.comment.id
      const data: any = await this.$http.comment.supportComment({
        commentId,
        contentId,
        shardId,
        shardTypeId,
      })

      if (data.id) {
        this.$props.comment.supportCount += 1
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.comment {
  display: flex;
  width: 100%;

  &-profile {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 50%;
  }

  &-msg {
    display: flex;
    flex: 1;
    flex-direction: column;

    &-border {
      border-bottom: 1px solid #e6e6e6;
    }
  }

  &-user {
    display: flex;
    height: 20px;
    align-items: center;

    &-name {
      @include text(12px, #333333);
    }

    // 回复
    &-parent {
      @include text(12px, #333333);
      > span {
        @include text(12px, #666);
      }
    }

    &-author {
      display: flex;
      width: 24px;
      height: 12px;
      background-color: #fff0e6;
      border-radius: 2px;
      align-items: center;
      justify-content: center;

      @include text(10px, #ff8022);
    }

    &-time {
      @include text(10px, #666666);
    }

    > * {
      // 子间距为4px
      margin-right: 4px;
    }
  }

  &-content {
    @include text(14px, #000000);

    line-height: 24px;
  }

  &-handle {
    display: flex;
    height: 20px;
    margin-bottom: 20px;
    align-items: center;

    @include text(12px, #666666);

    &-support {
      display: flex;
      align-items: center;
      margin-right: 16px;

      > span {
        margin-left: 4px;
      }
    }

    &-answer {
      display: flex;
      align-items: center;
    }
  }

  > * {
    // 子间距为4px
    margin-bottom: 4px;
  }
}
</style>
