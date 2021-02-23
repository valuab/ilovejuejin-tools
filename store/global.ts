import { mutationTree, actionTree } from 'typed-vuex'
import { IListType } from '@apiModules/feedback'

export interface IGlobalState {
  isSearchPopup: Boolean // 搜索弹窗显示
  isFeedBack: Boolean // 反馈弹窗显示
  isLoginPopUpShow: boolean // 登录弹窗显示
  feedBackTabsList: IListType[] // 反馈弹窗单选列表
  feedBackAppVersion: IListType[] // 反馈弹窗app版本列表
}

export const namespaced = true

export const state: () => IGlobalState = () => ({
  isSearchPopup: false,
  isFeedBack: false,
  isLoginPopUpShow: false,
  feedBackTabsList: [],
  feedBackAppVersion: [],
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
  setFeedBackTabs(state, list) {
    state.feedBackTabsList = list
  },
  setFeedBackVersion(state, list) {
    state.feedBackAppVersion = list
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async getFeedBackTabs({ state, commit }) {
      if (state.feedBackTabsList.length === 0) {
        const { list } = await this.app.$http.feedback.getFeedbackCategory()
        commit('setFeedBackTabs', list)
      }
    },

    async getFeedBackVersion({ state, commit }) {
      if (state.feedBackAppVersion.length === 0) {
        const { list } = await this.app.$http.feedback.getAppVersionList()
        commit('setFeedBackVersion', list)
      }
    },
  }
)
