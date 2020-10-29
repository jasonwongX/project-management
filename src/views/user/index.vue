<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="账号" min-width="110">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.real_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.telephone }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="性别" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.gender | genderStyleFileter">{{ scope.row.gender | genderFileter }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/user'

export default {
  filters: {
    genderStyleFileter(type) {
      const map = {
        0: 'info',
        1: 'success',
        2: 'warning'
      }
      return map[type]
    },
    genderFileter(type) {
      const map = {
        0: '未知',
        1: '男',
        2: '女'
      }
      return map[type]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
