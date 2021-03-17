<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.description" placeholder="名称" style="width: 140px;" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="wdith:80px;">查询</el-button>
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
      <el-table-column :show-overflow-tooltip="true" label="文件描述" min-width="280px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交人" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="附件下载" min-width="260px" align="center">
        <template slot-scope="scope">
          <a @click="handleDownload(scope.row.file_url)"><el-link type="primary">{{ scope.row.file_name }}</el-link></a>
        </template>
      </el-table-column>

    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

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
import waves from '@/directive/waves' // Waves directive
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'RiskList',
  // components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: [
        {
          description: 'IT综合管理平台项目发布计划步骤',
          author: '毛佩',
          update_time: '2021-02-03',
          file_name: 'IT综合管理平台项目计划发布步骤',
          file_url: 'IT综合管理平台项目计划发布步骤.docx'
        }, {
          description: '项目计划模板',
          author: '毛佩',
          update_time: '2021-02-04',
          file_name: 'CMMI-PM-T-01-项目计划模板',
          file_url: 'CMMI-PM-T-01-项目计划模板.xls'
        }, {
          description: '测试总结报告模板',
          author: '毛佩',
          update_time: '2021-02-04 ',
          file_name: 'CMMI-TES-T-11-测试总结报告模板',
          file_url: 'CMMI-TES-T-11-测试总结报告模板.doc'
        }
      ],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      downloadLoading: false
    }
  },
  async created() {
  },
  methods: {
    getList() {
      return this.list
    },
    downloadFile(url, name) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
    },
    handleDownload(url) {
      const rootDir = process.env.NODE_ENV === 'development' ? '' : 'static/'
      const templateFileUrl = `${__dirname}${rootDir}${url}`
      this.downloadFile(templateFileUrl, url)
    }
  }
}
</script>
