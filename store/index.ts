import { ActionTree, MutationTree } from 'vuex'

interface IUserInfo {
  name?: string
  avatar?: string
  isLogin: boolean
}

export interface IRootState {
  userInfo: IUserInfo | null
}

export const state: () => IUserInfo = () => ({
  isLogin: false,
})

export const mutations: MutationTree<IRootState> = {
  setUserInfo(state: IRootState, userInfo: IUserInfo) {
    state.userInfo = userInfo
  },
}

export const actions: ActionTree<IRootState, IRootState> = {
  setUserInfo({ commit }, userInfo: IUserInfo) {
    commit('setUserInfo', userInfo)
  },
}
