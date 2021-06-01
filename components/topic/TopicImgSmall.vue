<template>
  <div class="container">
    <div>
      <img src="../../assets/images/program_left.png" alt="" />
    </div>
    <img :src="imgUrl" alt="图片加载失败" />
    <div>
      <img src="../../assets/images/program_right.png" alt="" />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'TopicImg',
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
  },
})
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  transition: all 1s;
  align-items: center;

  & > div {
    width: 16px;
    height: 120px;
    & > img {
      width: 100%;
      height: 100%;
    }
  }

  & > img {
    width: 108px;
    height: 144px;
    overflow: hidden;
    border-radius: 4px;
  }
}
</style>
