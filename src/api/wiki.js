import request from '@/utils/request'

/**
 * 知识库分类树状
 * @param {*} data
 */
export function getCategoryList(data) {
  return request({
    url: '/wiki/category/treeList',
    method: 'get',
    params: data
  })
}

/**
 * 知识库分类列表
 * @param {*} data
 * @returns
 */
export function getCategoryNameList(data) {
  return request({
    url: '/wiki/category/nameList',
    method: 'get',
    params: data
  })
}

