
const state = {
  projectListParams: {
    page: 1,
    limit: 20,
    title: undefined,
    type: undefined,
    devMode: '0',
    user_id: ''
  }
}

const mutations = {
  UPDATE_PROJECT_LIST_PARAMS: (state, data => {
    this.projectListParams = data
  })
}

const actions = {
  updateProjectListParams({ commit }, data) {
    commit('UPDATE_PROJECT_LIST_PARAMS', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

