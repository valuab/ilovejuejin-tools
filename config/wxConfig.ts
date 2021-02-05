export default {
  WX_URL: 'https://api.weixin.qq.com',
  SECRET: '6be0ee177e1df432232b7610878bb769',
  APP_ID: 'wxa255ebd2f771f5e2',
  REDIRECT_URL:
    process.env.NODE_ENV === 'development'
      ? 'https://newpc-beta.djcars.cn'
      : 'https://pc.djcars.cn',
}
