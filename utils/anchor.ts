import { ASTDirective } from 'vue-template-compiler'

export default {
  inserted: (el: HTMLElement, binding: ASTDirective) => {
    el.onclick = function () {
      if (binding.value) {
        // document.getElementById(binding.value).offsetTop
      }
    }
  },
}
