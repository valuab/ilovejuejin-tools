import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

// 图片懒加载
Vue.use(VueLazyload, {
  loading: require('~/assets/images/loading.png'),
  preLoad: 1,
  attempt: 1,
})

// 跳转微信小程序开放标签
Vue.config.ignoredElements = ['wx-open-launch-weapp']
