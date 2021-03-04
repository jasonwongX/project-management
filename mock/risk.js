const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    create_time: +Mock.Random.date('T'),
    update_time: +Mock.Random.date('T'),
    discoverer: '@cname',
    responsible: '@cname',
    description: '@ctitle(20, 80)',
    project: '@ctitle(5, 10)',
    classify_id: '@integer(1, 11)',
    level: '@integer(1, 4)',
    status: '@integer(1, 6)',
    stage: '@integer(1, 7)',
    quality_effect: '@integer(1, 5)',
    schedule_effect: '@integer(1, 5)',
    cost_effect: '@integer(1, 5)',
    probability: '@integer(1, 5)',
    emergency_measures: '@ctitle(10,60)', // 应急措施
    circumvention_measures: '@ctitle(10,60)', // 规避措施
    pageviews: '@integer(300, 5000)'
  }))
}
module.exports = [
  // get project list
  {
    url: '/vue-admin-template/risk/list',
    type: 'get',
    response: config => {
      const { classify_id, level, stage, status, description, project, page = 1, limit = 20 } = config.query
      const mockList = List.filter(item => {
        if (classify_id && item.classify_id !== parseInt(classify_id)) return false
        if (level && item.level !== parseInt(level)) return false
        if (stage && item.stage !== parseInt(stage)) return false
        if (status && item.status !== parseInt(status)) return false
        if (project && item.project.indexOf(project) < 0) return false
        if (description && item.description.indexOf(description) < 0) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  // get risk info
  {
    url: '/vue-admin-template/risk/info\.*',
    type: 'get',
    response: config => {
      const { id } = config.query
      let info = {}
      for (const risk of List) {
        if (risk.id === +id) {
          info = risk
        }
      }
      return {
        code: 20000,
        data: info
      }
    }
  }
]
