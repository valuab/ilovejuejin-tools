<template>
  <img :width="size" :height="size" :src="qrSrc" alt="加载二维码失败" />
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
      default: 120,
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
