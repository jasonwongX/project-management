import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/riskScore/list',
    method: 'get',
    params: query
  })
}

export function addRiskScore(data) {
  return request({
    url: '/riskScore/add',
    method: 'post',
    params: data
  })
}

export function editRiskScore(data) {
  return request({
    url: '/riskScore/modify',
    method: 'post',
    params: data
  })
}

export function deleteRiskScore(projectId, month) {
  return request({
    url: '/riskScore/delete',
    method: 'post',
    params: {
      'project_id': projectId,
      'time': month
    }
  })
}

export function getProjectScoreList(query) {
  return request({
    url: '/riskScore/projectScoreList',
    method: 'get',
    params: query
  })
}

export function getProjectScoreByMonth(query) {
  return request({
    url: '/riskScore/projectScoreByMonth',
    method: 'get',
    params: query
  })
}

export function getRiskScoreStatistics() {
  return request({
    url: '/riskScore/averageScoreStatistics',
    method: 'get',
    params: { }
  })
}
