import request from '@/utils/request'

export function projectMonthTotalCount(month) {
  return request({
    url: 'project/month/overview/totalCount',
    method: 'get',
    params: { month }
  })
}

export function projectMonthStage(month) {
  return request({
    url: 'project/month/overview/stage',
    method: 'get',
    params: { month }
  })
}

export function projectMonthScale(month) {
  return request({
    url: 'project/month/overview/scale',
    method: 'get',
    params: { month }
  })
}

export function projectMonthControlMode(month) {
  return request({
    url: 'project/month/overview/controlMode',
    method: 'get',
    params: { month }
  })
}
export function projectMonthDevMode(month) {
  return request({
    url: 'project/month/overview/devMode',
    method: 'get',
    params: { month }
  })
}
export function projectMonthRiskRank(month) {
  return request({
    url: 'project/month/overview/riskRank',
    method: 'get',
    params: { month }
  })
}

export function projectMonthProjectRiskRank(query) {
  return request({
    url: 'project/month/overview/projectRiskRank',
    method: 'get',
    params: query
  })
}

