import { getStatusList, getTypeList, getLevelList } from '@/api/risk'

const state = {
  statusList: [],
  levelList: [],
  typeList: []
}

const mutations = {
  setStatusList(state, info) {
    state.statusList = info
  },
  setLevelList(state, info) {
    state.levelList = info
  },
  setTypeList(state, info) {
    state.typeList = info
  }
}

const actions = {

  async initStatusList(context) {
    const list = await getStatusList()
    context.commit('setStatusList', list)
  },

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
