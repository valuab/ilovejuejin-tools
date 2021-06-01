<template>
  <div
    class="qrcodeBox"
    :class="{ 'box-shadow': isShadow }"
    :style="{ '--size': size }"
  >
    <img
      width="100%"
      height="100%"
      :src="qrSrc"
      alt="加载二维码失败"
      :title="src"
    />
    <div class="qrcodeIcon">
      <icon icon="LogoDjcar" size="30" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, toRefs, unref } from '@nuxtjs/composition-api'
import QRCode from 'qrcode'

export default defineComponent({
  name: 'QRCode',
  props: {
    src: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 80,
    },
    isShadow: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { src } = toRefs(props)
    const qrSrc = ref<String>('')
    QRCode.toDataURL(unref(src)).then((url: String) => {
      if (url) qrSrc.value = url
    })
    return {
      qrSrc,
    }
  },
})
</script>

<style lang="scss" scoped>
.qrcodeBox {
  position: relative;
  width: var(--size);
  height: var(--size);

  .qrcodeIcon {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    margin-top: -15px;
    margin-left: -15px;
  }
}
.box-shadow {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
}
</style>
