<template>
  <aside class="share">
    <template v-for="(iconItem, index) in iconList">
      <div :key="iconItem.icon" class="share-tab">
        <a-popover
          v-if="iconItem.codeUrl"
          placement="right"
          :overlay-style="{ width: '80px' }"
        >
          <template #content>
            <QRCode :src="iconItem.codeUrl" />
          </template>
          <div class="icon-wrap flex-column-horizontal-center">
            <icon :icon="iconItem.icon" size="24"></icon>
            <div v-if="index === 0" class="num">{{ post.supportCount }}</div>
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
  setup(props) {
    const iconList = ref([
      {
        icon: props.post.isSupport ? 'ArticleLikeOrange' : 'ArticleLikeGrey',
        // icon: 'ArticleLikeOrange',
      },
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
    mouseout() {
      this.showWechat = false
    },
    mouseenter() {
      this.showWechat = true
    },
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
</style>
