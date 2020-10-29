<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" style="width:140px;" icon="el-icon-plus" @click="handleCreate">新增风险评分</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" style="width:120px;float:right" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>
    <div class="filter-container">
      <el-input v-model="listQuery.project_name" placeholder="所属项目名称" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.type" placeholder="请选择风险分类" clearable class="filter-item" style="width: 150px">
        <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="index" />
      </el-select>
      <el-date-picker v-model="listQuery.month" type="month" format="yyyy-MM" placeholder="选择月份" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="wdith:80px;float:right" @click="handleFilter">查询</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="所属项目" min-width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="风险分类" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ typeFilter(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="风险评分" min-width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="月份" min-width="80">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.update_date) }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleModify(scope.row)">编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>
<style lang="less" scoped>
.filter-container {
  margin-bottom:8px;
}
.filter-item {
  margin-bottom:5px;
  margin-right: 10px;
}
.el-tag{
  border: none!important;
}
</style>
<script>
import { fetchList, deleteRiskScore } from '@/api/riskScore'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
const moment = require('moment')

export default {
  name: 'RiskScoreList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      typeList: [],
      listQuery: {
        page: 1,
        limit: 20
      },
      downloadLoading: false
    }
  },
  async created() {
    await this.$store.dispatch('risk/initTypeList')
    this.typeList = this.$store.state.risk.typeList
    this.getList()
  },
  methods: {
    formatDate(value) {
      return `${moment(value).year()}-${moment(value).month() + 1}`
    },
    typeFilter(item) {
      return this.typeList[item] ? this.typeList[item] : '未知'
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total ? response.total : 0
        this.listQuery.limit = parseInt(response.per_page)
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModify(row) {
      this.$router.push({ path: '/risk/editScore', query: { project_id: row.project_id, month: row.update_date }})
    },
    handleCreate(row) {
      this.$router.push({ path: '/risk/addScore' })
    },
    handleDelete(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRiskScore(row.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        }).catch((_) => {
          this.$message({
            type: 'success',
            message: '删除失败!'
          })
        })
      })
    },

    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
