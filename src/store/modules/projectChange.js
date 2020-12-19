import { getTypeList, getLevelList } from '@/api/projectChange'

const state = {
  levelList: [],
  typeList: []
}

const mutations = {
  setLevelList(state, info) {
    state.levelList = info
  },
  setTypeList(state, info) {
    state.typeList = info
  }
}

const actions = {

  async initLevelList(context) {
    const list = await getLevelList()
    context.commit('setLevelList', list)
  },

  async initTypeList(context) {
    const list = await getTypeList()
    context.commit('setTypeList', list)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
