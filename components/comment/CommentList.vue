<template>
  <article v-if="newsCommentList.length" class="commentList">
    <Comment
      v-for="item in newsCommentList[commentPage].list"
      :key="item.id"
      :comment="item"
      :post="post"
      :open-reply-id="openReplyId"
      class="Comment"
      @reply="reply"
      @send="send"
    >
      <Comment
        v-if="item.replayCommentDto"
        :open-reply-id="openReplyId"
        :post="post"
        :comment="item.replayCommentDto"
        :comment-type="true"
        @send="sendItem"
      />
      <!-- 查看全部6条回复 -->
      <p class="seeCommentDatails">查看全部6条回复-暂未开放</p>
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
  openReplyId: String
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
      openReplyId: '',
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
    /**
     * @description: 点击回复评论
     */
    send(value: any) {
      this.openReplyId = '' // 清除回复框
      console.log(value)
    },
    /**
     * @description: 点击回复评论回复
     */
    sendItem(value: any) {
      this.openReplyId = '' // 清除回复框
      console.log(value)
    },
    /**
     * @description: 点击回复
     */
    reply(id: string) {
      this.openReplyId = id // 清除回复框
    },
  },
})
</script>

<style lang="scss" scoped>
.Comment {
  margin-bottom: 20px;
}

.seeCommentDatails {
  @include text(14px, #ff8b00);
}
</style>
