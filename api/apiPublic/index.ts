import { NuxtAxiosInstance } from '@nuxtjs/axios'
import userModule, { IUserModule } from './modules/user'
import loginModule, { ILoginModule } from './modules/login'
export interface IRootHttpState {
  user: IUserModule
  login: ILoginModule
}

export default ($axios: NuxtAxiosInstance) => {
  return {
    user: userModule($axios),
    login: loginModule($axios),
  } as IRootHttpState
}
