import { NuxtAxiosInstance } from '@nuxtjs/axios'
import userModule, { IUserModule } from './modules/user'
import loginModule, { ILoginModule } from './modules/login'
import topicModule, { ITopicModule } from './modules/topic'

export type IApiResult = {
  err: number
  msg: string
}
export interface IRootHttpState {
  user: IUserModule
  login: ILoginModule
  topic: ITopicModule
}

export default ($axios: NuxtAxiosInstance) => {
  return {
    user: userModule($axios),
    login: loginModule($axios),
    topic: topicModule($axios),
  } as IRootHttpState
}
