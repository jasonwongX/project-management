import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-admin-template/risk/list',
    method: 'get',
    params: query
  })
}

export function fetchProject(id) {
  return request({
    url: '/vue-admin-template/risk/info',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-admin-template/risk/pv',
    method: 'get',
    params: { pv }
  })
}
