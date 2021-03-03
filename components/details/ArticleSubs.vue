<template>
  <aside v-if="userInfo" class="subs">
    <div class="subs-title">节目主持人</div>
    <div class="subs-msg">
      <div class="subs-msg-img">
        <img :src="userInfo.smallImageUrl" alt="" />
      </div>
      <div class="subs-msg-text">
        <div class="subs-msg-text-name">{{ userInfo.nickname }}</div>
        <div class="subs-msg-text-num">
          {{ userInfo.imageCount }}图文 · {{ userInfo.videoCount }}视频
        </div>
        <div class="subs-msg-text-tips">{{ userInfo.introduction }}</div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

interface IData {
  userInfo: {
    userId: number
    kol: number
    nickname: string
    description: string
    smallImageUrl: string
  }
}

export default defineComponent({
  name: 'ArticleSubs',
  components: {},
  props: {
    // 帖子信息
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data(): IData {
    return {
      userInfo: {
        userId: 0,
        kol: 0,
        nickname: 'suilong',
        description: 'suilong',
        smallImageUrl: '',
      },
    }
  },
  async fetch() {
    // 获取作者消息
    const userId = this.$props.post.userId
    const getUserInfo = await this.$http.kol.getUserInfo({
      userId,
    })

    this.userInfo = Object.assign(getUserInfo)
  },
})
</script>
<style lang="scss" scoped>
.subs {
  display: flex;
  width: 295px;
  flex-direction: column;

  &-title {
    @include text(20px, #000000, bold);
  }

  &-msg {
    display: flex;

    &-img {
      display: flex;
      width: 80px;
      height: 80px;
      margin-right: 20px;
      background-color: #e6e6e6;
      border-radius: 50%;
      overflow: hidden;
      align-items: center;
      justify-content: center;
    }

    &-text {
      flex: 1;

      &-name {
        @include text(16px, #000000, bold);

        margin-bottom: 10px;
      }

      &-num {
        @include text(12px, #666666);

        margin-bottom: 10px;
      }

      &-tips {
        @include text(14px, #333333);
      }
    }
  }

  > * {
    // 子间距为4px
    margin-bottom: 20px;
  }
}
</style>
