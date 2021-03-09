<template>
  <article class="search-input">
    <div v-if="type > 1 && columnName" class="column">
      <p>{{ columnName }}</p>
      <div class="delete" @click="deleteSearchColumn">
        <Icon icon="CloseOrange" />
      </div>
    </div>
    <input v-model="inputValue" class="input" />
    <button type="button" class="button" @click="search">搜索</button>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SearchInput',
  components: {},
  props: {
    keyword: {
      type: String,
      default: '',
    },
    type: {
      type: Number,
      default: 0,
    },
    typeName: {
      type: String,
      default: '',
    },
  },
  emits: ['search', 'deleteSearch'],
  data() {
    return {
      inputValue: '',
      columnName: this.$props.typeName,
    }
  },
  fetch() {
    this.inputValue = this.$props.keyword
  },
  methods: {
    /**
     * @description: 监听搜索
     */
    search() {
      if (!this.inputValue) return
      this.$emit('search', this.inputValue)
    },

    /**
     * @description 清除搜索模式
     */
    deleteSearchColumn() {
      this.columnName = ''
      this.$emit('deleteSearch')
    },
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
