// import Mock from 'mockjs'

// const List = []
// const count = 20

// for (let i = 0; i < count; i++) {
//   List.push(Mock.mock({
//     order_no: '@guid()',
//     timestamp: +Mock.Random.date('T'),
//     username: '@name()',
//     price: '@float(1000, 15000, 0, 2)',
//     'status|1': ['success', 'pending']
//   }))
// }
// export default {
//   getList: () => {
//     return {
//       total: List.length,
//       items: List
//     }
//   }
// }

const Mock = require('mockjs')

const List = []
const count = 20
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    order_no: `存在项目风险${i + 1}`,
    timestamp: +Mock.Random.date('T'),
    username: '@name()',
    price: `项目${i + 1}`,
    'status|1': ['无风险', '低风险']
  }))
}

module.exports = [
  {
    url: '/vue-admin-template/transaction/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: List.length,
          items: List
        }
      }
    }
  }
]

