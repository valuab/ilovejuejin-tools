<template>
  <div class="list-container">
    <a-list
      :grid="{ gutter: 16, column: 4 }"
      :loading="load"
      :data-source="list"
      :split="false"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <article-card :item="item"></article-card>
      </a-list-item>
    </a-list>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// import LoadAni from './LoadAni.vue'

export default defineComponent({
  name: 'ArticleList',
  props: {
    // 文章当前页列表
    list: {
      type: Array,
      required: true,
    },
    load: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
<style lang="scss" scoped>
.list-container {
  width: 100%;
  .none {
    margin-top: 50px;
    @include flex(column, center, center);
    @include text($font-size-base, #cccccc);
  }

  .articleFlex {
    @include flex;

    flex-wrap: wrap;
    margin: 0 -10px;
    .articleItem {
      margin: 0 10px 20px;
    }
  }
}
</style>
