<template>
  <aside v-if="listByHostUserId.list.length" class="subs">
    <div class="subs-title">所属分类</div>
    <div v-for="item in listByHostUserId.list" :key="item.id" class="subs-msg">
      <div class="subs-msg-img">
        <img :src="item.smallImageUrl" alt="" />
      </div>
      <div class="subs-msg-text">
        <div class="subs-msg-text-name">{{ item.name }}</div>
        <div class="subs-msg-text-num">
          {{ item.imageCount }}图文 · {{ item.videoCount }}视频
        </div>
        <div class="subs-msg-text-tips">{{ item.description }}</div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

interface IData {
  listByHostUserId: {
    total: number
    list: any[]
  }
}

export default defineComponent({
  name: 'ArticleSort',
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
      listByHostUserId: {
        total: 0,
        list: [],
      },
    }
  },
  async fetch() {
    // 获取节目分类
    const listByHostUserId = await this.$http.kol.getListByHostUserId({
      userId: this.$props.post.userId,
    })
    this.listByHostUserId.total = listByHostUserId.total
    this.listByHostUserId.list = this.listByHostUserId.list.concat(
      listByHostUserId.list
    )
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
