import { ActionTree } from 'vuex'
import type { IRootState } from './index'

export interface IGlobalState {
  isSearchPopup: Boolean
}

export const state = () => ({
  isSearchPopup: false,
})

export const mutations = {
  showSearchPopup(state: IGlobalState) {
    state.isSearchPopup = !state.isSearchPopup
  },
}

export const actions: ActionTree<IGlobalState, IRootState> = {
  showSearchPopup(context) {
    context.commit('showSearchPopup')
  },
}
