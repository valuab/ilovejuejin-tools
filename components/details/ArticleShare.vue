<template>
  <aside class="share">
    <template v-for="(iconItem, index) in iconList">
      <div :key="iconItem.icon" class="share-tab">
        <div v-if="index === 0" class="support" @click="support">
          <Icon
            :icon="posts.isSupport ? 'ArticleLikeOrange' : iconItem.icon"
            :size="'24'"
          />
          <div
            v-if="index === 0"
            class="num"
            :class="posts.isSupport ? 'num_1' : ''"
          >
            {{ post.supportCount }}
          </div>
        </div>
        <a-popover
          v-else-if="iconItem.codeUrl"
          placement="right"
          :overlay-style="{ width: '80px' }"
        >
          <template #content>
            <QRCode :src="iconItem.codeUrl" />
          </template>
          <div class="icon-wrap flex-column-horizontal-center">
            <Icon :icon="iconItem.icon" :size="'24'" />
          </div>
        </a-popover>
        <a
          v-else
          class="icon-wrap flex-center"
          :href="iconItem.url"
          target="_blank"
        >
          <Icon :icon="iconItem.icon" size="24" />
        </a>
      </div>
    </template>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { getWeiboUrl } from '@/utils/share'

interface IIconItem {
  icon: string
  codeUrl: string
  url: string
}

interface IData {
  showWechat: boolean
  iconList: IIconItem[]
  posts: {
    isSupport: number
  }
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
  data(): IData {
    return {
      showWechat: false,
      iconList: [],
      posts: this.$props.post,
    }
  },
  fetch() {
    const title = this.post.title
    const pathname = this.$route.name || '' // string 页面名
    const origin = this.$route.path // string 域名
    const search = JSON.stringify(this.$route.query) // string 参数
    console.log(search)
    // .replace(/-/g, '=').replace(/_/g, '&')
    const domain =
      'https://www.djcars.cn/' + origin || process.env.BASE_URL + origin
    const link = `${domain}/share/${pathname}?search=${search}` // 拼接分享链接
    const weiboUrl = getWeiboUrl(title, link)

    this.iconList = [
      {
        icon: 'ArticleLikeGrey',
        codeUrl: '',
        url: '',
      },
      {
        icon: 'OptionWechat',
        codeUrl: link,
        url: '',
      },
      {
        icon: 'ArticleLikeMoment',
        codeUrl: link,
        url: '',
      },
      {
        icon: 'OptionWeibo',
        codeUrl: '',
        url: weiboUrl,
      },
    ]
  },
  methods: {
    mouseout() {
      this.showWechat = false
    },
    mouseenter() {
      this.showWechat = true
    },
    /**
     * @description: 点赞
     */
    async support() {
      if (this.$props.post.isSupport) return
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
        this.posts.isSupport = 1
        this.$emit('support')
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.share-tab {
  width: 60px;
  height: 60px;
  background-color: #f5f5f5;
  border-radius: 50%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .num {
    font-size: 10px;
    line-height: 10px;
    color: #666;
  }

  .num_1 {
    color: #ff8022;
  }
}

.Wachat {
  position: relative;
}

.code {
  position: absolute;
  right: -114px;
  top: 50%;
  transform: translate(0, -50%);
  width: 100px;
  height: 100px;
  background: #fff;

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-right: 12px solid #fff;
    border-bottom: 4px solid transparent;
    position: absolute;
    left: -4px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 100;
  }
}

.support {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
