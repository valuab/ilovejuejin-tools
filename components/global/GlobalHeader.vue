<template>
  <div class="header-wrap flex-center">
    <nuxt-link to="/">
      <img src="@images/logo.png" width="160px" height="64px" alt="logo" />
    </nuxt-link>
    <a-menu class="menu" mode="horizontal">
      <a-sub-menu key="mobile" class="menu-item" title="手机端">
        <!-- <phone-menu></phone-menu> -->
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
          <div :style="shopMenuItem" @click="showSearchPopup">
            <icon :style="{ marginRight: '10px' }" icon="LogoDjcars" />
            <span>DJCARS潮牌</span>
          </div>
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
    <global-button
      class="search-btn flex-center"
      shape="round"
      @click="showSearchPopup"
    >
      <icon icon="SearchOrange" />
      <span class="search-btn-text">搜全站</span>
    </global-button>
    <global-button class="login-btn" @click="loginShow">登录</global-button>
    <a-avatar class="avatar" size="large"></a-avatar>
    <!-- <global-login /> -->
    <search-popup v-if="isSearchShow"></search-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { mapActions } from 'vuex'
import SearchPopup from '../popup/SearchPopup.vue'

type clickType = 'taobao' | 'tmall' | 'qhc' | 'vkoll'

export default defineComponent({
  name: 'GlobalHeader',
  components: { SearchPopup },
  emits: ['showSearch'],
  setup() {
    /**
     * @description: 点击menu
     */
    const menuClick = (type: clickType) => {
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
          window.open('https://vkool.djcars.cn/', '_blank')
          break
        default:
          break
      }
    }

    // 商城menu子item样式
    const shopMenuItem = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    return {
      menuClick,
      shopMenuItem,
    }
  },
  computed: {
    isSearchShow() {
      return this.$store.state.global.isSearchPopup
    },
  },
  methods: {
    loginShow() {
      const that: any = this
      if (that.$store.state.userInfo.isLogin) return
      const userInfo = {
        isLoginShow: true,
      }
      that.$store.dispatch('userInfo/changeLogin', userInfo) // 展示弹窗
    },
    ...mapActions({
      showSearchPopup: 'global/showSearchPopup',
    }),
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

  .menu {
    padding-left: 30px;
    border: none;

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
    margin-left: 19px;

    @extend .btn-init;
  }
}

.ant-menu .ant-menu-item-selected {
  color: #000;
}
</style>
