import { v4 } from 'uuid'
import CryptoJS from 'crypto-js'
import config from '~/assets/ts/config'

export interface IToken {
  sign: string
  sid: string
  uid: number
  uuid: string
}

export default (sid = '', uid = 0) => {
  const _uuid = v4()
  const sessionId = sid || v4()
  const sign = CryptoJS.HmacSHA1(sessionId + uid, config.APP_SECRET)

  return {
    uuid: _uuid,
    uid,
    sid: sessionId,
    sign: sign.toString(),
  } as IToken
}
