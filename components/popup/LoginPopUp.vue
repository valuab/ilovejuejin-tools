<template>
  <a-modal
    v-model="isLoginPopUpShow"
    dialog-class="dialog-class"
    :footer="null"
    centered
  >
    <div class="login-wrap">
      <h2 class="login-title">微信扫码登录</h2>
      <div id="login-main">
        123
        <!-- <div class="login-hint">同意协议后才可登录</div> -->
      </div>
      <div class="login-operate">
        <a-checkbox />
        <span class="checkbox-text">
          已阅读并同意
          <a style="color: #ff8b00">"使用条款和隐私政策"</a>
        </span>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import wxConfig from '~/config/wxConfig'

const wxLoginCSSlink = `${process.env.BASE_URL}/public/stylesheets/wxLogin.css`
export default defineComponent({
  name: 'LoginPopUp',
  data() {
    return {
      isLoginPopUpShow: true,
    }
  },
  mounted() {
    // TODO: appId需要通过api请求
    this.$nextTick(() => {
      ;(window as any).WxLogin({
        self_redirect: false,
        id: 'login-main',
        appid: wxConfig.APP_ID,
        scope: 'snsapi_login,snsapi_userinfo',
        redirect_uri: encodeURIComponent(
          wxConfig.REDIRECT_URL + this.$route.path
        ),
        state: 'wxLogin',
        href: wxLoginCSSlink,
      })
    })
  },
})
</script>

<style lang="scss" scoped>
::v-deep .dialog-class {
  width: 400px !important;
}

.login-wrap {
  @include flex(column, center, center);

  .login-title {
    margin-bottom: 24px;
    font-size: 24px;
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

    .checkbox-text {
      font-size: 12px;
      color: #717171;
    }
  }
}
</style>
