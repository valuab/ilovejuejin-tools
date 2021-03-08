<template>
  <aside class="video-share">
    <div class="support" @click="support">
      <div class="video-icon">
        <Icon v-if="post.isSupport" icon="ArticleLikeOrange" />
        <Icon v-else icon="ArticleLikeGrey" />
      </div>
      <div class="support-num">{{ post.supportCount }}</div>
    </div>
    <div class="share">
      <div class="share-word">分享到：</div>
      <template v-for="iconItem in iconList">
        <div :key="iconItem.icon" class="video-icon">
          <div v-if="index === 0" class="support" @click="support">
            <icon :icon="iconItem.icon" size="24"></icon>
            <div v-if="index === 0" class="num">{{ post.supportCount }}</div>
          </div>
          <a-popover
            v-else-if="iconItem.codeUrl"
            placement="right"
            :overlay-style="{ width: '80px' }"
          >
            <div class="icon-wrap">
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
    <div class="skip">
      <div class="video-icon">
        <Icon icon="ArticleQR" />
      </div>

      <div class="skip-word">手机扫一扫，5秒跳广告</div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

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
  setup() {
    const iconList = ref([
      {
        codeUrl:
          'https://apps.apple.com/cn/app/da-jiacars-lai-zhe-li-he-qi/id1080519110',
        icon: 'OptionWechat',
      },
      {
        icon: 'ArticleLikeMoment',
      },
      { url: 'https://weibo.com/cheyanlun', icon: 'OptionWeibo' },
    ])
    return {
      iconList,
    }
  },
  data() {
    return {
      showWechat: false,
    }
  },
  methods: {
    /**
     * @description: 点赞
     */
    async support() {
      if (this.$props.post.isSupport) return
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
