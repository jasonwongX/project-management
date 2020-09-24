import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-admin-template/staff/list',
    method: 'get',
    params: query
  })
}
