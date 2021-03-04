<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="风险描述" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.description | descriptionFilter }}
      </template>
    </el-table-column>
    <el-table-column label="所属项目" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.project.name }}
      </template>
    </el-table-column>
    <el-table-column label="风险等级" width="100" align="center">
      <template slot-scope="scope">
        <el-tag style="color:#fefefe" :color="scope.row.level | levelColorFilter"> {{ scope.row.level | levelFilter }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>
<style lang="less" scoped>
.el-tag{
  border: none!important;
}
</style>
<script>
import { fetchList } from '@/api/risk'

export default {
  filters: {
    levelColorFilter(status) {
      const statusMap = {
        '1': 'success',
        '2': '#f6ef37',
        '3': 'warning',
        '4': 'danger'
      }
      return statusMap[status]
    },
    levelFilter(status) {
      const statusMap = {
        '1': '正常',
        '2': '低',
        '3': '中',
        '4': '高'
      }
      return statusMap[status]
    },
    descriptionFilter(str) {
      return str.substring(0, 28)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchList().then(response => {
        this.list = response.data.slice(0, 10)
      })
    }
  }
}
</script>
