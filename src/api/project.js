import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/project/list',
    method: 'get',
    params: query
  })
}

// 我的项目列表
export function fetchMyProjectList(query) {
  return request({
    url: '/project/my',
    method: 'get',
    params: query
  })
}

export function fetchProject(id) {
  return request({
    url: '/project/info',
    method: 'get',
    params: { id }
  })
}
export function addProject(data) {
  return request({
    url: '/project/add',
    method: 'post',
    params: data
  })
}

export function editProject(data) {
  return request({
    url: '/project/modify',
    method: 'post',
    params: data
  })
}
export function deleteProject(id) {
  return request({
    url: '/project/delete',
    method: 'post',
    params: { id }
  })
}
/**
 * 修改项目过程信息
 * @param {*} projectId
 * @param {*} stage
 * @returns
 */
export function modifyCommonProcess(projectId, stage) {
  return request({
    url: '/project/add',
    method: 'post',
    params: { projectId, stage }
  })
}

/**
 * 项目投产
 * @param {*} data 投产信息
 */
export function completeProject(data) {
  return request({
    url: '/project/complete',
    method: 'post',
    params: data
  })
}

export function deleteCompleteProject(id) {
  return request({
    url: '/project/complete/delete',
    method: 'post',
    params: { id }
  })
}

/**
 * 已投产项目列表
 * @param {*} query
 */
export function fetchCompleteProjectList(query) {
  return request({
    url: '/project/complete/list',
    method: 'get',
    params: query
  })
}

/**
 * 项目状态更新
 * @param {*} data 项目状态
 */
export function updateProjectStatus(data) {
  return request({
    url: '/project/updateStatus',
    method: 'post',
    params: data
  })
}

/**
 * 项目汇总信息
 * @param {*} id 项目ID
 */
export function projectCollectDetail(id) {
  return request({
    url: '/project/collectDetail',
    method: 'get',
    params: { id }
  })
}

/**
 * 保存、新增项目额外内容
 * @param {*} data 项目信息
 */
export function saveProjectContent(data) {
  return request({
    url: '/project/saveContent',
    method: 'post',
    params: data
  })
}

export function getStageList() {
  return request({
    url: '/project/stageList',
    method: 'get',
    params: { }
  })
}

export function getScaleList() {
  return request({
    url: '/project/scaleList',
    method: 'get',
    params: { }
  })
}

export function getControlModeList() {
  return request({
    url: '/project/controlModeList',
    method: 'get',
    params: { }
  })
}

export function getQaProjectStatistics() {
  return request({
    url: '/project/qaStatistics',
    method: 'get',
    params: { }
  })
}
export function getProjectTotalStatistics() {
  return request({
    url: '/project/projectTotalStatistics',
    method: 'get',
    params: { }
  })
}
export function getProjectScaleStatistics() {
  return request({
    url: '/project/scaleStatistics',
    method: 'get',
    params: { }
  })
}
export function getProjectStageStatistics() {
  return request({
    url: '/project/stageStatistics',
    method: 'get',
    params: { }
  })
}

export function getProjectControlModeStatistics() {
  return request({
    url: '/project/controlModeStatistics',
    method: 'get',
    params: { }
  })
}
export function getProjectDevModeStatistics() {
  return request({
    url: '/project/devModeStatistics',
    method: 'get',
    params: { }
  })
}

