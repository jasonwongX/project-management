import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/projectChange/list',
    method: 'get',
    params: query
  })
}

export function fetchInfo(id) {
  return request({
    url: '/projectChange/info',
    method: 'get',
    params: { id }
  })
}

export function getTypeList() {
  return request({
    url: '/projectChange/typeList',
    method: 'get',
    params: { }
  })
}

export function getLevelList() {
  return request({
    url: '/projectChange/levelList',
    method: 'get',
    params: { }
  })
}

export function addProjectChange(data) {
  return request({
    url: '/projectChange/add',
    method: 'post',
    params: data
  })
}

export function editProjectChange(data) {
  return request({
    url: '/projectChange/modify',
    method: 'post',
    params: data
  })
}

export function deleteProjectChange(id) {
  return request({
    url: '/projectChange/delete',
    method: 'post',
    params: { id }
  })
}
