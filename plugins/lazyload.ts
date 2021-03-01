import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require('~/assets/images/loading.png'),
  attempt: 1,
})
