import { actionTree, mutationTree } from 'typed-vuex'
import { ILayoutListData, IKolListData } from '~/api/apiPublic/modules/home'
import { CATEGORY_LIST_SORT } from '~/enums/index'

type IkolItem = ILayoutListData & IKolListData
export interface ILayoutsState {
  commendList: ILayoutListData[]
  opItemCategoryList: ILayoutListData[]
  kolList: IkolItem[]
}

export const namespaced = true

export const state: () => ILayoutsState = () => ({
  commendList: [],
  opItemCategoryList: [],
  kolList: [],
})

export const mutations = mutationTree(state, {
  setCommendList(state, payload: ILayoutListData[]) {
    state.commendList = [...payload]
  },
  setOpItemCategoryList(state, payload: ILayoutListData[]) {
    state.opItemCategoryList = [...payload]
  },
  setKolList(state, payload: IkolItem[]) {
    state.kolList = [...payload]
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async getCommendList({ commit }) {
      const commendList = await this.app.$http.home.getCommendList()
      commit('setCommendList', commendList)
    },
    async getOpItemCategoryList({ commit }) {
      const opItemCategoryList = await this.app.$http.home.getOpItemCategory({
        sort: CATEGORY_LIST_SORT.WEIGHTED_SORT,
      })
      commit('setOpItemCategoryList', opItemCategoryList)
    },
    async getKolList({ commit }) {
      const kolList = await this.app.$http.home.getKolList()
      const newKolList = kolList.map((val) => {
        const item = {
          id: val.userId.toString(),
          name: val.nickname,
          ...val,
        }
        return item as IkolItem
      })
      commit('setKolList', newKolList)
    },
  }
)
