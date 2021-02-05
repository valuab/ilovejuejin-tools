<template>
  <div class="toggle-wrap">
    <a-button
      class="toggle-btn toggle-btn-rotate"
      shape="circle"
      :disabled="disabledLeft"
      @click="clickLeft"
    >
      <icon :icon="disabledLeft ? `ListSwitchUnable` : `ListSwitchNormal`" />
    </a-button>
    <a-button
      class="toggle-btn"
      shape="circle"
      :disabled="disabledRight"
      @click="clickRight"
    >
      <icon :icon="disabledRight ? `ListSwitchUnable` : `ListSwitchNormal`" />
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export type ToggleType = 'Left' | 'Right'

export default defineComponent({
  name: 'Toggle',
  props: {
    disabledLeft: {
      type: Boolean,
      default: false,
    },
    disabledRight: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    clickLeft: null,
    clickRight: null,
  },
  setup(_props, context) {
    const clickLeft = () => {
      const direction: ToggleType = 'Left'
      context.emit('clickLeft', direction)
    }
    const clickRight = () => {
      const direction: ToggleType = 'Right'
      context.emit('clickRight', direction)
    }

    return {
      clickLeft,
      clickRight,
    }
  },
})
</script>
<style lang="scss">
.toggle-wrap {
  flex: 0;
  width: 50px;
  justify-content: space-between;
  @include flex(row, center);

  .toggle-btn {
    width: 20px;
    height: 20px;
    min-width: 20px;
    border: none;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);

    &:first-child {
      margin-right: 10px;
    }

    &-rotate {
      transform: rotate(180deg);
    }
  }
}
</style>
