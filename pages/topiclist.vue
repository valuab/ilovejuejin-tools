<template>
  <!-- <menu-container :style="{ width: '100%', backgroundColor: '#fff' }">
    <div class="box">
      <div v-for="(item, index) in dataList.list" :key="index">
        <topic-item class="topic-item" :data="item"></topic-item>
      </div>
      <global-button
        v-if="dataList.list.length < dataList.total"
        class="add-btn"
        @click="addList"
      >
        查看更多
      </global-button>
    </div>
  </menu-container> -->
  <div>
    <div>aaaa</div>
    <div>aaaa</div>
    <div>aaaa</div>
    <div>aaaa</div>
    <div>aaaa</div>
    <div>aaaa</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TopicList',
  components: {
    // TopicItem,
  },
  // setup() {
  //   const dataList = reactive({
  //     list: [],
  //     page: 1,
  //     total: 0,
  //   })

  //   /**
  //    * @description: 点击查看更多
  //    */
  //   function addList(): void {
  //     http(ApiLink.getCommendItemList, { page: dataList.page }).then(
  //       (res: any) => {
  //         dataList.list = dataList.list.concat(res.result.list)
  //         dataList.page += 1
  //         dataList.total = res.result.total
  //       }
  //     )
  //   }

  //   addList()

  //   return {
  //     dataList,
  //     addList,
  //   }
  // },
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
