<template>
  <header class="header-container">
    <div class="header-box">
      <div class="header-left">
        <div class="header-avatar">
          <a-avatar :src="detail.imgUrl" :size="100"></a-avatar>
          <icon
            v-if="this.$route.name === 'kol-id'"
            class="avatar-kol"
            :icon="
              detail.kol === 1 ? 'KolBadgeK' : kol === 2 ? 'KolBadgeV' : ''
            "
          />
        </div>
        <div class="desc">
          <h1>{{ detail.name }}</h1>
          <p>{{ detail.description }}</p>
        </div>
      </div>
      <a-avatar src="/qrcode/miniapp/djcars.jpg" :size="100"></a-avatar>
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
})
</script>
<style lang="scss" scoped>
.header-container {
  width: 100%;
  background-color: #fff;

  .header-box {
    display: flex;
    width: 1280px;
    height: 220px;
    padding: 0 20px;
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

          @include text(32px, #000000, bold);
        }

        p {
          width: 42rem;
          margin: 0;

          @include text($font-size-lg, #666);
        }
      }
    }
  }
}
</style>
