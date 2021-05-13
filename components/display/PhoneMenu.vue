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
        <icon :icon="item.icon" size="30" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="right">
      <div class="qrbox">
        <img
          width="160px"
          height="160px"
          alt="图片加载失败"
          :src="imgSrc.left.img"
        />
        <p class="title">{{ imgSrc.left.title }}</p>
        <p class="desc">{{ imgSrc.left.desc }}</p>
      </div>
      <div class="qrbox">
        <img
          width="160px"
          height="160px"
          :src="imgSrc.right.img"
          alt="图片加载失败"
        />
        <p class="title">{{ imgSrc.right.title }}</p>
        <p class="desc">{{ imgSrc.right.desc }}</p>
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
      {
        icon: 'LogoDjcar',
        name: '大家车言论',
        left: {
          title: '公众号',
          desc: '真人真话，道出专业与事实',
          img: '/qrcode/offic/djcars.png',
        },
        right: {
          title: '小程序',
          desc: '真人真话，道出专业与事实',
          img: '/qrcode/miniapp/djcars.jpg',
        },
      },
      {
        icon: 'LogoMall',
        name: '大家车商城',
        left: {
          title: '公众号',
          desc: '信我们，得好车品',
          img: '/qrcode/offic/shop.png',
        },
        right: {
          title: '小程序',
          desc: '信我们，得好车品',
          img: '/qrcode/miniapp/shop.png',
        },
      },
      {
        icon: 'LogoQuestion',
        name: '大家车问',
        left: {
          title: '公众号',
          desc: '汽车领域的专业问答平台',
          img: '/qrcode/offic/chewen.png',
        },
        right: {
          title: '小程序',
          desc: '汽车领域的专业问答平台',
          img: '/qrcode/miniapp/chewen.jpg',
        },
      },
      {
        icon: 'LogoObservation',
        name: '大家车观察',
        left: {
          title: '公众号',
          desc: '大家车言论的汽车行业观察室',
          img: '/qrcode/offic/observation.jpeg',
        },
        right: {
          title: '小程序',
          desc: '大家车言论的汽车行业观察室',
          img: '/qrcode/miniapp/observation.png',
        },
      },
      {
        icon: 'LogoYue',
        name: '粤爱车',
        left: {
          title: '公众号',
          desc: '华人粤语汽车节目大本营',
          img: '/qrcode/offic/yue.JPG',
        },
        right: {
          title: '小程序',
          desc: '华人粤语汽车节目大本营',
          img: '/qrcode/miniapp/yue.JPG',
        },
      },
      {
        icon: 'LogoGame',
        name: '小游戏',
        left: {
          title: '谁是车神',
          desc: '车迷等级排位赛',
          img: '/qrcode/miniapp/carGodGame.jpg',
        },
        right: {
          title: '冲鸭大疯车',
          desc: '可能是全银河系第二疯狂的赛车小游戏',
          img: '/qrcode/miniapp/runCarGame.jpg',
        },
      },
    ])
    const imgSrc = reactive({
      left: {
        title: '公众号',
        desc: '真人真话，道出专业与事实',
        img: '/qrcode/offic/djcars.png',
      },
      right: {
        title: '小程序',
        desc: '真人真话，道出专业与事实',
        img: '/qrcode/miniapp/djcars.jpg',
      },
    })
    const phoneItem = ref<null | HTMLElement>(null)
    const mouseOver = (event: MouseEvent, index: number) => {
      const dom = event.target as HTMLElement
      imgSrc.left = menuPhoneList[index].left
      imgSrc.right = menuPhoneList[index].right
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
  position: relative;
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
      color: #000;
      cursor: pointer;

      span {
        font-size: 16px;
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
