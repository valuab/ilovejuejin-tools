<template>
  <aside class="video-share">
    <div class="support" @click="support">
      <div class="video-icon">
        <icon v-if="post.isSupport" icon="ArticleLikeOrange" :size="'24'" />
        <icon v-else icon="ArticleLikeGrey" />
      </div>
      <div class="support-num">{{ post.supportCount }}</div>
    </div>
    <div class="share">
      <div class="share-word">分享到：</div>
      <template v-for="iconItem in iconList">
        <div :key="iconItem.icon" class="video-icon">
          <a-popover
            v-if="iconItem.codeUrl"
            placement="top"
            :overlay-style="{ width: '120px' }"
          >
            <template #content>
              <QRCode :src="iconItem.codeUrl" />
            </template>
            <div class="icon-wrap">
              <icon :icon="iconItem.icon" size="24" />
            </div>
          </a-popover>
          <a
            v-else
            class="icon-wrap flex-center"
            :href="iconItem.url"
            target="_blank"
          >
            <icon :icon="iconItem.icon" size="24" />
          </a>
        </div>
      </template>
    </div>
    <a-popover placement="top" :overlay-style="{ width: '120px' }" class="skip">
      <template #content>
        <QRCode src="https://www.baidu.com/" />
      </template>
      <div class="video-icon">
        <icon icon="ArticleQR" />
      </div>
      <div class="skip-word">手机扫一扫，5秒跳广告</div>
    </a-popover>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { getWeiboUrl } from '@/utils/share'

interface IIconListType {
  codeUrl?: string
  url?: string
  icon: string
}

export default defineComponent({
  name: 'ArticleSort',
  components: {},
  props: {
    // 帖子信息
    post: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  emits: ['support'],
  data() {
    return {
      iconList: [] as IIconListType[],
      showWechat: false,
    }
  },
  fetch() {
    const title = this.post.title
    const pathname = this.$route.name || '' // string 页面名
    const origin = this.$route.path // string 域名
    const search = JSON.stringify(this.$route.query) // string 参数
    const domain =
      'https://www.djcars.cn/' + origin || process.env.BASE_URL + origin
    const link = `${domain}/share/${pathname}?search=${search}` // 当前页面链接
    const weiboUrl = getWeiboUrl(title, link)

    this.iconList = [
      {
        codeUrl: link,
        icon: 'OptionWechat',
      },
      {
        codeUrl: link,
        icon: 'ArticleLikeMoment',
      },
      { url: weiboUrl, icon: 'OptionWeibo' },
    ]
  },
  methods: {
    /**
     * @description: 点赞
     */
    async support() {
      if (this.post.isSupport) return
      // 判断登录
      if (this.$accessor.userInfo.userId === 0) {
        this.$accessor.global.showLoginPopUpOrHide()
        return
      }
      const postId = this.post.id
      const forumId = this.post.forumId
      const support: any = await this.$http.posts.supportPost({
        postId,
        forumId,
      })

      if (support.id) {
        this.$emit('support')
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.video-share {
  width: 100%;
  height: 60px;
  box-shadow: inset 0 -1px 0 0 #e6e6e6;
  display: flex;
  align-items: center;

  .support {
    display: flex;
    align-items: center;
    margin-right: 40px;
    &-num {
      @include text(12px, #666);
    }
  }
  .share {
    display: flex;
    align-items: center;
    &-word {
      margin-right: 2px;
      @include text(12px, #888);
    }
  }
  .skip {
    display: flex;
    align-items: center;
    margin-left: auto;
    &-word {
      @include text(14px, #000, bold);
    }
  }
}
.video-icon {
  margin-right: 10px;
}
.support {
  display: flex;
  align-items: center;
}
</style>
