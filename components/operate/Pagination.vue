<template>
  <a-pagination
    class="pagination"
    :total="total"
    :default-page-size="defaultPageSize"
    hide-on-single-page
    show-less-items
    @change="onChange"
  >
    <template #itemRender="{ type, originalElement }">
      <a v-if="type === 'prev'">上一页</a>
      <a v-else-if="type === 'next'">下一页</a>
      <renderVNode v-else :vnode="originalElement"></renderVNode>
    </template>
  </a-pagination>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Pagination } from 'ant-design-vue'

function renderVNode(_: any, { attrs: { vnode } }: any) {
  return vnode
}

export interface IchangeParam {
  page: number
  pageSize: number
}

export default defineComponent({
  name: 'Pagination',
  components: {
    APagination: Pagination,
    renderVNode,
  },
  props: {
    // 总数
    total: {
      type: Number,
      default: 100,
    },
    // 每页数量
    defaultPageSize: {
      type: Number,
      default: 20,
    },
  },
  emits: ['change'],
  setup(_props, context) {
    /**
     * @description: 改变页码
     * @param page 当前页码
     * @param pageSize 当前页数量
     */
    const onChange = (page: Number, pageSize: Number) => {
      context.emit('change', { page, pageSize })
    }
    return {
      onChange,
    }
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
