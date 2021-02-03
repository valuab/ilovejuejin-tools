import { NuxtAxiosInstance } from '@nuxtjs/axios'

import axios from 'axios'

interface IUserInfo {
  name: string
  avatar: string
}

export interface IUserModule {
  getUserInfo: (uid: string) => Promise<IUserInfo>
}

export default ($axios: NuxtAxiosInstance) => {
  return {
    async getUserInfo(uid: String) {
      const { data } = await $axios.get<IUserInfo>(`url?id=${uid}`)
      return data
    },
  } as IUserModule
}

export const getUserInfo = () => {
  console.log(axios.defaults.headers)
  axios.get('https://jsonplaceholder.typicode.com/todos/1')
}
