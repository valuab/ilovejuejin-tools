<template>
  <div class="footer-wrap">
    <div class="footer-top">
      <img width="125px" height="50px" src="@images/logo.png" />
      <div class="icons">
        <a-popover>
          <div class="icon-wrap flex-center">
            <icon icon="OptionWechat"></icon>
          </div>
        </a-popover>
        <a
          href="https://weibo.com/cheyanlun?is_all=1"
          target="_blank"
          class="icon-wrap flex-center"
        >
          <icon icon="OptionWeibo"></icon>
        </a>
        <a-popover>
          <div class="icon-wrap flex-center">
            <icon icon="OptionApple"></icon>
          </div>
          <template #content>
            <QRCode
              src="https://apps.apple.com/cn/app/da-jiacars-lai-zhe-li-he-qi/id1080519110"
            />
          </template>
        </a-popover>
        <a-popover>
          <div class="icon-wrap flex-center">
            <icon icon="OptionAndroid"></icon>
          </div>
        </a-popover>
        <a-popover>
          <div class="icon-wrap flex-center">
            <icon icon="OptionH5"></icon>
          </div>
          <template #content>
            <QRCode src="https://www.djcars.cn/" />
          </template>
        </a-popover>
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
          <a class="content-text content-text-link" @click="isFeedBack"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from '@nuxtjs/composition-api'

export default defineComponent({
  emits: ['showFeedBack'],
  setup() {
    const { root }: any = getCurrentInstance()
    /**
     * @description: 打开问题反馈弹窗
     */
    const isFeedBack = () => {
      root.setupState.showFeedBack()
    }

    return {
      isFeedBack,
    }
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
    padding-top: 22px;
    border-top: 1px solid #ebebeb;
    @include flex(row, space-between, center);

    .copyright-text {
      @include text($font-size-lg, $disabled-color);
    }
  }
}
</style>
