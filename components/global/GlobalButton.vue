<template>
  <a-button v-bind="$attrs">
    <slot></slot>
  </a-button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'GlobalButton',
  inheritAttrs: false,
  props: {
    login: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
