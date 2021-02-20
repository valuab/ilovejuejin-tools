<template>
  <div class="list-container">
    <load-ani v-if="load"></load-ani>
    <div v-else-if="none" class="none">
      <icon icon="ArticleListNone" size="100"></icon>
      <span>暂无出品</span>
    </div>
    <a-row v-else :gutter="16">
      <a-col v-for="(item, index) in list" :key="index" :span="6">
        <article-card :item="item"></article-card>
      </a-col>
    </a-row>
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
  width: 1280px;
  padding: 0 20px;
  .none {
    margin-top: 50px;
    @include flex(column, center, center);
    @include text($font-size-base, #cccccc);
  }
}

.ant-col {
  margin-bottom: 20px;
}
</style>
