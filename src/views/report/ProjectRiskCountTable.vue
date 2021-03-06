<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="排名" min-width="60">
      <template slot-scope="scope">
        {{ scope.$index + 1 }}
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
import { projectMonthProjectRiskRank } from '@/api/monthOverview'

export default {
  props: {
    month: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: [],
      listQuery: {
        page: 1,
        limit: 5,
        month: this.month
      }
    }
  },
  watch: {
    month: {
      handler() {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listQuery.month = this.month
      projectMonthProjectRiskRank(this.listQuery).then(response => {
        this.list = response.data
      })
    }
  }
}
</script>
