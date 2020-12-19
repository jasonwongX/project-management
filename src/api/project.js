import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/project/list',
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

export function fetchPv(pv) {
  return request({
    url: '/project/pv',
    method: 'get',
    params: { pv }
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

