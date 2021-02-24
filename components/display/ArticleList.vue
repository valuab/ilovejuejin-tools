<template>
  <div class="list-container">
    <div v-if="none" class="none">
      <icon icon="ArticleListNone" size="100"></icon>
      <span>暂无出品</span>
    </div>
    <a-list
      v-else
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
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import ArticleCard from './ArticleCard.vue'
// import LoadAni from './LoadAni.vue'

export default defineComponent({
  name: 'ArticleList',
  components: {
    ArticleCard,
    // LoadAni,
  },
  props: {
    // 文章当前页列表
    list: {
      type: Array,
      default: () => {
        const list = reactive<Array<number>>([])
        for (let i = 0; i < 20; i++) {
          list.push(i)
        }
        return list
      },
    },
    none: {
      type: Boolean,
      default: false,
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
