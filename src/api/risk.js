import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/risk/list',
    method: 'get',
    params: query
  })
}

export function fetchInfo(id) {
  return request({
    url: '/risk/info',
    method: 'get',
    params: { id }
  })
}

export function getRiskTypeStatistics() {
  return request({
    url: '/risk/riskTypeStatistics',
    method: 'get',
    params: { }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-admin-template/risk/pv',
    method: 'get',
    params: { pv }
  })
}

export function getStatusList() {
  return request({
    url: '/risk/statusList',
    method: 'get',
    params: { }
  })
}

export function getTypeList() {
  return request({
    url: '/risk/typeList',
    method: 'get',
    params: { }
  })
}

export function getLevelList() {
  return request({
    url: '/risk/levelList',
    method: 'get',
    params: { }
  })
}

export function addRisk(data) {
  return request({
    url: '/risk/add',
    method: 'post',
    params: data
  })
}

export function editRisk(data) {
  return request({
    url: '/risk/modify',
    method: 'post',
    params: data
  })
}

export function deleteRisk(id) {
  return request({
    url: '/risk/delete',
    method: 'post',
    params: { id }
  })
}
