<template>
  <div class="container">
    <div class="left">
      <div
        v-for="(item, index) in menuPhoneList"
        :key="index"
        class="left-item"
        @mouseover="mouseOver($event, index)"
        @mouseout="mouseOut($event)"
      >
        <icon :icon="item.icon" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="right">
      <div class="qrbox">
        <img
          width="160px"
          height="160px"
          alt="图片加载失败"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <p class="title">公众号</p>
        <p class="desc">真人真话，道出专业与事实</p>
      </div>
      <div class="qrbox">
        <img
          width="160px"
          height="160px"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          alt="图片加载失败"
        />
        <p class="title">小程序</p>
        <p class="desc">真人真话，道出专业与事实</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'PhoneMenu',
  setup() {
    const menuPhoneList = reactive([
      { icon: 'LogoDjcars', name: '大家车言论', offic: 'red', miniapp: 'red' },
      { icon: 'LogoMall', name: '大家车商城', offic: 'blue', miniapp: 'blue' },
      {
        icon: 'LogoQuestion',
        name: '大家车问',
        offic: 'orange',
        miniapp: 'red',
      },
      {
        icon: 'LogoObservation',
        name: '大家车观测',
        offic: 'blue',
        miniapp: 'blue',
      },
      { icon: 'LogoYue', name: '粤爱车', offic: 'red', miniapp: 'orange' },
      { icon: 'LogoGame', name: '小游戏', offic: 'orange', miniapp: 'blue' },
      { icon: 'LogoApp', name: '手机应用APP', offic: 'red', miniapp: 'orange' },
    ])
    const imgSrc = reactive({
      offic: '',
      miniapp: '',
    })
    const phoneItem = ref<null | HTMLElement>(null)
    const mouseOver = (event: MouseEvent, index: number) => {
      const dom = event.target as HTMLElement
      imgSrc.offic = menuPhoneList[index].offic
      imgSrc.miniapp = menuPhoneList[index].miniapp
      getDiv(dom, true)
    }
    const mouseOut = (event: MouseEvent) => {
      const dom = event.target as HTMLElement
      getDiv(dom, false)
    }
    const getDiv = (dom: HTMLElement, isMouse: boolean) => {
      if (dom.localName !== 'div') {
        const parentNode = dom.parentNode as HTMLElement
        getDiv(parentNode, isMouse)
      } else {
        dom.className = isMouse ? 'left-item active' : 'left-item'
      }
    }

    return {
      menuPhoneList,
      mouseOver,
      mouseOut,
      phoneItem,
      imgSrc,
    }
  },
})
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  display: flex;
  background-color: #fff;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15);

  .left {
    display: flex;
    flex-direction: column;

    .left-item {
      display: flex;
      width: 200px;
      height: 60px;
      padding-left: 20px;
      align-items: center;

      span {
        margin-left: 16px;
      }
    }

    .active {
      padding-left: 16px;
      color: #ff8022;
      background-color: #fff0e6;
      border-left: solid 4px #ff8022;
    }
  }

  .right {
    display: flex;
    width: 500px;
    height: 420px;
    background-color: #fff;
    box-shadow: inset 1px 0 0 0 #e6e6e6;
    align-items: center;
    justify-content: center;

    .qrbox:first-child {
      margin-right: 60px;
    }

    .qrbox {
      text-align: center;

      .title {
        margin: 16px 0 8px;
        line-height: 16px;

        @include text($font-size-lg, #212121, bold);
      }

      .desc {
        line-height: 12px;

        @include text($font-size-sm, #636363);
      }
    }
  }
}
</style>
