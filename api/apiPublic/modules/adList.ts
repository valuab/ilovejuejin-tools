import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { handleUrlParams } from '~/utils/data'

const adLinks = {
  getGuangGaoList: '/api/pc/getGuangGaoList',
}

// 广告位number参数
export const AD_NUMBER_TYPE = ['one', 'two', 'three', 'four', 'five', 'six']

// 广告弹窗过期时间key
export const AD_EXPIRE_TIME = 'AD_EXPIRE_TIME'
interface IGetAdParams {
  pageName: string
  number: string
}
export interface IAdListType {
  url: string
  smallImageUrl: string
  smallImage2Url: string
}
interface IGetAdResult {
  result: IAdListType[]
}

export interface IAdModule {
  getGuangGaoList: (params: IGetAdParams) => Promise<IGetAdResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const adModule: IAdModule = {
    // 获取秘钥令牌
    async getGuangGaoList(params) {
      const url = handleUrlParams(adLinks.getGuangGaoList, params)
      const { data } = await $axios.get<IGetAdResult>(url)

      return data.result
    },
  }

  return adModule
}
