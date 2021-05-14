<template>
  <aside v-if="post.opItemCategoryDto" class="subs">
    <div class="subs-title">所属分类</div>
    <div class="subs-msg" @click="navCategory(post.opItemCategoryDto.id)">
      <div class="subs-msg-img">
        <img :src="post.opItemCategoryDto.smallImageUrl" alt="" />
      </div>
      <div class="subs-msg-text">
        <div class="subs-msg-text-name">{{ post.opItemCategoryDto.name }}</div>
        <div class="subs-msg-text-num">
          {{ post.opItemCategoryDto.imageCount }}图文 ·
          {{ post.opItemCategoryDto.videoCount }}视频
        </div>
        <div class="subs-msg-text-tips">
          {{ post.opItemCategoryDto.description }}
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

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
  methods: {
    /**
     * @description: 跳转至分类
     */
    navCategory(id: number) {
      this.$router.push(`/Category/${id}`)
    },
  },
})
</script>
<style lang="scss" scoped>
.subs {
  display: flex;
  width: 295px;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 60px !important;

  &-title {
    margin-bottom: 20px !important;
    @include text(20px, #000000, bold);
  }

  &-msg {
    display: flex;

    &-img {
      display: flex;
      width: 80px;
      height: 80px;
      margin-right: 20px;
      border-radius: 50%;
      overflow: hidden;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
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
        line-height: 1.4;
        @include text(14px, #333333);

        @include text-multi(2);
      }
    }
  }

  > *:not(:last-child) {
    // 子间距为4px
    margin-bottom: 30px;
  }
}
</style>
