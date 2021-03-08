import { MD5 } from 'crypto-js'
export function mid(path: string, userId: any, uuid: string) {
  const no = 1
  const time = scale36(Date.now())
  // MD5(PATH+NO+TIME+userId+uuid)
  const data = path + no + time + userId + uuid
  const sign = MD5(data).toString()
  return path + '.' + no + '.' + time + '.' + sign
}

// 10转n的算法：除n取余，然后倒序排列。例如10转2就是10除2取余倒休排列。具体细节参看其他文章
// n转10：乘权重进行相加，例如101转10就是1*10+0*10的1次方+1*10的2次方
// 题外话，计算机里面表示8进制前面加0，表示16进制前面加0x

// 获取36进制序列的数组 [0,1,2...x,y,z]
function getNums36() {
  const nums36 = []
  for (let i = 0; i < 36; i++) {
    if (i >= 0 && i <= 9) {
      nums36.push(i)
    } else {
      nums36.push(String.fromCharCode(i + 87))
    }
  }
  return nums36
}

// 十进制数转成36进制
function scale36(n: number) {
  const arr = []
  const nums36 = getNums36()
  while (n) {
    // 除n取余
    const res = n % 36
    // 然后作为下标得到对应的36进制数
    arr.unshift(nums36[res])
    // 去掉个位
    const value = String(n / 36)
    n = parseInt(value)
  }
  return arr.join('')
}
