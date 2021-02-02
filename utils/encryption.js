// const CryptoJS = require('../hamcsha1/HamcSHA1.js')
import { CryptoJS } from './HamcSHA1.js'
export default function encryption(value) {
  return CryptoJS.HmacSHA1(
    value,
    'j9tPQWBjzK1LFunkKkgK1deHb7MQNfbxJRizfShbSslAeStGQ2enU6ktI0HhZI9R'
  ).toString()
}
