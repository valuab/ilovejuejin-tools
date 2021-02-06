import { ActionTree } from 'vuex'
import { IRootState } from './index'

export interface IGlobalState {
  isSearchPopup: Boolean
  isFeedBack: Boolean
}

export const state = () => ({
  isSearchPopup: false,
  isFeedBack: false,
})

export const mutations = {
  showSearchPopup(state: IGlobalState) {
    state.isSearchPopup = !state.isSearchPopup
  },

  showFeedBack(state: IGlobalState) {
    state.isFeedBack = !state.isFeedBack
  },
}

export const actions: ActionTree<IGlobalState, IRootState> = {
  showSearchPopup(context) {
    context.commit('showSearchPopup')
  },

  showFeedBack(context) {
    context.commit('showFeedBack')
  },
}
