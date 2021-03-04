import { getScaleList, getStageList, getControlModeList } from '@/api/project'

const state = {
  stageList: [],
  scaleList: [],
  controlModeList: []
}

const mutations = {
  setStageList(state, info) {
    state.stageList = info
  },
  setScaleList(state, info) {
    state.scaleList = info
  },
  setControlModeList(state, info) {
    state.controlModeList = info
  }
}

const actions = {

  async initStageList(context) {
    const list = await getStageList()
    context.commit('setStageList', list)
  },

  async initScaleList(context) {
    const list = await getScaleList()
    context.commit('setScaleList', list)
  },

  async initControlModeList(context) {
    const list = await getControlModeList()
    context.commit('setControlModeList', list)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
