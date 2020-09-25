const Mock = require('mockjs')

const { param2Obj } = require('./utils')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    qa: '@cname',
    pm: '@cname',
    name: '@ctitle(5, 10)',
    content_short: '我是测试数据',
    forecast: '@float(0, 100, 2, 2)',
    control_mode: '@integer(1, 3)',
    scale: '@integer(1, 5)',
    risk: '@integer(0, 3)',
    'stage|1': ['需求', '概要设计', '编码', '准备上线', '上线部署'],
    pageviews: '@integer(300, 5000)'
  }))
}
module.exports = [
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
  }
]
// export default {
//   getList: config => {
//     const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

//     let mockList = List.filter(item => {
//       if (importance && item.importance !== +importance) return false
//       if (type && item.type !== type) return false
//       if (title && item.title.indexOf(title) < 0) return false
//       return true
//     })

//     if (sort === '-id') {
//       mockList = mockList.reverse()
//     }

//     const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

//     return {
//       total: mockList.length,
//       items: pageList
//     }
//   },
//   getPv: () => ({
//     pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
//   }),
//   getArticle: (config) => {
//     const { id } = param2Obj(config.url)
//     for (const article of List) {
//       if (article.id === +id) {
//         return article
//       }
//     }
//   }
// }
