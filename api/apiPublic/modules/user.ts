import { NuxtAxiosInstance } from '@nuxtjs/axios'

import axios from 'axios'

interface IUserInfo {
  name: string
  avatar: string
}
export interface IUserModule {
  getUserInfo(): Promise<IUserInfo>
}

export default ($axios: NuxtAxiosInstance) => {
  const userModule: IUserModule = {
    async getUserInfo() {
      const { data } = await $axios.get<IUserInfo>(
        `https://jsonplaceholder.typicode.com/todos/1`
      )
      return data
    },
  }

  return userModule
}

export const getUserInfo = () => {
  console.log(axios.defaults.headers)
  axios.get('https://jsonplaceholder.typicode.com/todos/1')
}
