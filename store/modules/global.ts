import { actionTree, mutationTree } from 'typed-vuex'

export interface IGlobalState {
  isSearchPopup: Boolean
  isFeedBack: Boolean
}

export const namespaced = true

export const state: () => IGlobalState = () => ({
  isSearchPopup: false,
  isFeedBack: false,
})

export const mutations = mutationTree(state, {
  showSearchPopup(state) {
    state.isSearchPopup = !state.isSearchPopup
  },

  showFeedBack(state) {
    state.isFeedBack = !state.isFeedBack
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    showSearchPopup(context) {
      context.commit('showSearchPopup')
    },

    showFeedBack(context) {
      context.commit('showFeedBack')
    },
  }
)
