import { MD5 } from 'crypto-js'
import { v4 } from 'uuid'
// import thirtysix from 'thirtysix'
// 引入uuid
import Uuid from '~/api/token'
export function mid(path: string, no = 1, userId: any) {
  // const time = thirtysix(Date.now())
  const time = Date.now()
  const sid = '' || v4()
  const uuid = Uuid(sid, userId)
  // MD5(PATH+NO+TIME+userId+uuid)
  const data = path + no + time + userId + uuid
  // console.log(path, no, time, userId, uuid)
  const sign = MD5(data)
  return sign
}
