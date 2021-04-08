/**
 * 项目微信配置模块
 */
const isProduction = process.env.NODE_ENV === 'production'

export default {
  WX_URL: 'https://api.weixin.qq.com',
  APP_ID: isProduction ? 'wxa255ebd2f771f5e2' : 'wxc02745329e7866a5',
  // 扫码重定向URL
  REDIRECT_URL: isProduction
    ? 'https://pc-beta.djcars.cn'
    : 'https://newpc-beta.djcars.cn',
}
