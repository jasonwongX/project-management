<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="用户名称" min-width="160">
      <template slot-scope="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column label="负责项目数" width="90" align="center">
      <template slot-scope="scope">
        {{ scope.row.num }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { fetchList } from '@/api/staff'

export default {
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
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>
