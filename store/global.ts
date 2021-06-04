import { mutationTree, actionTree } from 'typed-vuex'
import { IAppVersionType, ICategoryListType } from '@apiModules/feedback'
import { Route } from 'vue-router'

export interface IGlobalState {
  isSearchPopup: Boolean // 搜索弹窗显示
  isFeedBack: Boolean // 反馈弹窗显示
  isLoginPopUpShow: Boolean // 登录弹窗显示
  isAdPopupShow: Boolean // 广告弹窗显示
  isWxAppPopupShow: Boolean // H5跳转小程序弹窗
  navTarget: String // 路由跳转目标
  toRouteObj: Route // 移动端路由跳转对象
  feedBackTabsList: ICategoryListType[] // 反馈弹窗单选列表
  feedBackAppVersion: IAppVersionType[] // 反馈弹窗app版本列表
  isCommentType: Boolean // 是否允许评论
}

export const namespaced = true

export const state: () => IGlobalState = () => ({
  isSearchPopup: false,
  isFeedBack: false,
  isLoginPopUpShow: false,
  isAdPopupShow: true,
  isWxAppPopupShow: false,
  navTarget: '_blank',
  toRouteObj: <Route>{},
  feedBackTabsList: [],
  feedBackAppVersion: [],
  isCommentType: true,
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
  showAdPopup(state) {
    state.isAdPopupShow = !state.isAdPopupShow
  },
  showWxAppPopup(state, show: boolean) {
    state.isWxAppPopupShow = show
  },
  setNavTarget(state, targetStr: string) {
    state.navTarget = targetStr
  },
  setToRoute(state, route: Route) {
    state.toRouteObj = route
  },
  setFeedBackTabs(state, list) {
    state.feedBackTabsList = list
  },
  setFeedBackVersion(state, list) {
    state.feedBackAppVersion = list
  },
  allowComment(state, value) {
    state.isCommentType = value
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
