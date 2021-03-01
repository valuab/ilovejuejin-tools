<template>
  <article class="commentList"></article>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { IApiCommentDto } from '@apiModules/comment.ts'

interface IPost {
  typeId: number
  id: number
}

interface IData {
  newsCommentList: IApiCommentDto[]
}

export default defineComponent({
  name: 'CommentList',
  components: {},
  props: {
    data: {
      type: Object as PropType<IPost>,
      default: null,
    },
  },
  data(): IData {
    return {
      newsCommentList: [],
    }
  },
  // async fetch() {
  //   const viewUserId = this.$accessor.userInfo.userId
  //   const sort = 0
  //   // 获取评论列表
  //   const getNewsCommentList = await this.$http.comment.getNewsCommentList({
  //     id: this.$props.data.id,
  //     typeId: this.$props.data.typeId,
  //     sort,
  //   })

  //   return {
  //     // getNewsCommentList,
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
