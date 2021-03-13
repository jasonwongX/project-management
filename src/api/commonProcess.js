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
 * 获取项目生命周期
 * @param {*} projectId
 * @returns
 */
export function getTimeLine(projectId) {
  return request({
    url: '/project/commonProcess/getTimeLine',
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

/**
 * 修改过程信息
 * @param {*} projectId
 * @param {*} content
 * @returns
 */
export function modifyCommonProcess(projectId, content) {
  return request({
    url: '/project/commonProcess/modify',
    method: 'post',
    params: { project_id: projectId, content }
  })
}

