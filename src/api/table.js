import request from '@/utils/request'

export function getList(params) {
  debugger
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
