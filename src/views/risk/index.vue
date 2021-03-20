<template>
  <div class="app-container">
    <div v-show="false" class="filter-container">
      <el-button class="filter-item" type="primary" style="width:120px;" icon="el-icon-plus" @click="handleCreate">新增风险项</el-button>
      <el-button v-show="false" v-waves :loading="downloadLoading" class="filter-item" type="primary" style="width:120px;" icon="el-icon-upload" @click="handleDownload">批量导入</el-button>
    </div>
    <div class="filter-container">
      <el-input v-model="listQuery.description" placeholder="风险描述" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.project_name" placeholder="所属项目名称" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.qa" placeholder="QA" style="width: 140px;" class="filter-item" @keyup.enter.native="handleFilter" />

      <el-select v-model="listQuery.type" placeholder="请选择风险分类" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(item,index) in typeList" :key="index" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.level" placeholder="请选择风险等级" clearable class="filter-item" style="width: 130px">
        <el-option v-for="(item, index) in levelList" :key="item" :label="item" :value="index" />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="请选择风险状态" clearable style="width: 130px" class="filter-item">
        <el-option v-for="(item, index) in statusList" :key="item" :label="item" :value="index" />
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
      <el-table-column :show-overflow-tooltip="true" label="风险描述" min-width="280px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属项目" width="160px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="风险分类" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ typeFilter(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="风险等级" width="80px" align="center">
        <template slot-scope="scope">
          <el-tag size="mini" :color="levelColorFilter(scope.row.level)" effect="plain" style="color:#fff">{{ levelFilter(scope.row.level) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="风险状态" class-name="status-col" width="80">
        <template slot-scope="scope">
          <span>{{ statusFilter(scope.row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="续存期" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.exist_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QA" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.project.qa }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="操作" align="center" width="220" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-show="false" size="mini" type="info" @click="handleDetail(scope.row)">详情
          </el-button>
          <el-button size="mini" type="primary" @click="handleModify(scope.row)">编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column> -->
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
import { fetchList, deleteRisk } from '@/api/risk'
import waves from '@/directive/waves' // Waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'RiskList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      levelList: [],
      statusList: [],
      typeList: [],
      listQuery: {
        page: 1,
        limit: 20
      },
      downloadLoading: false
    }
  },
  async created() {
    this.listQuery.project_name = this.$route.query.project_name ? this.$route.query.project_name : ''

    await this.$store.dispatch('risk/initStatusList')
    await this.$store.dispatch('risk/initLevelList')
    await this.$store.dispatch('risk/initTypeList')
    this.statusList = this.$store.state.risk.statusList
    this.levelList = this.$store.state.risk.levelList
    this.typeList = this.$store.state.risk.typeList
    this.getList()
  },
  methods: {
    levelFilter(item) {
      return this.levelList[item] ? this.levelList[item] : '未知'
    },
    typeFilter(item) {
      return this.typeList[item] ? this.typeList[item] : '未知'
    },
    statusFilter(item) {
      return this.statusList[item] ? this.statusList[item] : '未知'
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
        this.listQuery.limit = parseInt(response.per_page)
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail(row) {
      this.$router.push({ path: '/risk/info', query: { id: row.id }})
    },
    handleModify(row) {
      this.$router.push({ path: '/risk/edit', query: { id: row.id }})
    },
    handleCreate(row) {
      this.$router.push({ path: '/risk/add' })
    },
    handleDelete(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRisk(row.id).then(() => {
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
