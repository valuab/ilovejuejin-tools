import { Context } from '@nuxt/types'

export default ({ app }: Context) => {
  let firstEntry = true // 第一次进入路由

  app.router?.beforeEach((to, _from, next) => {
    /**
     * 此项目没有移动端样式代码，移动端浏览器暂定为统一跳转至小程序，禁止路由跳转
     */
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i
      ) &&
      to.name
    ) {
      app.$accessor.global.setToRoute(to) // 设置想要跳转的router对象
      if (firstEntry) {
        firstEntry = false
        app.$accessor.global.setIsMobile(true) // 当前为移动端状态
        app.$accessor.global.setNavTarget('_self') // 移动端浏览器跳转统一改为当前标签页
        next()
      }
      app.$accessor.global.showWxAppPopup(true) // 展示跳转弹窗
    } else {
      next()
    }
  })
}
