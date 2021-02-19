import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
import { handleUrlParams } from '~/utils/data'

const userLinks = {
  getUsrInfo: '/api/user/getUsrInfo',
}

interface IUserInfoParams {
  userId: number
}
export interface IUserInfoResult extends IApiResult {
  result: {
    userId: number
    nickname: string
    kol: number
    smallImageUrl: string
  }
}
export interface IUserModule {
  getUserInfo({ userId }: IUserInfoParams): Promise<IUserInfoResult['result']>
}

export default ($axios: NuxtAxiosInstance) => {
  const userModule: IUserModule = {
    async getUserInfo(params) {
      const url = handleUrlParams(userLinks.getUsrInfo, params)
      const { data } = await $axios.get<IUserInfoResult>(url)

      return data.result
    },
  }

  return userModule
}
