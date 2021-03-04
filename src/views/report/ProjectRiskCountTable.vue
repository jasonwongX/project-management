<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="排名" min-width="60">
      <template slot-scope="scope">
        {{ scope.row.rank }}
      </template>
    </el-table-column>
    <el-table-column label="项目名称" min-width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column label="风险数" min-width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.count }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      list: [{
        rank: 1,
        name: '养老金管理系统项目（二期）',
        count: 10
      }, {
        rank: 2,
        name: '兴业银行零售网络信贷性能优化项目',
        count: 8
      }, {
        rank: 3,
        name: '私人银行增值服务项目',
        count: 6
      }, {
        rank: 4,
        name: '天网工程项目',
        count: 5
      }, {
        rank: 5,
        name: '借记卡功能优化项目',
        count: 4
      }]
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
