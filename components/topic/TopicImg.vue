<template>
  <div class="container">
    <div>
      <img src="../../assets/images/program_left.png" alt="" />
    </div>
    <div>
      <img :src="imgUrl" alt="图片加载失败" />
      <span class="tag">王牌节目</span>
    </div>
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

  & > div:not(:nth-child(2)) {
    width: 30px;
    height: 272px;
  }

  & > div:nth-child(2) {
    position: relative;
    width: 234px;
    height: 312px;
    overflow: hidden;
    border-radius: 4px;

    img {
      width: 100%;
      height: 100%;
    }

    span {
      position: absolute;
      top: 0;
      right: 0;
      width: 64px;
      height: 24px;
      font-size: 12px;
      line-height: 24px;
      color: #fff;
      text-align: center;
      background-image: linear-gradient(45deg, #ffa347 0%, #ff8022 100%);
    }
  }
}
</style>
