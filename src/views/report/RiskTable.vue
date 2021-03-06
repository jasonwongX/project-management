<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="排名" min-width="60">
      <template slot-scope="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column label="风险类型" min-width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.type_name }}
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
import { projectMonthRiskRank } from '@/api/monthOverview'
export default {
  props: {
    month: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: []
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
      projectMonthRiskRank(this.month).then(response => {
        this.list = response.data
      })
    }
  }
}
</script>
