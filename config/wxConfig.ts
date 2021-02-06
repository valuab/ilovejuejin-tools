/**
 * 项目微信配置模块
 */

export default {
  WX_URL: 'https://api.weixin.qq.com',
  APP_ID: 'wxa255ebd2f771f5e2',
  REDIRECT_URL:
    process.env.NODE_ENV === 'development'
      ? 'https://newpc-beta.djcars.cn'
      : 'https://pc.djcars.cn',
}
