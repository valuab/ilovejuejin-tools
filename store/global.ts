import { actionTree, mutationTree } from 'typed-vuex'

export interface IGlobalState {
  isSearchPopup: Boolean
  isFeedBack: Boolean
  isLoginPopUpShow: boolean
}

export const namespaced = true

export const state: () => IGlobalState = () => ({
  isSearchPopup: false,
  isFeedBack: false,
  isLoginPopUpShow: false,
})

export const mutations = mutationTree(state, {
  showSearchPopup(state) {
    state.isSearchPopup = !state.isSearchPopup
  },
  showFeedBack(state) {
    state.isFeedBack = !state.isFeedBack
  },
  showLoginPopUpOrHide(state) {
    state.isLoginPopUpShow = !state.isLoginPopUpShow
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
