import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { handleUrlParams } from '~/utils/data'

const adLinks = {
  getAdList: '/api/ad/getAdList',
}

// 广告位number参数
export const AD_NUMBER_TYPE = ['one', 'two', 'three', 'four', 'five', 'six']

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
  getAdList: (params: IGetAdParams) => Promise<IGetAdResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const adModule: IAdModule = {
    // 获取秘钥令牌
    async getAdList(params) {
      const url = handleUrlParams(adLinks.getAdList, params)
      const { data } = await $axios.get<IGetAdResult>(url)

      return data.result
    },
  }

  return adModule
}
