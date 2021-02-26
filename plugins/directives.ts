import Vue from 'vue'

Vue.directive('anchor', {
  inserted: (el, binding) => {
    el.onclick = function () {
      if (binding.value) {
        const vnode = document.getElementById(binding.value) as HTMLElement
        document.documentElement.scrollTop = vnode.offsetTop
      }
    }
  },
})
