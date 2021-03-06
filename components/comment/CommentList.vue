<template>
  <article v-if="newsCommentList.length" class="commentList">
    <Comment
      v-for="item in newsCommentList[commentPage].list"
      :key="item.id"
      :comment="item"
      :post="post"
      class="Comment"
    >
      <Comment />
    </Comment>
    <!-- 搜索分页 -->
    <Pagination
      v-anchor="'tabsAnchor'"
      :default-page-size="10"
      :total="newsCommentList[commentPage].total"
      class="pagination"
      @change="pageChange"
    ></Pagination>
  </article>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IchangeParam } from '@/components/operate/Pagination.vue'

import { ICommentList } from '@apiPublic/type'

// 获取枚举类型
import { PROT_TYPE_TYPEID } from '@/enums/content'

interface IData {
  newsCommentList: ICommentList[]
  commentPage: number
}
export default defineComponent({
  name: 'CommentList',
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
      newsCommentList: [],
      commentPage: 0,
    }
  },
  async fetch() {
    // 判断是否有评论列表
    if (this.$props.post.commentCount === 0) return
    // const viewUserId = this.$accessor.userInfo.userId
    const sort = 0
    // 获取评论列表
    const newsCommentList = await this.$http.comment.getNewsCommentList({
      id: this.$props.post.id,
      typeId: PROT_TYPE_TYPEID.BIG_WORK,
      sort,
      page: 1,
    })
    const data = Object.assign(
      {
        list: [],
        total: 0,
        page: 0,
        listLoad: false,
      },
      newsCommentList
    )
    data.total = Number(data.total)
    this.newsCommentList.push(data)
  },
  // watch: {
  //   newsCommentList(val) {
  //     this.$nextTick(() => {
  //       // const curDom = document.getElementsByClassName('Comment')[0] // 有数据
  //       // console.log(curDom)
  //     })
  //   },
  // },
  methods: {
    /**
     * @description: 获取帖子评论列表
     */
    getNewsCommentList(page: number) {
      const sort = 0
      return this.$http.comment.getNewsCommentList({
        id: this.$props.post.id,
        typeId: PROT_TYPE_TYPEID.BIG_WORK,
        sort,
        page,
      })
    },
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
    async pageChange(param: IchangeParam) {
      const { page } = param

      // 评论列表切换
      // 请求数据 or 直接切换页码
      if (
        this.newsCommentList.length > page &&
        this.newsCommentList[page].list.length > 0
      ) {
        // 当前页有数据
        this.commentPage = page - 1
        return
      }

      const newsCommentList = await this.getNewsCommentList(page)

      const data = Object.assign(
        {
          list: [],
          total: 0,
          page,
          listLoad: false,
        },
        newsCommentList
      )
      this.newsCommentList[page - 1] = data
      this.commentPage = page - 1
    },

    // /**
    //  * @description: 添加帖子评论
    //  */
    // postComment(index: number) {
    //   const {
    //     commentId,
    //     shardId,
    //     content,
    //     djcarsmid, // 需要加密获取
    //   } = this.newsCommentList[index]
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
