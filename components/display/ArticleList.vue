<template>
  <div class="list-container">
    <load-ani v-if="load"></load-ani>
    <div v-else-if="none" class="none">
      <icon icon="ArticleListNone" size="100"></icon>
      <span>暂无出品</span>
    </div>
    <div v-else class="articleFlex">
      <div v-for="(item, index) in list" :key="index" class="articleItem">
        <article-card :item="item"></article-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import ArticleCard from './ArticleCard.vue'
import LoadAni from './LoadAni.vue'

export default defineComponent({
  name: 'ArticleList',
  components: {
    ArticleCard,
    LoadAni,
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
