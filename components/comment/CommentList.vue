<template>
  <div v-if="newsCommentList.length" id="commentList" class="commentList">
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
      <div v-if="item.openAllReply.length" class="commentItemList">
        <Comment
          v-for="kind in item.newCommentReplyList"
          :key="kind.id"
          :open-reply-id="openReplyId"
          :post="post"
          :comment="kind"
          :comment-type="true"
          @reply="reply"
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
      v-anchor="'commentList'"
      :default-page-size="10"
      :total="newsCommentList[commentPage].total"
      :current="newsCommentList[commentPage].page"
      class="pagination"
      @change="pageChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { ICommentList } from '@apiPublic/type'

// 获取枚举类型
import { PROT_TYPE_TYPEID } from '@/enums/content'

interface IData {
  newsCommentList: ICommentList[]
  commentPage: number
  openReplyId: string
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
    // if (this.$props.post.commentCount === 0) return
    // const viewUserId = this.$accessor.userInfo.userId
    // 获取评论列表
    let getComment
    if (this.$accessor.userInfo.isLogin) {
      getComment = this.$http.comment.getWxSelectCommentList
    } else {
      getComment = this.$http.comment.getNoLoginWxSelectCommentList
    }
    const newsCommentList = await getComment({
      id: this.$props.post.id,
      typeId: PROT_TYPE_TYPEID.CAR_TALK,
      page: 1,
    })
    for (const i in newsCommentList.list) {
      newsCommentList.list[i].openAllReply = [] // 关闭全部回复
      newsCommentList.list[i].newCommentReplyList = []
    }
    const data = Object.assign(
      {
        list: [],
        total: 0,
        page: 1,
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
    getWxSelectCommentList(page: number) {
      let getComment
      if (this.$accessor.userInfo.isLogin) {
        getComment = this.$http.comment.getWxSelectCommentList
      } else {
        getComment = this.$http.comment.getNoLoginWxSelectCommentList
      }
      return getComment({
        id: this.$props.post.id,
        typeId: PROT_TYPE_TYPEID.CAR_TALK,
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
    async pageChange(page: number) {
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

      const newsCommentList = await this.getWxSelectCommentList(page)

      for (const i in newsCommentList.list) {
        newsCommentList.list[i].openAllReply = [] // 关闭全部回复
        newsCommentList.list[i].newCommentReplyList = []
      }

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
      if (!comment) return
      // 处理回复数据
      this.openReplyId = '' // 清除回复框
      for (const i in this.newsCommentList[this.commentPage].list) {
        const { id }: any = this.newsCommentList[this.commentPage].list[i]
        if (comment.parentId === id) {
          const { newCommentReplyList }: any = this.newsCommentList[
            this.commentPage
          ].list[i]
          // 开启
          const { openAllReply }: any = this.newsCommentList[
            this.commentPage
          ].list[i]
          openAllReply.push(1)
          newCommentReplyList.push(comment)
          console.log(newCommentReplyList)
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
          // 排除 parentId === 0
          allNewCommentReplyList.list.forEach((item, j) => {
            if (item.parentId === '0') {
              allNewCommentReplyList.list.splice(j, 1)
            }
          })
          newCommentReplyList.push(...allNewCommentReplyList.list)

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
      console.log(id)
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

.pagination {
  display: block;
  width: 500px;
  height: 500px;
}
</style>
