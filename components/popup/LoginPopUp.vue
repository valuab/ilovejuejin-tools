<template>
  <a-modal
    v-model="show"
    dialog-class="dialog-class"
    :footer="null"
    centered
    @cancel="hideLoginPopUp"
  >
    <div class="login-wrap">
      <h2 class="login-title">微信扫码登录</h2>
      <div v-show="!isChecked" class="qrcode-mask">
        <div class="tips">同意协议后才可登录</div>
      </div>
      <div v-show="isChecked" id="login-main"></div>
      <div class="login-operate">
        <a-checkbox :checked="isChecked" @change="change" />
        <span class="checkbox-text">
          已阅读并同意
          <nuxt-link
            to="/loginProtocol"
            :target="$accessor.global.navTarget"
            style="color: #ff8b00"
            >《服务使用协议》</nuxt-link
          >
          <nuxt-link
            to="/loginPrivacy"
            :target="$accessor.global.navTarget"
            style="color: #ff8b00"
            >《隐私政策》</nuxt-link
          >
        </span>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import config from '~/assets/ts/config'

const wxLoginCSSlink = `${config.ASSETS_URL}/public/stylesheets/wxLogin.css`
export default defineComponent({
  name: 'LoginPopUp',
  data() {
    return {
      show: true,
      isChecked: false,
    }
  },
  mounted() {
    const REDIRECT_URL = process.env.REDIRECT_URL
    const APP_ID = process.env.APP_ID

    this.$nextTick(() => {
      ;(window as any).WxLogin({
        self_redirect: false,
        id: 'login-main',
        appid: APP_ID,
        scope: 'snsapi_login,snsapi_userinfo',
        redirect_uri: encodeURIComponent(
          REDIRECT_URL + this.$route.fullPath // 加参数
        ),
        state: 'wxLogin',
        href: wxLoginCSSlink,
      })
    })
  },
  methods: {
    hideLoginPopUp() {
      this.$accessor.global.showLoginPopUpOrHide()
    },

    change() {
      this.isChecked = !this.isChecked
    },
  },
})
</script>

<style lang="scss" scoped>
::v-deep .dialog-class {
  width: 400px !important;
}

.login-wrap {
  position: relative;
  @include flex(column, center, center);

  #login-main {
    height: 204px;
    overflow: hidden;
  }

  .qrcode-mask {
    height: 180px;
    width: 180px;
    margin-top: 25px;
    background: #f5f5f5;
    .tips {
      width: 180px;
      height: 180px;
      line-height: 200px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.7);

      @include text(14px, #ffffff);
    }
  }

  .login-title {
    margin-bottom: 0;
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
    color: #000;
  }

  .login-hint {
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    line-height: 200px;
    color: #fff;
  }

  .login-operate {
    margin-top: 30px;
    margin-bottom: 26px;

    .checkbox-text {
      font-size: 12px;
      color: #717171;
    }
  }
}
</style>
