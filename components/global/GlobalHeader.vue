<template>
  <div class="header-wrap">
    <nuxt-link to="/">
      <img src="@images/logo.png" width="160px" height="64px" alt="logo" />
    </nuxt-link>
    <a-menu class="menu" mode="horizontal">
      <a-sub-menu key="mobile" class="menu-item" title="手机端">
        <phone-menu></phone-menu>
      </a-sub-menu>
      <a-sub-menu key="shopping" class="menu-item" title="官方商城">
        <a-menu-item key="taobao">
          <div :style="shopMenuItem" @click="menuClick('taobao')">
            <icon :style="{ marginRight: '10px' }" icon="LogoTaobao" />
            <span>淘宝商城</span>
          </div>
        </a-menu-item>
        <a-menu-item key="tmall">
          <div :style="shopMenuItem" @click="menuClick('tmall')">
            <icon :style="{ marginRight: '10px' }" icon="LogoTmall" />
            <span>天猫商城</span>
          </div>
        </a-menu-item>
        <a-menu-divider :style="{ margin: '0 31px' }"></a-menu-divider>
        <a-menu-item key="miniappBrand">
          <div>
            <icon icon="LogoDjcars" />
            <span>DJCARS潮牌</span>
          </div>
          \
        </a-menu-item>
        <a-menu-item
          :style="{
            width: '100px',
            height: '100px',
            margin: '0 auto 30px',
            padding: '0',
          }"
        >
          <img
            width="100px"
            height="100px"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="图片加载失败"
          />
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="qhc" class="menu-item" @click="menuClick('qhc')"
        >情怀车中心</a-menu-item
      >
      <a-menu-item key="car" class="menu-item" @click="menuClick('vkoll')"
        >专业车膜</a-menu-item
      >
    </a-menu>
    <a-button
      class="search-btn flex-center"
      shape="round"
      @click="showSearchPopup"
    >
      <icon icon="SearchOrange" size="18" />
      <span class="search-btn-text">搜全站</span>
    </a-button>
    <login-button
      v-if="!$accessor.userInfo.isLogin"
      class="login-btn"
      type="link"
      @click="showLoginPopUp"
      >登 录</login-button
    >

    <a-popover
      v-if="$accessor.userInfo.isLogin"
      placement="bottom"
      :overlay-style="{ width: '180px', height: '30px' }"
    >
      <template #content>
        <div class="outLogin">
          <QRCode :src="userWxUrl" />
          <p @click="outLogin">退出登录</p>
        </div>
      </template>
      <!-- 用户头像 -->
      <a-avatar
        class="avatar"
        size="large"
        :src="$accessor.userInfo.smallImageUrl"
      ></a-avatar>
    </a-popover>

    <login-pop-up v-if="$accessor.global.isLoginPopUpShow"></login-pop-up>
    <search-popup v-if="$accessor.global.isSearchPopup"></search-popup>
    <ad-pop-up
      v-if="$accessor.global.isAdPopupShow && this.$route.name === 'index'"
    ></ad-pop-up>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

type clickType = 'taobao' | 'tmall' | 'qhc' | 'vkoll'

export default defineComponent({
  name: 'GlobalHeader',
  emits: ['showSearch'],
  setup() {
    // 商城menu子item样式
    const shopMenuItem = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    // 用户个人小程序链接
    const userWxUrl = 'https://www.djcars.cn/' + 'myself'

    return {
      shopMenuItem,
      userWxUrl,
    }
  },
  data() {
    return {
      showOutLoginBox: false,
    }
  },
  methods: {
    showLoginPopUp() {
      this.$accessor.global.showLoginPopUpOrHide()
    },

    showSearchPopup() {
      this.$accessor.global.showSearchPopup()
    },

    menuClick(type: clickType) {
      switch (type) {
        case 'taobao':
          window.open('https://djcars.taobao.com/', '_blank')
          break
        case 'tmall':
          window.open('https://djcsccp.tmall.com/', '_blank')
          break
        case 'qhc':
          window.open('https://vkool.djcars.cn/', '_blank')
          break
        case 'vkoll':
          window.open('https://vkool.djcars.cn/#/product', '_blank')
          break
        default:
          break
      }
    },

    mouseenter() {
      this.showOutLoginBox = true
    },
    mouseout() {
      this.showOutLoginBox = false
    },
    outLogin() {
      // 退出登录
      // 清除token
      this.$accessor.userInfo.isLogin = false
      this.$cookies.remove('token') // 清除token
    },
  },
})
</script>
<style lang="scss" scoped>
.header-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 8px 15px;
  background: #fff;
  box-shadow: inset 0 -1px 0 0 #e6e6e6;
  display: flex;
  align-items: center;

  .menu {
    padding-left: 30px;
    border: none;
    display: flex;

    .menu-item {
      padding: 0 30px;
      font-size: 16px;
      color: #000;
      border: none;

      &:hover {
        color: $primary-color;
      }
    }
  }

  .btn-init {
    border: none;
    box-shadow: none;
  }

  .search-btn {
    width: 120px;
    height: 40px;
    margin-left: auto;
    line-height: 40px;
    background-color: #fff0e6;
    @extend .btn-init;
    @include text(16px, $primary-color, bold);

    .search-btn-text {
      margin-left: 5px;
    }
  }

  .avatar {
    margin-left: 34px;
  }

  .login-btn {
    color: #3a3a3a;
    margin-left: 19px;
    @extend .btn-init;

    &:hover {
      color: $primary-color;
    }
  }
}

.ant-menu .ant-menu-item-selected {
  color: #000;
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background-color: #fff;
}

.outLogin {
  width: 180px;
  height: 236px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15);
  position: absolute;
  bottom: -215px;
  right: 0;

  .code {
    width: 180px;
    height: 180px;
  }

  > p {
    height: 56px;
    box-shadow: inset 0 -1px 0 0 #e6e6e6;
    text-align: center;
    line-height: 56px;
    margin-bottom: 0;
    @include text(16px, #888);
  }
}
</style>
