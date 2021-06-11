<template>
  <div class="container">
    <a-radio-group v-model="value" @change="onChange">
      <a-space :size="10">
        <a-radio-button
          v-for="(item, index) in readioList"
          :key="index"
          class="radio-btn"
          :value="index"
        >
          {{ item }}
        </a-radio-button>
      </a-space>
    </a-radio-group>
    <a-input-search
      class="search"
      :placeholder="placeholder"
      :style="searchStyle"
      @search="onSearch"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'RadioAndSearch',
  props: {
    default: {
      type: Number,
      default: 0,
    },
  },
  emits: ['search', 'radio'],
  setup(_props, context) {
    const readioList = ref<Array<string>>(['全部', '图文', '视频'])
    const searchStyle = 'width: 190px; background: #f5f5f5; box-shadow: none;'

    /**
     * @description: 监听搜索
     */
    const onSearch = (value: string): void => {
      if (!value.trim()) return
      context.emit('search', value)
    }

    /**
     * @description: 监听radio改变
     */
    const onChange = (e: Event): void => {
      const target = e.target as HTMLInputElement
      const value = target.value
      context.emit('radio', value)
    }

    return {
      readioList,
      searchStyle,
      onSearch,
      onChange,
    }
  },
  data() {
    return {
      value: 0,
      placeholder: '',
    }
  },
  watch: {
    default(val) {
      this.value = val
    },
  },
  created() {
    let placeholder = ''
    const routeName = this.$route.name
    switch (routeName) {
      case 'category':
        placeholder = '分类内搜索'
        break
      case 'program':
        placeholder = '节目内搜索'
        break
      case 'kol':
        placeholder = '搜索Ta的出品'
        break
      default:
        break
    }

    this.placeholder = placeholder
  },
})
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  max-width: $container-width;
  margin: 0 auto;

  .radio-btn {
    border-radius: 16px;
    outline: none;
  }

  /deep/ input {
    background-color: #f5f5f5;
  }
}
</style>
