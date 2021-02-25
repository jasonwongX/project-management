<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="listQuery.month"
        type="month"
        placeholder="选择月"
        @change="handleFilter"
      />
      <el-button class="filter-item" type="primary" style="width:120px;float:right" @click="updateReport">更新报表</el-button>
    </div>
    <div v-if="list && list.length" class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入项目名称" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-if="!isMyProject" v-model="listQuery.qa" placeholder="请输入QA名称" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.pm" placeholder="请输入项目经理名称" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.devMode" placeholder="项目类型" clearable style="width: 130px" class="filter-item">
        <el-option v-for="(item, index) in devModeList" :key="index" :label="item" :value="index" />
      </el-select><el-select v-model="listQuery.status" placeholder="项目状态" clearable style="width: 130px" class="filter-item">
        <el-option v-for="(item, index) in statusList" :key="index" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.scale" placeholder="请选择规模类型" clearable style="width: 130px" class="filter-item">
        <el-option v-for="(item, index) in scaleList" :key="index" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.control_mode" placeholder="请选择研发模式" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(item, index) in controlModeList" :key="index" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.risk" placeholder="请选择风险等级" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in riskOptions" :key="item" :label="item | riskFilter" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="wdith:80px;" @click="handleFilter">查询</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" style="width:120px;float:right" icon="el-icon-download" @click="exportProject">导出</el-button>
    </div>

    <el-table
      v-if="list && list.length"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="项目名称" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阶段" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ stageFilter(scope.row.stage) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="60px" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTagTypeFilter">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="规模" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scaleFilter(scope.row.scale) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成百分比" min-width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ formatPercent(scope.row.complete_percent) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="研发模式" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ controlModeFilter(scope.row.control_mode) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目经理" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="SM" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目QA" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.qa }}</span>
        </template>
      </el-table-column>

      <el-table-column label="项目风险" class-name="status-col" min-width="80px">
        <template slot-scope="scope" align="center">
          <el-tag v-if="riskCount(scope.row.risk) === 0" type="success" size="mini">无风险</el-tag>
          <a v-else style="color:red" @click="gotoRisk(scope.row.name)">{{ riskCount(scope.row.risk) }}个风险</a>
        </template>
      </el-table-column>
    </el-table>
    <div v-else class="empty-container">
      <img src="@/assets/images/empty-box.png">
      <span>本月还未创建报表，<a @click="createReport">立即生成</a></span>
    </div>
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
.empty-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width:200px;
    height:200px;
  }
  span {
    color: #606266;
  }
  a{
    color:#4092ef;
  }
}
</style>
<script>
import { agileProjectReportList, createAgileProjectMonthReport, exportProject } from '@/api/report'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
const moment = require('moment')

export default {
  name: 'AgileProjectStatusReport',
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
    devModeFilter(value) {
      const map = {
        1: '传统项目',
        2: '敏捷项目'
      }
      return map[value]
    },
    statusFilter(value) {
      const map = {
        1: '在建',
        2: '暂停',
        3: '投产'
      }
      return map[value]
    },
    statusTagTypeFilter(value) {
      const map = {
        1: '',
        2: 'danger',
        3: 'success'
      }
      return map[value]
    },
    riskColorFilter(risk) {
      const riskMap = {
        0: 'green',
        1: 'yellow',
        2: 'orange',
        3: 'red'
      }
      return riskMap[risk]
    }

  },
  props: {
    isMyProject: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        month: moment().format('YYYY-MM')
      },
      riskOptions: [0, 1, 2, 3],
      scaleList: [],
      stageList: [],
      controlModeList: [],
      devModeList: {
        '1': '传统项目',
        '2': '敏捷项目'
      },
      statusList: {
        '1': '在建',
        '2': '暂停',
        '3': '投产'
      },
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
  computed: {
  },
  async created() {
    await this.$store.dispatch('project/initStageList')
    await this.$store.dispatch('project/initControlModeList')
    await this.$store.dispatch('project/initScaleList')
    this.scaleList = this.$store.state.project.scaleList
    this.stageList = this.$store.state.project.stageList
    this.controlModeList = this.$store.state.project.controlModeList
    this.getList()
  },
  methods: {
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
    levelFilter(item) {
      const levelList = {
        '1': '正常',
        '2': '低',
        '3': '中',
        '4': '搞'
      }
      return levelList[item] ? levelList[item] : '未知'
    },
    riskCount(risk) {
      return risk && risk.length ? risk.length : 0
    },
    getList() {
      this.listLoading = true
      agileProjectReportList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total ? response.total : 0
        this.listQuery.limit = response.per_page ? parseInt(response.per_page) : this.listQuery.limit
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    exportProject() {
      exportProject().then(response => {
        console.log(response)
      }).catch(err => {
        console.err(err)
      })
    },
    formatPercent(val) {
      return `${parseInt(val * 100)}%`
    },
    createReport() {
      createAgileProjectMonthReport({ month: this.listQuery.month }).then(response => {
        this.$message.success('创建报表成功')
        this.getList()
      })
    },
    updateReport() {
      this.$confirm('是否确认更新当前月度报表，报表会被当前最新的数据覆盖?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        createAgileProjectMonthReport({ month: this.listQuery.month }).then(response => {
          this.$message.success('更新报表成功')
          this.getList()
        }).catch((_) => {
          this.$message({
            type: 'error',
            message: '更新失败!'
          })
        })
      })
    }
  }
}
</script>
