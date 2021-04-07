<template>
  <div class="search-content">
    <article class="search-error">
      <p class="Tips">很抱歉，没有找到“{{ keyword }}“相关的信息</p>
      <p class="Tips-msg">
        您现在可以：<br />
        · 可能您想要找到的内容，我们未收录或者未发表过，<a>我要爆料</a> <br />·
        关注我们的公众号，我们会将新发布的信息通知您。
      </p>
      <div class="code-content">
        <div class="code">
          <div class="code-img">
            <img width="190px" height="190px" src="/qrcode/offic/djcars.png" />
          </div>
          <div class="code-text">扫一扫关注公众号</div>
        </div>
        <div class="code">
          <div class="code-img">
            <img width="190px" height="190px" src="/qrcode/offic/android.png" />
          </div>
          <div class="code-text">扫一扫下载App</div>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

// import { Layout } from 'ant-design-vue'

export default defineComponent({
  name: 'SearchError',
  props: {
    keyword: {
      type: String,
      default: '',
    },
  },
})
</script>

<style lang="scss" scoped>
.search-content {
  padding: 60px 0 20px 20px;
}

.search-error {
  display: flex;
  flex-direction: column;

  .Tips {
    margin-bottom: 60px;
    font-size: 16px;
    color: #666;
  }

  .Tips-msg {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 32px;
    color: #000;

    a {
      color: $primary-color;
    }
  }

  .code-content {
    display: flex;

    .code {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-img {
        width: 190px;
        height: 190px;
        margin-bottom: 10px;
        background-color: #fff;
      }

      .code-text {
        font-size: 16px;
        color: #666;
      }
    }

    .code:first-of-type {
      margin-right: 20px;
    }
  }
}
</style>
