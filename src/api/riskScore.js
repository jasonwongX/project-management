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

export function deleteRiskScore(id) {
  return request({
    url: '/riskScore/delete',
    method: 'post',
    params: { id }
  })
}

export function getProjectScoreList(query) {
  return request({
    url: '/riskScore/projectScoreList',
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
