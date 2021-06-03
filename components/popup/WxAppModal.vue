<template>
  <popup-mask @hide="showFeedBack">
    <div class="container">
      <img src="@images/logo.png" alt="popup_logo" />
      <p>即将打开“大家车”小程序</p>
      <div class="operate">
        <button class="cancel-btn" @click="showFeedBack">取消</button>
        <div v-if="isWeixin" class="launch-btn-bg">
          <wx-open-launch-weapp :username="wxBtnusername" :path="wxPath">
            <script type="text/wxtag-template">
              <div style="color: #fff; width: 240px; font-size: 32px; line-height: 90px; text-align: center">立即打开</div>
            </script>
          </wx-open-launch-weapp>
        </div>
        <button v-else class="open-btn" @click="navWxApp">立即打开</button>
      </div>
    </div>
  </popup-mask>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { wxappUrl } from '@apiModules/mobileModule'

// 默认首页scheme路径
const defaultScheme = 'weixin://dl/business/?t=F0lG3O6kHIu'

export default defineComponent({
  name: 'WxAppModal',
  data() {
    return {
      url: defaultScheme,
      isWeixin: false,
      wxPath: '', // 开放标签跳转路径
      wxBtnusername: 'gh_f36e46000282', // 开放标签跳转小程序原始id
    }
  },
  async mounted() {
    if (
      !navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i
      )
    ) {
      return
    }
    const ua = navigator.userAgent.toLowerCase()
    const name = this.$route.name as string
    const path = wxappUrl.get(name)
    const query = this._eachParams()
    if (
      ua.match(/MicroMessenger/i) &&
      (ua.includes('android') || ua.includes('adr'))
    ) {
      // 安卓系统微信内浏览器
      const wx = require('weixin-js-sdk')
      const url = location.href.split('#')[0]
      const {
        timestamp,
        nonceStr,
        signature,
        appId,
      } = await this.$http.mobile.getJsSdkAll({ url })
      wx.config({
        debug: false,
        appId,
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: ['onMenuShareTimeline'], // 必填，需要使用的JS接口列表
        openTagList: ['wx-open-launch-weapp'],
      })
      wx.ready((res: any) => {
        // eslint-disable-next-line no-console
        console.log(res, 'ready')
      })
      wx.error((err: any) => {
        // eslint-disable-next-line no-console
        console.log(err, 'error')
      })
      this.wxBtnusername =
        process.env.BASE_URL === 'http://192.168.5.202:9037'
          ? 'gh_508269bc3f09'
          : 'gh_f36e46000282'
      this.wxPath = `${path}.html?${query}`
      this.isWeixin = true
    } else {
      // 其他浏览器
      const scheme = await this.$http.mobile.getUrlScheme({
        path: path as string,
        query,
      })
      const url = scheme || defaultScheme
      location.href = url
      this.url = url
    }
  },
  methods: {
    /**
     * @description: 弹窗隐藏
     */
    showFeedBack() {
      this.$accessor.global.showWxAppPopup(false)
    },

    /**
     * @description: 点击跳转小程序
     */
    navWxApp() {
      location.href = this.url
    },

    /**
     * @description: 循环遍历当前路由参数
     */
    _eachParams() {
      const { params, query } = this.$route
      let str = ''
      if (Object.keys(params).length !== 0) {
        for (const [k, v] of Object.entries(params)) {
          str = str + `${k}=${v}&`
        }
      } else if (Object.keys(query).length !== 0) {
        for (const [k, v] of Object.entries(query)) {
          str = str + `${k}=${v}&`
        }
      }
      return str.substring(0, str.length - 1)
    },
  },
})
</script>
<style lang="scss" scoped>
.container {
  width: 600px;
  height: 478px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 320px;
    height: 128px;
    margin-top: 60px;
  }

  & > p {
    font-size: 40px;
    line-height: 40px;
    margin: 40px 0 0;
    font-weight: bold;
  }

  & > .operate {
    margin-top: 80px;
    display: flex;
    justify-content: space-between;

    & > button {
      padding: 0;
      margin: 0;
      width: 240px;
      height: 90px;
      text-align: center;
      line-height: 90px;
      border: 0;
      border-radius: 60px;
      font-size: 32px;
    }

    .launch-btn-bg {
      background-color: #ff8022;
      position: relative;
      width: 240px;
      height: 90px;
      border-radius: 60px;
    }

    .cancel-btn {
      margin-right: 40px;
      color: #333;
      background-color: #f5f5f5;
    }

    .open-btn {
      color: #fff;
      background-color: #ff8022;
    }
  }
}
</style>
