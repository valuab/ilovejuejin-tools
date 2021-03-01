<template>
  <article class="commentList"></article>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CommentList',
  components: {},
  props: {
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  // async fetch({ app, route }) {
  //   const viewUserId = app.$accessor.userInfo.userId
  //   const { id, typeId } = this.$props.post
  //   const sort = 0
  //   // 获取评论列表
  //   const getNewsCommentList = await app.$http.comment.getNewsCommentList({
  //     id,
  //     typeId,
  //     sort,
  //   })

  //   return {
  //     getNewsCommentList,
  //   }
  // },
  methods: {
    /**
     * @description: 评论回复
     */
    // getNewCommentReplyList() {
    //   const { id, contentId } = this.$props.post
    //   const sort = 0
    //   return this.$http.comment.getNewCommentReplyList({
    //     id,
    //     contentId,
    //     sort,
    //   })
    // },
    // /**
    //  * @description: 评论点赞
    //  */
    // supportComment(index: number) {
    //   const {
    //     commentId,
    //     contentId,
    //     shardId,
    //     shardTypeId,
    //   } = this.getNewsCommentList[index]
    //   const sort = 0
    //   return this.$http.comment.supportComment({
    //     id,
    //     contentId,
    //     sort,
    //   })
    // },
    // /**
    //  * @description: 添加帖子评论
    //  */
    // postComment(index: number) {
    //   const {
    //     commentId,
    //     shardId,
    //     content,
    //     djcarsmid, // 需要加密获取
    //   } = this.getNewsCommentList[index]
    //   const sort = 0
    //   return this.$http.comment.postComment({
    //     id,
    //     contentId,
    //     sort,
    //   })
    // },
  },
})
</script>
