<template>
  <aside class="video-share">
    <div class="support" @click="support">
      <Icon icon="CloseOrange" class="video-icon" />
      <div class="support-num">{{ post.supportCount }}</div>
    </div>
    <div class="share">
      <div class="share-word">分享到：</div>
      <template v-for="iconItem in iconList">
        <div :key="iconItem.icon" class="video-icon">
          <a-popover
            v-if="iconItem.codeUrl"
            placement="right"
            :overlay-style="{ width: '80px' }"
          >
            <div class="icon-wrap flex-column-horizontal-center">
              <icon :icon="iconItem.icon" size="20"></icon>
            </div>
          </a-popover>
          <a
            v-else
            class="icon-wrap flex-center"
            :href="iconItem.url"
            target="_blank"
          >
            <icon :icon="iconItem.icon" size="20"></icon>
          </a>
        </div>
      </template>
    </div>
    <div class="skip">
      <Icon icon="CloseOrange" class="video-icon" />
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
  setup() {
    const iconList = ref([
      {
        codeUrl:
          'https://apps.apple.com/cn/app/da-jiacars-lai-zhe-li-he-qi/id1080519110',
        icon: 'OptionWechat',
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
    support() {
      const postId = this.post.id
      const forumId = this.post.forumId
      this.$http.posts.supportPost({
        postId,
        forumId,
      })
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

    .video-icon {
      width: 21px;
      height: 19px;
      margin-right: 10px;
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
</style>
