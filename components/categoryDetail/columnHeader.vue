<template>
  <header class="header-container">
    <div class="header-box">
      <div class="header-left">
        <div class="header-avatar">
          <a-avatar :src="detail.imgUrl" :size="100"></a-avatar>
          <icon
            v-if="this.$route.name === 'kol' && detail.kol"
            class="avatar-kol"
            :icon="
              detail.kol === 1 ? 'KolBadgeK' : kol === 2 ? 'KolBadgeV' : ''
            "
          />
        </div>
        <div class="desc">
          <h1 :style="detail.description ? '' : 'margin: 0'">
            {{ detail.name }}
          </h1>
          <p v-if="detail.description">{{ detail.description }}</p>
        </div>
      </div>
      <div class="header-right">
        <QRCode :src="qrUrl" :size="100" :is-shadow="false" />
        <p>扫码用手机看视频</p>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
export interface IDetail {
  name: string
  description: string
  imgUrl: string
  kol?: number
}
export default defineComponent({
  name: '',
  props: {
    detail: {
      type: Object as PropType<IDetail>,
      required: true,
    },
  },
  data() {
    return {
      qrUrl: '',
    }
  },
  created() {
    const { name, query } = this.$route
    const urlOrg =
      process.env.BASE_URL === 'http://192.168.5.202:9037'
        ? 'https://pc-beta.djcars.cn/'
        : 'https://www.djcars.cn/'
    if (name === 'kol') {
      this.qrUrl = `${urlOrg}kol?id=${query.id}`
    } else if (name === 'category') {
      this.qrUrl = `${urlOrg}category?id=${query.id}`
    }
  },
})
</script>
<style lang="scss" scoped>
.header-container {
  width: 100%;
  background-color: #fff;

  .header-box {
    display: flex;
    width: $container-width;
    padding: 30px 20px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;

    .header-left {
      display: flex;
      align-items: center;

      .header-avatar {
        position: relative;

        .avatar-kol {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }

      .desc {
        margin-left: 20px;

        h1 {
          margin-bottom: 10px;

          @include text(28px, #000000, bold);
        }

        p {
          width: 42rem;
          margin: 0;
          line-height: 20px;

          @include text($font-size-base, #666);
        }
      }
    }
    .header-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      & > p {
        margin: 0;
        @include text($font-size-sm, #333333);
      }
    }
  }
}
</style>
