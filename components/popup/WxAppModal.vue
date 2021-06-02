<template>
  <popup-mask @hide="showFeedBack">
    <div class="container">
      <img src="@images/logo.png" alt="popup_logo" />
      <p>即将打开“大家车”小程序</p>
      <div class="operate">
        <button class="cancel-btn" @click="showFeedBack">取消</button>
        <div v-if="isWeixin" class="launch-btn-bg">
          <div class="launch-btn-box">
            <wx-open-launch-weapp :username="wxBtnusername" :path="wxPath">
              <script type="text/wxtag-template">
                <div style="color: #fff; position: relative; top: 0; left: 0; width: 100%; height: 100%">立即打开</div>
              </script>
            </wx-open-launch-weapp>
          </div>
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
      wxPath: '',
      wxBtnusername: 'gh_f36e46000282',
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
      const url = location.href.split('#')[0]
      const {
        timestamp,
        nonceStr,
        signature,
        appId,
      } = await this.$http.mobile.getJsSdkAll({ url })
      // eslint-disable-next-line no-console
      console.log(location.href.split('#')[0])
      // eslint-disable-next-line no-undef
      wx.config({
        debug: false,
        appId,
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: ['onMenuShareTimeline'], // 必填，需要使用的JS接口列表
        openTagList: ['wx-open-launch-weapp'],
      })
      wx.ready((e: any) => {
        // eslint-disable-next-line no-console
        console.log([e, 'ready'])
      })
      wx.error((e: any) => {
        // eslint-disable-next-line no-console
        console.log([e, 'error'])
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
  width: 80vw;
  height: 36vh;
  background-color: #fff;
  border-radius: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: 43vw;
    height: 10vh;
    margin-top: 4vh;
  }

  & > p {
    font-size: 3vh;
    line-height: 3vh;
    margin: 3vh 0 0;
    font-weight: bold;
  }

  & > .operate {
    margin-top: 6vh;
    display: flex;
    justify-content: space-between;

    & > button {
      padding: 0;
      margin: 0;
      width: 32vw;
      height: 7vh;
      text-align: center;
      line-height: 7vh;
      border: 0;
      border-radius: 5vh;
      font-size: 2vh;
    }

    .launch-btn-bg {
      background-color: #ff8022;
      position: relative;
      width: 32vw;
      height: 7vh;
      font-size: 2vh;
      border-radius: 5vh;

      .launch-btn-box {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.5vh;
        margin-left: -8vw;
      }
    }

    .cancel-btn {
      margin-right: 5vw;
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
