import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-admin-template/project/list',
    method: 'get',
    params: query
  })
}

export function fetchProject(id) {
  return request({
    url: '/vue-admin-template/project/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-admin-template/project/pv',
    method: 'get',
    params: { pv }
  })
}
