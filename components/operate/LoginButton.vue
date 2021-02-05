<template>
  <a-button v-bind="$attrs" @click="clickItem">
    <slot></slot>
  </a-button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LoginButton',
  inheritAttrs: false,
  props: {
    login: {
      type: Boolean,
      default: false,
    },
  },
  setup(_props, context) {
    const clickItem = () => {
      context.emit('click')
    }

    return {
      clickItem,
    }
  },
})
</script>
