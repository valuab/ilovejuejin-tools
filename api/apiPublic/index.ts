import { NuxtAxiosInstance } from '@nuxtjs/axios/'
import userModule, { IUserModule } from './modules/user'

interface IRootHttpState {
  user: IUserModule
}

export default ($axios: NuxtAxiosInstance) => {
  return {
    user: userModule($axios),
  } as IRootHttpState
}
