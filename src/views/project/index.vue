<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" style="width:120px;" icon="el-icon-edit" @click="handleCreate">新建项目</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" style="width:120px;float:right" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入项目名称" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.qa" placeholder="请输入QA名称" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.pm" placeholder="请输入项目经理名称" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.scale" placeholder="请选择规模类型" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in scaleOptions" :key="item" :label="item | scaleFilter" :value="item" />
      </el-select>
      <el-select v-model="listQuery.control_mode" placeholder="请选择管控模式" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in controlModeOptions" :key="item" :label="item | controlModeFilter" :value="item" />
      </el-select>
      <el-select v-model="listQuery.risk" placeholder="请选择风险等级" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in riskOptions" :key="item" :label="item | riskFilter" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="wdith:80px;" @click="handleFilter">查询</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="项目名称" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阶段" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.stage }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规模" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.scale | scaleFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="掌控模式" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.control_mode| controlModeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目经理" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目QA" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.qa }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="项目描述" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="项目风险" class-name="status-col" width="100">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.risk | riskFilter }}</span> -->
          <el-tag :color="scope.row.risk | riskColorFilter" effect="light" style="color:#fff">{{ scope.row.risk | riskFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">详情
          </el-button>
          <el-button size="mini" @click="handleModifyStatus(scope.row,'draft')">编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
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
import { fetchList, fetchPv } from '@/api/project'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ProjectList',
  components: { Pagination },
  directives: { waves },
  filters: {
    riskFilter(risk) {
      const riskMap = {
        0: '正常',
        1: '低风险',
        2: '中等风险',
        3: '高风险'
      }
      return riskMap[risk]
    },
    riskColorFilter(risk) {
      const riskMap = {
        0: 'green',
        1: 'yellow',
        2: 'orange',
        3: 'red'
      }
      return riskMap[risk]
    },
    scaleFilter(val) {
      const valMap = {
        1: 'AA1',
        2: 'AA2',
        3: 'B1',
        4: 'B2',
        5: 'C1'
      }
      return valMap[val]
    },
    controlModeFilter(val) {
      const valMap = {
        1: '自主研发',
        2: '掌控研发',
        3: '代理研发'
      }
      return valMap[val]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      scaleOptions: [1, 2, 3, 4, 5],
      controlModeOptions: [1, 2, 3],
      riskOptions: [0, 1, 2, 3],

      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
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
