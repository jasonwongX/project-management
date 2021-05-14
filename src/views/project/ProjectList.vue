<template>
  <div class="app-container">
    <div class="filter-container">
      <el-dropdown @command="handleCreate">
        <el-button type="primary">
          新建项目<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="common">传统项目</el-dropdown-item>
          <el-dropdown-item command="agile">敏捷项目</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-select v-model="listQuery.devMode" placeholder="项目类型" clearable style="width: 130px;float:right" class="filter-item" @change="handleFilter">
        <el-option v-for="(item, index) in devModeList" :key="index" :label="item" :value="index" />
      </el-select>
    </div>
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable placeholder="项目名称" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.pm" clearable placeholder="项目经理" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select
        v-model="listQuery.user_id"
        filterable
        remote
        reserve-keyword
        placeholder="请输入QA名称"
        :remote-method="searchQaList"
        :loading="loadingQa"
        clearable
        style="width: 130px"
        class="filter-item"
      >
        <el-option
          v-for="item in qaList"
          :key="item.id"
          :label="item.real_name"
          :value="item.id"
        />
      </el-select>
      <el-date-picker
        v-show="listQuery.devMode === '2'"
        v-model="listQuery.sprintStartDateRange"
        style="width: 260px"
        class="filter-item"
        type="monthrange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        :picker-options="pickerOptions"
      />
      <el-select v-model="listQuery.stage" placeholder="项目阶段" clearable style="width: 130px" class="filter-item">
        <el-option v-for="(item, index) in stageList" :key="index" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.scale" placeholder="项目规模" clearable style="width: 130px" class="filter-item">
        <el-option v-for="(item, index) in scaleList" :key="index" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.control_mode" placeholder="掌控模式" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(item, index) in controlModeList" :key="index" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="项目状态" clearable style="width: 130px" class="filter-item">
        <el-option v-for="(item, index) in statusList" :key="index" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.sys_type" placeholder="系统类型" clearable style="width: 130px" class="filter-item">
        <el-option v-for="(item, index) in sysTypeList" :key="index" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.address" placeholder="实施区域" multiple clearable style="width: 130px" class="filter-item">
        <el-option v-for="(item, index) in addressList" :key="index" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width:80px;" @click="handleFilter">查询</el-button>
      <el-button v-show="false" v-waves class="filter-item" type="primary" icon="el-icon-download" style="float:right" @click="exportMyProject">模板下载</el-button>
      <el-upload
        v-if="name==='wangjs'"
        style="float:right"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
      >
        <el-button v-waves class="filter-item" icon="el-icon-upload" type="primary">批量导入</el-button>
      </el-upload>
    </div>

    <el-table
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
          <span v-if="scope.row.dev_mode===1">{{ stageFilter(scope.row.stage) }}</span>
          <span v-else-if="scope.row.dev_mode===2 && scope.row.agile.sprint_stage">{{ `S${scope.row.agile.sprint_stage}` }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="系统类型" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sys_type | sysTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="60px" align="center">
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
          <span>{{ scope.row.dev_mode === 1 ? formatPercent(scope.row.complete_percent) : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="研发模式" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ controlModeFilter(scope.row.control_mode) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目经理(SM)" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dev_mode === 1 ? scope.row.pm : scope.row.agile.sm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="章程发布(试点启动)日期" min-width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dev_mode === 1 ? scope.row.charter_release_date : scope.row.agile.sprint_start_date }}</span>
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
      <el-table-column label="操作" align="center" min-width="180px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="handleDetail(scope.row)">详情
          </el-button>
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
import { mapGetters } from 'vuex'
import { fetchList, fetchMyProjectList, deleteProject } from '@/api/project'
import { getQaList } from '@/api/user'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getToken } from '@/utils/auth'
import { addressList } from '@/utils/dict'
const _ = require('lodash')

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
        3: '投产',
        4: '取消'
      }
      return map[value]
    },
    sysTypeFilter(value) {
      const map = {
        1: '项目',
        2: '迭代开发'
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
    },
    devMode: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      loadingQa: false,
      qaList: [],
      listQuery: {
      },
      addressList,
      riskOptions: [0, 1, 2, 3],
      scaleList: [],
      stageList: [],
      controlModeList: [],
      devModeList: {
        '0': '全部',
        '1': '传统项目',
        '2': '敏捷项目'
      },
      statusList: {
        '1': '在建',
        '2': '暂停',
        '3': '投产'
      },
      sysTypeList: {
        '1': '项目',
        '2': '迭代开发'
      },
      showReviewer: false,
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
      downloadLoading: false,
      uploadUrl: `${process.env.VUE_APP_BASE_API}/import/myProject`,
      pickerOptions: {
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(), new Date()])
          }
        }, {
          text: '今年至今',
          onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 6)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'real_name'
    ])
  },
  async created() {
    await this.$store.dispatch('project/initStageList')
    await this.$store.dispatch('project/initControlModeList')
    await this.$store.dispatch('project/initScaleList')
    this.scaleList = this.$store.state.project.scaleList
    this.stageList = this.$store.state.project.stageList
    this.controlModeList = this.$store.state.project.controlModeList
    // 获取数据
    const schema = this.$store.state.params.projectListParams
    if (_.isEmpty(schema)) {
      this.getList()
    } else {
      // Object.assign(this.formData, schema)
      this.listQuery = schema
      this.getList()
    }
  },
  methods: {
    handleUploadSuccess(res) {
      this.getList()
      this.$message.success('批量更新项目成功')
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

    // 查询项目列表
    searchQaList(label) {
      this.loadingQa = true
      getQaList(label).then(response => {
        this.qaList = response.data
        this.loadingQa = false
      })
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
    saveFormData() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.$store.dispatch('params/updateProjectListParams', this.listQuery)
        })
      }, 200)
    },
    getList() {
      this.listLoading = true
      if (this.isMyProject) {
        this.listQuery.username = this.$store.state.user.name
        fetchMyProjectList(this.listQuery).then(response => {
          this.list = response.data
          this.total = response.total ? response.total : 0
          this.listQuery.limit = response.per_page ? parseInt(response.per_page) : this.listQuery.limit
          this.listLoading = false
        })
      } else {
        fetchList(this.listQuery).then(response => {
          this.list = response.data
          this.total = response.total ? response.total : 0
          this.listQuery.limit = response.per_page ? parseInt(response.per_page) : this.listQuery.limit
          this.listLoading = false
        })
      }
    },
    gotoRisk(projectName) {
      this.$router.push({ path: '/risk/index', query: { project_name: projectName }})
    },
    exportMyProject() {
      const url = `${process.env.VUE_APP_BASE_API}/report/export/myProject?token=${getToken()}`
      window.open(url)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail(row) {
      this.saveFormData()
      this.$router.push({ path: '/project/detail', query: { id: row.id }})
    },
    handleModify(row) {
      this.$router.push({ path: '/project/edit', query: { id: row.id }})
      this.saveFormData()
    },
    handleCreate(type) {
      if (type === 'common') {
        this.$router.push({ path: '/project/add' })
      } else {
        this.$router.push({ path: '/project/addAgile' })
      }
      this.saveFormData()
    },
    handleDelete(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProject(row.id).then(() => {
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
    getExportList() {
      const listQuery = {
        page: 1,
        limit: 500,
        status: '1',
        devMode: '1'
      }
      fetchList(listQuery).then(response => {
        this.handleDownload(response.data)
      })
    },
    formatPercent(val) {
      return `${parseInt(val * 100)}%`
    }
  }
}
</script>
