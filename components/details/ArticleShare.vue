<template>
  <aside class="share">
    <template v-for="(iconItem, index) in iconList">
      <div :key="iconItem.icon" class="share-tab">
        <div v-if="index === 0" class="support" @click.once="support()">
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
          :overlay-style="{ width: '120px' }"
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
  iconList: IIconItem[]
  posts: {
    isSupport: number
  }
  videoUrl: string
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
      iconList: [],
      posts: this.$props.post,
      videoUrl: '',
    }
  },
  fetch() {
    const fullPath = this.$route.fullPath
    const title = this.post.title
    const origin = this.$route.path // string 页面名
    let search: any = fullPath
    search =
      search.replace(`${origin}` + '?', '') + '&pathName=' + this.$route.name
    // 暴力替换
    for (const i in search) {
      if (search[i] === '&') {
        search = search.replace('&', '_')
      }
      if (search[i] === '=') {
        search = search.replace('=', '-')
      }
    }
    const url = fullPath.replace(origin, 'articleDetail') // 微信链接
    const domain = 'https://www.djcars.cn' || process.env.BASE_URL
    const link = `${domain}/share?search=${search}` // 拼接分享链接
    const weiboUrl = getWeiboUrl(title, link)

    const videoUrl = `https://www.djcars.cn/${url}`
    this.videoUrl = videoUrl

    this.iconList = [
      {
        icon: 'ArticleLikeGrey',
        codeUrl: '',
        url: '',
      },
      {
        icon: 'OptionWechat',
        codeUrl: videoUrl,
        url: '',
      },
      {
        icon: 'ArticleLikeMoment',
        codeUrl: videoUrl,
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
    /**
     * @description: 点赞
     */
    async support() {
      if (this.$props.post.isSupport) return
      // 判断登录
      if (!this.$accessor.userInfo.isLogin) {
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
  cursor: pointer;

  .num {
    @include text(12px, #666, bold);
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
  font-size: 12px;
}
</style>
