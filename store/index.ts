export interface IRootState {
  counter: number
}

export const state = () => ({
  counter: 0,
})

export const mutations = {
  increment(state: IRootState) {
    state.counter++
  },
}
