<template>
  <div class="box">
    <div v-for="(item, index) in list" :key="index">
      <topic-item class="topic-item" :data="item"></topic-item>
    </div>
    <a-button v-if="list.length < total" class="add-btn" @click="addList">
      查看更多
    </a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ICommendListType } from '@/api/apiPublic/modules/topic'

interface IData {
  list: Array<ICommendListType>
  total: number
  page: number
}

export default defineComponent({
  name: 'TopicList',
  async asyncData({ app }) {
    const { list, total } = await app.$http.topic.getCommendItemList({
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
  methods: {
    async addList() {
      const { list } = await this.$http.topic.getCommendItemList({
        page: this.page++,
      })
      this.list = this.list.concat(list)
    },
  },
})
</script>

<style lang="scss" scoped>
.box {
  width: 1280px;
  padding: 0 20px;
  margin: 0 auto 60px;

  .topic-item {
    padding-top: 60px;
  }

  .add-btn {
    display: block;
    width: 300px;
    height: 60px;
    margin: 60px auto 0;
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
