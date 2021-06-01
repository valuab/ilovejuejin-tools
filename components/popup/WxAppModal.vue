<template>
  <popup-mask @hide="showFeedBack">
    <div v-if="isWeixin">
      <wx-open-launch-weapp username="gh_f36e46000282" :path="wxPath">
        <script type="text/wxtag-template">
          <button class="btn">跳转小程序</button>
        </script>
      </wx-open-launch-weapp>
    </div>
    <h1 v-else @click="navWxApp">确定</h1>
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
      wxPath: '',
    }
  },
  async mounted() {
    if (
      !navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i
      )
    )
      return
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
      const url = location.origin
      const {
        timestamp,
        nonceStr,
        signature,
      } = await this.$http.mobile.getJsSdkAll({ url })
      wx.config({
        debug: true,
        appId: 'wxb943f9ee08974767',
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: ['onMenuShareTimeline'], // 必填，需要使用的JS接口列表
        openTagList: ['wx-open-launch-weapp'],
      })
      this.wxPath = `${path}?${query}`
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
h1 {
  width: 300px;
  height: 200px;
  background-color: orange;
}
</style>
