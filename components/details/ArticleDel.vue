<template>
  <div class="container">
    <icon icon="ArticleListNone" size="100"></icon>
    <p>内容已删除或正在审核，稍候再看吧～</p>
    <nuxt-link to="/">去首页</nuxt-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ArticleFooter',
  methods: {
    /**
     * @description: 跳转至搜索页  标签搜索
     */
    navSearch(value: string, type: number) {
      value = encodeURIComponent(value)
      this.$router.push({
        path: `/Search?keyword=${value}&type=${type}`,
      })
    },
  },
})
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 192px;

  p {
    margin: 20px 0 0;
    line-height: 1.2;
    @include text($font-size-lg, #999999);
  }

  a {
    width: 100px;
    height: 40px;
    background-color: #ff8022;
    margin-top: 30px;
    border-radius: 4px;
    text-align: center;
    line-height: 40px;
    @include text($font-size-lg, #ffffff, bold);
  }
}
</style>
