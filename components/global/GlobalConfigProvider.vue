<template>
  <a-config-provider :get-popup-container="getPopupContainer">
    <template #renderEmpty><global-empty></global-empty></template>
    <slot />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  methods: {
    getPopupContainer(triggerNode: HTMLElement) {
      return triggerNode.parentNode
    },
  },
})
</script>
