import Vue from 'vue'

Vue.directive('anchor', {
  inserted: (el, binding) => {
    el.onclick = function (event) {
      const target = event.target as HTMLElement
      const nodeName = target?.nodeName.toLocaleLowerCase()

      if (binding.value && nodeName === 'a') {
        const vnode = document.getElementById(binding.value) as HTMLElement
        document.documentElement.scrollTop = vnode?.offsetTop || 0
      }
    }
  },
})
