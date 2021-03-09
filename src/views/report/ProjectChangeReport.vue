<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.month"
        class="filter-item"
        type="month"
        placeholder="选择月"
        @change="handleFilter"
      />
      <el-input v-model="listQuery.project_name" placeholder="所属项目名称" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.type" placeholder="请选择分类" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.level" placeholder="请选择等级" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(item, index) in levelList" :key="index" :label="item" :value="index" />
      </el-select>

      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" style="width:120px;float:right" icon="el-icon-download" @click="exportReport">导出</el-button>
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
      <el-table-column label="项目名称" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目经理" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project.pm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="变更类型" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ typeFilter(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审批等级" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ levelFilter(scope.row.level) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="变更提交时间" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.change_date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否外部强制变更" min-width="40px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.is_external_forced_change ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否增加预算" min-width="40px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.is_add_budget ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作量变化(人月)" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.workload_changes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作量变化率" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ formatPercent(scope.row.workload_change_rate) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工期偏差(天)" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.schedule_deviation }}</span>
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
import { fetchList, deleteProjectChange } from '@/api/projectChange'
import waves from '@/directive/waves' // Waves directive
import { formatPercent } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
const moment = require('moment')

export default {
  name: 'ProjectChangeReport',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      levelList: [],
      typeList: [],
      listQuery: {
        project_name: '',
        page: 1,
        limit: 20,
        month: moment().format('YYYY-MM')
      },
      downloadLoading: false
    }
  },
  async created() {
    this.listQuery.project_name = this.$route.query.project_name ? this.$route.query.project_name : ''
    await this.$store.dispatch('projectChange/initLevelList')
    await this.$store.dispatch('projectChange/initTypeList')
    await this.$store.dispatch('project/initStageList')
    await this.$store.dispatch('project/initControlModeList')
    await this.$store.dispatch('project/initScaleList')
    this.scaleList = this.$store.state.project.scaleList
    this.stageList = this.$store.state.project.stageList
    this.controlModeList = this.$store.state.project.controlModeList
    this.levelList = this.$store.state.projectChange.levelList
    this.typeList = this.$store.state.projectChange.typeList
    this.getList()
  },
  methods: {
    levelFilter(item) {
      return this.levelList[item] ? this.levelList[item] : '未知'
    },
    typeFilter(item) {
      return this.typeList[item] ? this.typeList[item] : '未知'
    },
    scaleFilter(val) {
      const valMap = this.scaleList
      return valMap[val] ? valMap[val] : '未知'
    },
    stageFilter(val) {
      const valMap = this.stageList
      return valMap[val] ? valMap[val] : '未知'
    },
    controlModeFilter(val) {
      const valMap = this.controlModeList
      return valMap[val] ? valMap[val] : '未知'
    },
    levelColorFilter(risk) {
      const riskMap = {
        1: 'green',
        2: '#f6ef37',
        3: 'orange',
        4: 'red'
      }
      return riskMap[risk]
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total ? response.total : 0
        this.listQuery.limit = response.per_page ? parseInt(response.per_page) : 20
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail(row) {
      this.$router.push({ path: '/project/change/info', query: { id: row.id }})
    },
    handleModify(row) {
      this.$router.push({ path: '/project/change/edit', query: { id: row.id }})
    },
    handleCreate(row) {
      this.$router.push({ path: '/project/change/add' })
    },
    handleDelete(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProjectChange(row.id).then(() => {
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
    formatPercent(val) {
      return formatPercent(val)
    },
    exportReport() {
      const url = `${process.env.VUE_APP_BASE_API}/report/export/projectChange?month=${moment(this.listQuery.month).format('YYYY-MM')}`
      window.open(url)
    },
    formatRiskDesc(riskArr) {
      if (!riskArr || riskArr.length === 0) {
        return ''
      }
      let result = ''
      riskArr.forEach(element => {
        result = `${result}${element['description']}`
      })
      return result
    }
  }
}
</script>
