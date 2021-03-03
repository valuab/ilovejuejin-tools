<template>
  <article class="commentList">
    <Comment
      v-for="item in getNewsCommentList.list"
      :key="item.id"
      :comment="item"
    />
    <!-- 搜索分页 -->
    <Pagination
      v-anchor="'tabsAnchor'"
      :total="getNewsCommentList.total"
      class="pagination"
      @change="pageChange"
    ></Pagination>
  </article>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Pagination, { IchangeParam } from '@/components/operate/Pagination.vue'

// 获取枚举类型
import { PROT_TYPE_TYPEID } from '@/enums/content'

import Comment from './Comment.vue'

interface IData {
  getNewsCommentList: {
    total: number
    list: any[]
  }
}
export default defineComponent({
  name: 'CommentList',
  components: {
    Comment,
    Pagination,
  },
  props: {
    // 帖子数据
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data(): IData {
    return {
      getNewsCommentList: {
        total: 0,
        list: [],
      },
    }
  },
  async fetch() {
    // 判断是否有评论列表
    if (this.$props.post.commentCount === 0) return
    // const viewUserId = this.$accessor.userInfo.userId
    const sort = 0
    // 获取评论列表
    const getNewsCommentList = await this.$http.comment.getNewsCommentList({
      id: this.$props.post.id,
      typeId: PROT_TYPE_TYPEID.BIG_WORK,
      sort,
    })
    this.getNewsCommentList.total = getNewsCommentList.total
    this.getNewsCommentList.list = this.getNewsCommentList.list.concat(
      getNewsCommentList.list
    )
  },
  methods: {
    /**
     * @description: 评论回复
     */
    getNewCommentReplyList() {
      const { id, contentId } = this.$props.post
      const sort = 0
      return this.$http.comment.getNewCommentReplyList({
        id,
        contentId,
        sort,
      })
    },
    /**
     * @description: 页码改变
     */
    pageChange(param: IchangeParam) {
      const { page } = param
      return page
      // console.log(this.allList[0].list)
      // this.searchAllPage = page - 1
      // this.allList[this.searchAllPage].page = page
      // this.getSearchAll()
    },
    /**
     * @description: 评论点赞
     */
    // supportComment(index: number) {
    //   const {
    //     commentId,
    //     contentId,
    //     shardId,
    //     shardTypeId,
    //   } = this.getNewsCommentList[index]
    //   const sort = 0
    //   return this.$http.comment.supportComment({
    //     commentId,
    //     contentId,
    //     shardId,
    //     shardTypeId,
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
