<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="排名" min-width="60">
      <template slot-scope="scope">
        {{ scope.row.rank }}
      </template>
    </el-table-column>
    <el-table-column label="风险类型" min-width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.risk }}
      </template>
    </el-table-column>
    <el-table-column label="风险项目数" min-width="100" align="center">
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
        risk: '硬件采购',
        count: 10
      }, {
        rank: 2,
        risk: '流程审批',
        count: 8
      }, {
        rank: 3,
        risk: '业务测试',
        count: 6
      }, {
        rank: 4,
        risk: '业务需求',
        count: 5
      }, {
        rank: 5,
        risk: '人力资源',
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
