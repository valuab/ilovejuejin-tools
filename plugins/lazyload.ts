import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  loading: require('~/assets/images/loading.png'),
  preLoad: 1,
  attempt: 1,
})
