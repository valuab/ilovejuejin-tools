<template>
  <aside v-if="hostUserList.length" class="subs">
    <div class="subs-title">{{ change ? '节目主持人' : '本文作者' }}</div>
    <div
      v-for="item in hostUserList"
      :key="item.userId"
      class="subs-msg"
      @click="navKolDetail(item.userId)"
    >
      <div class="subs-msg-img">
        <img :src="item.smallImageUrl" alt="" />
        <div v-if="item.kol" class="icon">
          <Icon icon="NavKol" size="24" />
        </div>
      </div>
      <div class="subs-msg-text">
        <div class="subs-msg-text-name">{{ item.nickname }}</div>
        <div class="subs-msg-text-num">
          {{ item.imageCount }}图文 · {{ item.videoCount }}视频
        </div>
        <div class="subs-msg-text-tips">{{ item.introduction }}</div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

interface IUserInfo {
  userId: number
  kol: number
  nickname: string
  description: string
  smallImageUrl: string
}

interface IData {
  userInfo: IUserInfo
  hostUserList: IUserInfo[]
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
    // 切换名称
    change: {
      type: Boolean,
      default: () => {
        return false
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
      hostUserList: [],
    }
  },
  async fetch() {
    // 判断是否有作者
    if (this.$props.post.hostUserList.length > 0) {
      this.hostUserList = this.hostUserList.concat(
        this.$props.post.hostUserList
      )
      return
    }

    // 获取作者消息
    const userId = this.$props.post.userId
    const getUserInfo = await this.$http.kol.getUserInfo({
      userId,
    })

    this.userInfo = Object.assign(getUserInfo)
    this.hostUserList.push(this.userInfo)
  },
  methods: {
    /**
     * @description: 跳转至kol详情页
     */
    navKolDetail(id: number) {
      this.$router.push(`/kol/${id}`)
    },
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
      align-items: center;
      justify-content: center;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    .icon {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
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

        @include text-multi(2);
      }
    }
  }

  > * {
    // 子间距为4px
    margin-bottom: 20px;
  }
}
</style>
