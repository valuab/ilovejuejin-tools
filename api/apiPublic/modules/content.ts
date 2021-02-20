import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { IApiResult } from '../index'
// import { handleUrlParams } from '~/utils/data'

export const contentLinks = {
  getCommendList: '/api/index/getCommendList',
}

export interface ICommendListData {
  id: string
  name: string
}

interface ICommendListResult extends IApiResult {
  result: {
    list: ICommendListData[]
  }
}

export interface IContentModule {
  getCommendList: () => Promise<ICommendListData[]>
}

export default ($axios: NuxtAxiosInstance) => {
  const contentModule: IContentModule = {
    async getCommendList() {
      const url = contentLinks.getCommendList
      const { data } = await $axios.get<ICommendListResult>(url)

      return data.result.list
    },
  }

  return contentModule
}
