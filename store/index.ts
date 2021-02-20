import { Context } from '@nuxt/types'
import { actionTree, mutationTree, getAccessorType } from 'typed-vuex'
import { IUserInfoResult } from '@apiModules/user'
import * as global from './global'
import * as layouts from './layouts'
import { IToken } from '~/api/token'

type IUserInfo = IUserInfoResult['result'] & {
  isLogin: boolean
}

interface IRootState {
  userInfo: IUserInfo
}

export const state: () => IRootState = () => ({
  userInfo: {
    userId: 0,
    kol: 0,
    smallImageUrl: '',
    nickname: '',
    isLogin: false,
  },
})

export const mutations = mutationTree(state, {
  setUserInfo(state, payload: IUserInfoResult['result']) {
    state.userInfo = { ...payload, isLogin: true }
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async getUserInfo({ commit }, payload: number) {
      const userInfo = await this.app.$http.user.getUserInfo({
        userId: payload,
      })
      commit('setUserInfo', userInfo)
    },
    async nuxtServerInit({ commit, dispatch }, { app, $axios }: Context) {
      const token = app.$cookies.get<IToken | undefined>('token')

      if (token) {
        $axios.defaults.headers = token
        const userInfo = await this.app.$http.user.getUserInfo({
          userId: token.uid,
        })
        commit('setUserInfo', userInfo)
      }
      await dispatch('layouts/getCommendList')
    },
  }
)

export const accessorType = getAccessorType({
  state,
  mutations,
  actions,
  modules: {
    global,
    layouts,
  },
})
