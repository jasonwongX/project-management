<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" style="width:120px;" icon="el-icon-plus" @click="handleCreate">新增文章</el-button>
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 140px;" class="filter-item" />
      <el-cascader
        v-model="listQuery.category_id"
        :options="options"
        placeholder="分类"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="wdith:80px;margin-left:10px" @click="getList()">查询</el-button>
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
      <el-table-column :show-overflow-tooltip="true" label="标题" min-width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" label="摘要" min-width="280px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.short_content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ getCategoryName(scope.row.category_id) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" min-width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" min-width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="110px" align="center">
        <template slot-scope="scope">
          <el-tag effect="plain" :type="scope.row.status == 1 ? 'warning' : 'success'">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="100px" class-name="small-padding fixed-width">
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
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

import { getCategoryList, getCategoryNameList, getArticleList, deleteArticle } from '@/api/wiki'

const _ = require('lodash')
export default {
  name: 'WikiList',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(value) {
      const map = {
        1: '草稿',
        2: '发布'
      }
      return map[value]
    }
  },
  data() {
    return {
      tableKey: 0,
      options: [],
      categoryNameList: [],
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        title: '',
        author: '',
        content: '',
        category_id: '',
        page: 1,
        limit: 20
      },
      downloadLoading: false
    }
  },
  async created() {
    this.initCategoryList()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getArticleList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total ? response.total : 0
        this.listQuery.limit = response.per_page ? parseInt(response.per_page) : this.listQuery.limit
        this.listLoading = false
      })
    },
    initCategoryList() {
      getCategoryList().then(response => {
        this.options = response.data
      })
      getCategoryNameList().then(response => {
        this.categoryNameList = response.data
      })
    },
    getCategoryName(classifyId) {
      const result = _.find(this.categoryNameList, (item) => {
        return item.id === classifyId
      })
      return result ? result.name : '未知'
    },
    handleCreate() {
      this.$router.push({ path: '/wikiManage/add' })
    },
    handleModify(row) {
      this.$router.push({ path: '/wikiManage/edit', query: { id: row.id }})
    },
    handleDelete(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(row.id).then(() => {
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
