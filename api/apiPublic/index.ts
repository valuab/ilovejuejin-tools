/**
 * api主文件
 */

import { NuxtAxiosInstance } from '@nuxtjs/axios'
import kolModule, { IKolModule } from './modules/kol'
import loginModule, { ILoginModule } from './modules/login'
import programModule, { IProgramModule } from './modules/program'
import homeModule, { IHomeModule } from './modules/home'
import feedbackModule, { IFeedbackModule } from './modules/feedback'
import categoryModule, { ICategoryModule } from './modules/category'
import searchModule, { ISearchModule } from './modules/search'

export type IApiResult = {
  err: number
  msg: string
}
export interface IRootHttpState {
  kol: IKolModule
  login: ILoginModule
  program: IProgramModule
  home: IHomeModule
  feedback: IFeedbackModule
  category: ICategoryModule
  search: ISearchModule
}

export default ($axios: NuxtAxiosInstance) => {
  return {
    kol: kolModule($axios),
    login: loginModule($axios),
    program: programModule($axios),
    home: homeModule($axios),
    feedback: feedbackModule($axios),
    category: categoryModule($axios),
    search: searchModule($axios),
  } as IRootHttpState
}
