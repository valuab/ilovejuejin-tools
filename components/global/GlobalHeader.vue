<template>
  <div class="header-wrap flex-vertical-center">
    <nuxt-link to="/">
      <img class="logo" src="@images/logo.png" width="160px" height="64px" />
    </nuxt-link>
    <a-menu class="menu" mode="horizontal">
      <a-sub-menu key="mobile" class="menu-item" title="手机端">
        <!-- <phone-menu></phone-menu> -->
      </a-sub-menu>
      <a-sub-menu key="shopping" class="menu-item" title="官方商城">
        <a-menu-item key="taobao">
          <a href="https://djcars.taobao.com/" target="_blank">
            <icon icon="LogoTaobao" width="20px" height="20px" />
            淘宝商城
          </a>
        </a-menu-item>
        <a-menu-item key="tmall">
          <icon icon="LogoTmall" />
          天猫商城
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="qhc" class="menu-item">情怀车中心</a-menu-item>
      <a-menu-item key="car" class="menu-item">专业车膜</a-menu-item>
    </a-menu>
    <!-- <global-button
      class="search-btn flex-center"
      shape="round"
      @click="ifSearchpopup"
    >
      <template #icon><icon icon="SearchOrange" /></template>
      <span class="search-btn-text">搜全站</span>
    </global-button> -->
    <!-- <global-button class="login-btn" @click="loginShow">登录</global-button> -->
    <a-avatar class="avatar" size="large"></a-avatar>
    <!-- <global-login /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
// import PhoneMenu from '/@components/display/PhoneMenu.vue'

export default defineComponent({
  name: 'GlobalHeader',
  components: {
    // PhoneMenu,
  },
  emits: ['showSearch'],
  setup(_props, context) {
    // 点击搜全站
    const ifSearchpopup = () => {
      context.emit('showSearch')
    }
    return {
      ifSearchpopup,
    }
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
  height: 80px;
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
</style>
