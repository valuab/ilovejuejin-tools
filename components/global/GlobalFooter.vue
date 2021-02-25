<template>
  <div class="footer-wrap">
    <div class="footer-top">
      <img width="125px" height="50px" src="@images/logo.png" />
      <div class="icons">
        <template v-for="iconItem in iconList">
          <div :key="iconItem.icon" class="icon-item">
            <a-popover
              v-if="iconItem.codeUrl"
              placement="bottom"
              :overlay-style="{ width: '80px' }"
            >
              <template #content>
                <QRCode :src="iconItem.codeUrl" />
              </template>
              <div class="icon-wrap flex-center">
                <icon :icon="iconItem.icon" size="24"></icon>
              </div>
            </a-popover>
            <a
              v-else
              class="icon-wrap flex-center"
              :href="iconItem.url"
              target="_blank"
            >
              <icon :icon="iconItem.icon" size="24"></icon>
            </a>
          </div>
        </template>
      </div>
    </div>
    <p class="slogan">真人真话，道出专业与真实</p>
    <div class="footer-content">
      <div class="content-item">
        <span class="content-text">合作：</span>
        <a href="mailto:bd@djcars.cn" class="content-text content-text-primary"
          >bd@djcars.cn</a
        >
      </div>
      <div class="content-item">
        <span class="content-text">电话：020-84138316</span>
      </div>
      <div class="content-item-wrap">
        <div class="content-item">
          <span class="content-text"
            >地址：广州市海珠区新港东路51号（北岛创意园）之十九自编c2号</span
          >
        </div>
        <div class="content-item">
          <span class="content-text">如有问题，欢迎告诉我们，</span>
          <a class="content-text content-text-link" @click="showFeedBack"
            >问题反馈</a
          >
        </div>
      </div>
    </div>
    <div class="copyright">
      <span class="copyright-text"
        >2015-2019 广州朋客网络科技有限公司版权所有</span
      >
      <a
        class="copyright-text"
        href="https://beian.miit.gov.cn/#/Integrated/index"
        target="_blank"
      >
        工信和信息化部 | 粤ICP16009880号 | 视频备案0108283170590065
      </a>
    </div>
    <feed-back v-if="this.$accessor.global.isFeedBack"></feed-back>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalFooter',
  setup() {
    const iconList = ref([
      { codeUrl: '@images/weixin_code.png', icon: 'OptionWechat' },
      { url: 'https://weibo.com/cheyanlun', icon: 'OptionWeibo' },
      { codeUrl: '@images/apple_code.png', icon: 'OptionApple' },
      { codeUrl: '@images/android_code.png', icon: 'OptionAndroid' },
      { codeUrl: '@images/h5_code.png', icon: 'OptionH5' },
    ])
    return {
      iconList,
    }
  },
  methods: {
    showFeedBack() {
      this.$accessor.global.showFeedBack()
    },
  },
})
</script>
<style lang="scss" scoped>
.footer-wrap {
  margin: 0 auto;
  line-height: normal;

  .footer-top {
    @include flex(row, space-between, center);

    .icons {
      @include flex(row, space-between, center);

      .icon-wrap {
        width: 40px;
        height: 40px;
        margin-left: 20px;
        background-color: #fff;
        border-radius: 50%;

        &:hover {
          background-color: rgba(255, 255, 255, 40);
        }
      }
    }
  }

  .slogan {
    margin: 0;
    @include text($font-size-base, #000, bold);
  }

  .footer-content {
    padding-top: 6px;
    padding-bottom: 20px;

    .content-text {
      @include text($font-size-lg, #666);
    }

    .content-text-primary {
      color: $primary-color;
    }

    .content-text-link {
      @include text($font-size-lg, $link-color, none, underline);
    }

    .content-item {
      padding-top: 16px;
    }

    .content-item-wrap {
      @include flex(row, space-between, center);
    }
  }

  .copyright {
    padding: 22px 0;
    border-top: 1px solid #ebebeb;
    @include flex(row, space-between, center);

    .copyright-text {
      @include text($font-size-lg, $disabled-color);
    }
  }
}
</style>
