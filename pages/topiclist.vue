<template>
  <div class="bg">
    <div class="container">
      <template v-for="(item, index) in list">
        <topic-item :key="index" class="topic-item" :data="item"></topic-item>
      </template>
      <a-button v-if="list.length < total" class="add-btn" @click="addList">
        查看更多
      </a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ICommendListType } from '@apiModules/program'

interface IData {
  list: Array<ICommendListType>
  total: number
  page: number
}

export default defineComponent({
  async asyncData({ app }) {
    const { list, total } = await app.$http.program.getCommendItemList({
      count: 10,
      page: 1,
    })

    return {
      list,
      total,
      page: 2,
    }
  },
  data(): IData {
    return {
      list: [],
      total: 0,
      page: 1,
    }
  },
  head() {
    return {
      title: '王牌节目',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: '大家车言论王牌节目',
        },
        {
          hid: 'description',
          name: 'description',
          content: '大家车言论王牌节目',
        },
      ],
    }
  },
  methods: {
    async addList() {
      const { list } = await this.$http.program.getCommendItemList({
        count: 10,
        page: this.page++,
      })
      this.list = this.list.concat(list)
    },
  },
})
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  background-color: #fff;
}
.container {
  width: $container-width;
  padding: 0 20px;
  margin: 0 auto 60px;

  .topic-item {
    padding-top: 60px;
    &:last-child {
      margin-bottom: 60px;
    }
  }

  .add-btn {
    display: block;
    width: 300px;
    height: 60px;
    margin: 60px auto;
    font-size: 16px;
    line-height: 60px;
    color: #666;
    text-align: center;
    background-color: #f5f5f5;
    border: none;
    box-shadow: none;

    &:hover {
      color: $heading-color;
    }
  }
}
</style>
