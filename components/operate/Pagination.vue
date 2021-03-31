<template>
  <a-pagination
    class="pagination"
    :item-render="itemRender"
    hide-on-single-page
    show-less-items
    :default-page-size="16"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Pagination',
  inheritAttrs: false,
  methods: {
    itemRender(_current: number, type: string, originalElement: any): any {
      if (type === 'prev') {
        return this.$createElement(
          'a',
          { class: originalElement.data.class, style: { width: '78px' } },
          ['上一页']
        )
      } else if (type === 'next') {
        return this.$createElement(
          'a',
          { class: originalElement.data.class, style: { width: '78px' } },
          ['下一页']
        )
      }
      return originalElement
    },
  },
})
</script>
<style lang="scss" scoped>
.pagination {
  text-align: center;

  /deep/ .ant-pagination-item-active {
    background-color: $primary-color;

    a {
      color: #fff;
    }
  }
}
</style>
