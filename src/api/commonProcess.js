import request from '@/utils/request'

/**
 * 获取项目过程信息
 * @param {*} projectId
 * @returns
 */
export function getCommonProcess(projectId) {
  return request({
    url: '/project/commonProcess/list',
    method: 'get',
    params: { project_id: projectId }
  })
}

/**
 * 初始化项目过程信息
 * @param {*} projectId
 * @returns
 */
export function initCommonProcess(projectId) {
  return request({
    url: '/project/commonProcess/init',
    method: 'post',
    params: { project_id: projectId }
  })
}

