const Mock = require('mockjs')

const { param2Obj } = require('./utils')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  const cycle = [] // 生命周期
  const changelog = [] // 变更历史
  for (let j = 0; j < 10; j++) {
    changelog.push({
      time: Mock.Random.date(),
      content: '@ctitle(10, 60)',
      user: '@cname'
    })
  }
  cycle.push({
    time: Mock.Random.date(),
    stage: '项目章程发布'
  })
  cycle.push({
    time: Mock.Random.date(),
    stage: '项目启动日期'
  })
  cycle.push({
    time: Mock.Random.date(),
    stage: '软件需求发布日期'
  })
  cycle.push({
    time: Mock.Random.date(),
    stage: '概要设计发布日期'
  })
  cycle.push({
    time: Mock.Random.date(),
    stage: '测试日期'
  })
  cycle.push({
    time: Mock.Random.date(),
    stage: '部署日期'
  })
  cycle.push({
    time: Mock.Random.date(),
    stage: '上线日期'
  })
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    qa: '@cname',
    pm: '@cname',
    name: '@ctitle(5, 10)',
    sequece: '@word(10)',
    description: '@ctitle(30,100)',
    content_short: '我是测试数据',
    forecast: '@float(0, 100, 2, 2)',
    control_mode: '@integer(1, 3)',
    scale: '@integer(1, 5)',
    risk: '@integer(0, 3)',
    cycle,
    changelog,
    'stage|1': ['需求', '概要设计', '编码', '准备上线', '上线部署'],
    pageviews: '@integer(300, 5000)',
    // 项目日期
    start_time: Mock.Random.date(),
    end_time: Mock.Random.date(),
    // 相关联系人
    db_c: '@cname',
    risk_c: '@cname',
    env_c: '@cname',
    ba_c: '@cname',
    po_c: '@cname',
    test_pm_c: '@cname',
    arch_c: '@cname',
    arch_app_c: '@cname',
    arch_safe_c: '@cname'
  }))
}
module.exports = [
  // get project list
  {
    url: '/vue-admin-template/project/list',
    type: 'get',
    response: config => {
      const { control_mode, scale, risk, pm, qa, name, page = 1, limit = 20 } = param2Obj(config.url)
      const mockList = List.filter(item => {
        if (control_mode && item.control_mode !== parseInt(control_mode)) return false
        if (scale && item.scale !== parseInt(scale)) return false
        if (risk && item.risk !== parseInt(risk)) return false

        if (name && item.name.indexOf(name) < 0) return false
        if (pm && item.pm.indexOf(pm) < 0) return false
        if (qa && item.qa.indexOf(qa) < 0) return false

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
  // get project info
  {
    url: '/vue-admin-template/project/info\.*',
    type: 'get',
    response: config => {
      const { id } = param2Obj(config.url)
      let info = {}
      for (const project of List) {
        if (project.id === +id) {
          info = project
        }
      }
      return {
        code: 20000,
        data: info
      }
    }
  }
]
