import { Context } from '@nuxt/types'
import { ActionTree, MutationTree } from 'vuex'
import { IUserInfoResult } from '@apiModules/user'
import { IToken } from '~/api/token'

type IUserInfoType = Partial<IUserInfoResult['result']>
interface IUserInfo extends IUserInfoType {
  isLogin: boolean
}

export interface IRootState {
  userInfo: IUserInfo
}

export const state: () => IRootState = () => ({
  userInfo: {
    isLogin: false,
  },
})

export const mutations: MutationTree<IRootState> = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
}

export const actions: ActionTree<IRootState, IRootState> = {
  async getUserInfo({ commit }, userId: string) {
    const userInfo = await this.app.$http.user.getUserInfo({ userId })
    commit('setUserInfo', userInfo)
  },
  nuxtServerInit({ dispatch }, { app, $axios }: Context) {
    const token = app.$cookies.get<IToken | null>('token')

    if (token) {
      $axios.defaults.headers = token
      dispatch('getUserInfo', token.uid)
    }
  },
}
