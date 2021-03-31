<template>
  <div class="list-container">
    <a-list :grid="{ gutter: 20, column: 4 }" v-bind="$attrs" :split="false">
      <a-list-item slot="renderItem" slot-scope="item">
        <article-card :item="item"></article-card>
      </a-list-item>
    </a-list>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ArticleCard from './ArticleCard.vue'

export default defineComponent({
  name: 'ArticleList',
  components: {
    ArticleCard,
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
