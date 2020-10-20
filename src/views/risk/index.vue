<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" style="width:120px;" icon="el-icon-edit" @click="handleCreate">新建风险项</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" style="width:120px;" icon="el-icon-upload" @click="handleDownload">批量导入</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" style="width:120px;float:right" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="风险描述" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.project" placeholder="所属项目名称" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.classify_id" placeholder="请选择风险分类" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in classifyOptions" :key="item" :label="item | classifyFilter" :value="item" />
      </el-select>
      <el-select v-model="listQuery.level" placeholder="请选择风险等级" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in levelOptions" :key="item" :label="item | levelFilter" :value="item" />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="请选择风险状态" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item" :label="item | statusFilter" :value="item" />
      </el-select>
      <el-select v-model="listQuery.stage" placeholder="请选择发现阶段" clearable style="width: 130px" class="filter-item">
        <el-option v-for="item in stageOptions" :key="item" :label="item | stageFilter" :value="item" />
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
    >
      <el-table-column label="风险描述" min-width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发现阶段" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.stage | stageFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="风险分类" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.classify_id | classifyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="风险等级" width="110px" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" :color="scope.row.level | levelColorFilter" effect="plain" style="color:#fff">{{ scope.row.level| levelFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="风险状态" class-name="status-col" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.status | statusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发现人" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.discoverer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="责任人" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.responsible }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="220" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="handleDetail(scope.row)">详情
          </el-button>
          <el-button size="mini" type="primary" @click="handleModifyStatus(scope.row,'draft')">编辑
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
import { fetchList, fetchPv } from '@/api/risk'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'RiskList',
  components: { Pagination },
  directives: { waves },
  filters: {
    levelFilter(risk) {
      const riskMap = {
        1: '正常',
        2: '低风险',
        3: '中等风险',
        4: '高风险'
      }
      return riskMap[risk]
    },
    statusFilter(status) {
      const statusMap = {
        1: '已识别',
        2: '已执行规避措施',
        3: '已规避',
        4: '已发生',
        5: '已执行应对策略',
        6: '已排除'
      }
      return statusMap[status]
    },
    levelColorFilter(risk) {
      const riskMap = {
        1: 'green',
        2: 'yellow',
        3: 'orange',
        4: 'red'
      }
      return riskMap[risk]
    },
    stageFilter(val) {
      const valMap = {
        1: '需求阶段',
        2: '设计阶段',
        3: '编码阶段',
        4: '测试阶段',
        5: '验收阶段',
        6: '维护阶段',
        7: '全生命周期'
      }
      return valMap[val]
    },
    classifyFilter(val) {
      const valMap = {
        1: '系统环境',
        2: '硬件设备',
        3: '业务支持',
        4: '需求变更',
        5: '系统性能',
        6: '技术经验',
        7: '商务合作',
        8: '人力资源',
        9: '工作流程',
        10: '关联影响',
        11: '产品属性'
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
        limit: 20
      },
      stageOptions: [1, 2, 3, 4, 5, 6, 7],
      classifyOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      levelOptions: [1, 2, 3, 4],
      statusOptions: [1, 2, 3, 4, 5, 6],
      showReviewer: false,
      // temp: {
      //   id: undefined,
      //   importance: 1,
      //   remark: '',
      //   timestamp: new Date(),
      //   title: '',
      //   type: '',
      //   status: 'published'
      // },
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
    handleDetail(row) {
      this.$router.push({ path: '/risk/info', query: { id: row.id }})
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
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
