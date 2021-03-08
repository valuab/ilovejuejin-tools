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
      <!-- 回复列表 -->
      <div v-if="item.newCommentReplyList.length" class="commentItemList">
        <Comment
          v-for="kind in item.newCommentReplyList"
          :key="kind.id"
          :open-reply-id="openReplyId"
          :post="post"
          :comment="kind"
          :comment-type="true"
          @send="send"
        />
      </div>
      <!-- 查看全部6条回复 -->
      <p
        v-if="item.floorReplyCount > 1 && !item.openAllReply.length"
        class="seeCommentDatails"
        @click="seeCommentDatails(item)"
      >
        查看全部{{ item.floorReplyCount }}条回复
      </p>
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
    for (const i in newsCommentList.list) {
      newsCommentList.list[i].openAllReply = [] // 关闭全部回复
      newsCommentList.list[i].newCommentReplyList = []
      newsCommentList.list[i].newCommentReplyList.push(
        newsCommentList.list[i].replayCommentDto
      ) // 查看全部回复管理
    }
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
    // 获取评论回复列表
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
     * @description: 评论回复列表
     */
    getNewCommentReplyList(comment: object) {
      const { id, contentId }: any = comment
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
     * @description: 回复当前评论
     */
    send(comment: any) {
      this.openReplyId = '' // 清除回复框
      for (const i in this.newsCommentList[this.commentPage].list) {
        const { id }: any = this.newsCommentList[this.commentPage].list[i]
        if (comment.parentId === id) {
          // 造作
          // console.log(comment)
          // console.log(this.newsCommentList[this.commentPage].list[i])
          const { newCommentReplyList }: any = this.newsCommentList[
            this.commentPage
          ].list[i]
          newCommentReplyList.push(comment)
        }
      }
    },
    /**
     * @description: 查看全部回复
     */
    async seeCommentDatails(comment: any) {
      const allNewCommentReplyList = await this.getNewCommentReplyList(comment)
      // 获取
      for (const i in this.newsCommentList[this.commentPage].list) {
        const { id }: any = this.newsCommentList[this.commentPage].list[i]
        if (comment.id === id) {
          const { newCommentReplyList }: any = this.newsCommentList[
            this.commentPage
          ].list[i]
          newCommentReplyList.length = 0
          newCommentReplyList.push(allNewCommentReplyList.list)

          const { openAllReply }: any = this.newsCommentList[
            this.commentPage
          ].list[i]
          openAllReply.push(1)
        }
      }
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
