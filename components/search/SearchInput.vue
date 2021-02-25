<template>
  <article class="search-input">
    <div class="column">
      <p>KOL名称</p>
      <Icon icon="CloseOrange" />
    </div>
    <input v-model="inputValue" class="input" />
    <button type="button" class="button" @click="search">搜索</button>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SearchInput',
  components: {},
  props: {
    keyword: {
      type: String,
      default: '',
    },
  },
  emits: ['search'],
  setup(props, context) {
    /**
     * @description: 监听输入值
     */
    const inputValue = ref(props.keyword)

    /**
     * @description: 监听搜索
     */

    const search = () => {
      context.emit('search', inputValue.value)
    }

    return {
      search,
      inputValue,
    }
  },
})
</script>

<style lang="scss" scoped>
// 原生样式覆盖
p {
  margin: 0;
}
// end

.search-input {
  display: flex;
  height: 48px;
  max-width: 820px;
  background-color: #fff;
  border: solid 1px #ebebeb;
  box-sizing: border-box;
  align-items: center;

  .column {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 10px;
    margin-right: 10px;
    margin-left: 10px;
    background-color: #fff8f2;
    border-radius: 4px;

    > p {
      margin-right: 10px;
      font-size: 16px;
      line-height: 16px;
      color: #ff8022;
    }
  }

  .input {
    height: 46px;
    padding: 0 20px;
    font-size: 14px;
    color: #000;
    border: none;
    border-radius: 0;
    box-sizing: border-box;
    flex: 1;
  }

  .button {
    width: 86px;
    height: 48px;
    color: #fff;
    background: $primary-color;
    border: none;
    border-radius: 0;
  }

  .button:hover {
    background: $button-hover;
  }
}
</style>
