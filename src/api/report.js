import request from '@/utils/request'

/**
 * 传统项目报表列表
 * @param {*} data
 */
export function projectReportList(data) {
  return request({
    url: '/report/project/list',
    method: 'get',
    params: data
  })
}

/**
 * 创建传统项目报表
 * @param {*} data
 */
export function createProjectMonthReport(data) {
  return request({
    url: '/report/project/addMonthReport',
    method: 'post',
    params: data
  })
}

/**
 * 敏捷项目报表列表
 * @param {*} data
 */
export function agileProjectReportList(data) {
  return request({
    url: '/report/agileProject/list',
    method: 'get',
    params: data
  })
}

/**
 * 创建敏捷项目报表
 * @param {*} data
 */
export function createAgileProjectMonthReport(data) {
  return request({
    url: '/report/agileProject/addMonthReport',
    method: 'post',
    params: data
  })
}

export function exportProject(data) {
  return request({
    url: '/report/export/project',
    method: 'get',
    params: data
  })
}

