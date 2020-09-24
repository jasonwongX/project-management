import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-admin-template/transaction/list',
    method: 'get',
    params: query
  })
}
