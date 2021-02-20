import { actionTree, mutationTree } from 'typed-vuex'
import { ICommendListData } from '~/api/apiPublic/modules/content'

export interface ILayoutsState {
  commendList: ICommendListData[]
}

export const namespaced = true

export const state: () => ILayoutsState = () => ({
  commendList: [],
})

export const mutations = mutationTree(state, {
  setCommendList(state, payload: ILayoutsState['commendList']) {
    state.commendList = [...payload]
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async getCommendList({ commit }) {
      const commendList = await this.app.$http.content.getCommendList()
      commit('setCommendList', commendList)
    },
  }
)
