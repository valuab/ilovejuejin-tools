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
import commentModule, { ICommentModule } from './modules/comment'
import postsModule, { IPostsModule } from './modules/posts'
import AdModule, { IAdModule } from './modules/adList'
import mobileModule, { IMobileModule } from './modules/mobileModule'

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
  comment: ICommentModule
  posts: IPostsModule
  adList: IAdModule
  mobile: IMobileModule
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
    comment: commentModule($axios),
    posts: postsModule($axios),
    adList: AdModule($axios),
    mobile: mobileModule($axios),
  } as IRootHttpState
}
