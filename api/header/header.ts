// import { getCurrentInstance } from 'vue'
import getUuid from '../../utils/uuid'
import encryption from '../../utils/encryption'

interface headerValue {
  sign: string
  sid: string
  uid: number
  uuid?: string
}

/**
 * @description: 获取header
 */
export function getHeader() {
  if (process.client) {
    const header: string | null = localStorage.getItem('headerData')
    return header ? JSON.parse(header) : initHeader()
  }
  return initHeader()
}

/**
 * @description: 未登录生成头部结构
 */
function initHeader() {
  const initHeader = { sign: '', sid: '', uid: 0, uuid: '' }
  const uuid = getUuid() // 生成

  initHeader.uuid = uuid
  initHeader.sid = uuid

  return editHeader(initHeader)
}

/**
 * @description: 编辑加密
 */
export function editHeader(header: headerValue) {
  header.sign = encryption(header.sid + header.uid)
  return header
}
