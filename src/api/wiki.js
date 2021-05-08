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

export function getArticleList(query) {
  return request({
    url: '/wiki/article/list',
    method: 'get',
    params: query
  })
}

export function getArticleInfo(id) {
  return request({
    url: '/wiki/article/info',
    method: 'get',
    params: { id }
  })
}
export function addArticle(data) {
  return request({
    url: '/wiki/article/add',
    method: 'post',
    params: data
  })
}

export function editArticle(data) {
  return request({
    url: '/wiki/article/modify',
    method: 'post',
    params: data
  })
}
export function deleteArticle(id) {
  return request({
    url: '/wiki/article/delete',
    method: 'post',
    params: { id }
  })
}

