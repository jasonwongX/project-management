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
      <el-input v-model="listQuery.name" placeholder="请输入项目名称" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-if="!isMyProject" v-model="listQuery.qa" placeholder="请输入QA名称" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.pm" placeholder="请输入项目经理名称" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" style="width:120px;float:right" icon="el-icon-download" @click="exportReport">导出</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="wdith:80px;float:right" @click="handleFilter">查询</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="项目类型" min-width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project.dev_mode | devModeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" min-width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目经理" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project && scope.row.project.pm ? scope.row.project.pm : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目QA" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project && scope.row.project.qa ? scope.row.project.qa : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="研发单位" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project.dev_unit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完全投产时间" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.complete_date) }}</span>
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
import { fetchCompleteProjectList } from '@/api/project'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
const moment = require('moment')

export default {
  name: 'ProjectCompleteReport',
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
      fetchCompleteProjectList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total ? response.total : 0
        this.listQuery.limit = response.per_page ? parseInt(response.per_page) : this.listQuery.limit
        this.listLoading = false
      })
    },
    gotoRisk(projectName) {
      this.$router.push({ path: '/risk/index', query: { project_name: projectName }})
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail(row) {
      this.$router.push({ path: '/project/info', query: { id: row.id }})
    },
    handleModify(row) {
      this.$router.push({ path: '/project/edit', query: { id: row.id }})
    },
    handleCreate() {
      this.$router.push({ path: '/project/add' })
    },
    exportReport() {
      const url = `${process.env.VUE_APP_BASE_API}/report/export/projectComplete?month=${moment(this.listQuery.month).format('YYYY-MM')}`
      window.open(url)
    },
    formatPercent(val) {
      return `${parseInt(val * 100)}%`
    },
    formatDate(value) {
      return value === '' ? '' : moment(value).format('YYYY-MM-DD')
    }
  }
}
</script>
