<template>
  <footer class="footer">
    <span>继续阅读与本文标签相同的文章：</span>
    <div class="tag-list">
      <div v-for="item in post.tagNameList" :key="item" class="tag">
        {{ item }}
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ArticleFooter',
  components: {},
  props: {
    // 帖子数据
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
})
</script>
<style lang="scss" scoped>
.footer {
  span {
    font-size: 12px;
    line-height: 12px;
    color: #666;
  }

  .tag-list {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .tag {
      display: flex;
      width: 60px;
      height: 30px;
      margin-right: 10px;
      font-size: 14px;
      line-height: 30px;
      color: #333;
      background-color: #f5f5f5;
      justify-content: center;
    }

    .tag:last-of-type {
      margin: 0;
    }
  }
}
</style>
