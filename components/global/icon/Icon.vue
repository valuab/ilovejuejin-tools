<template>
  <!-- <a-icon :component="component" v-bind="$attrs"></a-icon> -->
  <component :is="component" v-bind="$attrs"></component>
</template>

<script lang="ts" type="x-template">
import type { PropType } from '@nuxtjs/composition-api'
import { defineComponent, watch, shallowRef } from '@nuxtjs/composition-api'
import type { IconType } from './iconManager'
import iconManager from './iconManager'

export default defineComponent({
  name: 'Icon',
  components: iconManager,
  inheritAttrs: false,
  props: {
    icon: {
      type: String as PropType<IconType>,
      required: true,
    },
  },
  setup(props) {
    const component = shallowRef(iconManager[props.icon])
    watch(
      () => props.icon,
      (value) => {
        component.value = iconManager[value]
      }
    )
    return {
      component,
    }
  },
})
</script>
