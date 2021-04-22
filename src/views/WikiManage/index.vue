<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" style="width:120px;" icon="el-icon-plus" @click="handleCreate">新增文章</el-button>
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 140px;" class="filter-item" />
      <el-cascader
        v-model="listQuery.classify_id"
        :options="options"
        placeholder="分类"
      />
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
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ getClassifyName(scope.row.classify_id) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
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
const _ = require('lodash')
export default {
  name: 'RiskList',
  // components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      options: [{
        value: 1,
        label: '流程制度',
        children: [{
          value: 2,
          label: '制度通知',
          children: [{
            value: 8,
            label: '纲要类'
          }, {
            value: 9,
            label: '调研阶段'
          }, {
            value: 10,
            label: '启动阶段'
          }, {
            value: 11,
            label: '需求阶段'
          }, {
            value: 12,
            label: '设计阶段'
          }, {
            value: 13,
            label: '编码阶段'
          }, {
            value: 14,
            label: '测试阶段'
          }, {
            value: 15,
            label: '上线阶段'
          }, {
            value: 16,
            label: '投产与验收'
          }, {
            value: 17,
            label: '下线'
          }, {
            value: 18,
            label: '项目管理'
          }]
        }, {
          value: 3,
          label: '流程表单'
        }, {
          value: 4,
          label: '模板',
          children: [{
            value: 19,
            label: '项目计划'
          }, {
            value: 20,
            label: '需求'
          }, {
            value: 21,
            label: '概设'
          }, {
            value: 22,
            label: '测试'
          }, {
            value: 23,
            label: '项目过程实施'
          }]
        }, {
          value: 5,
          label: '其他'
        }]
      }, {
        value: 6,
        label: '工具',
        children: [{
          value: 24,
          label: '研发工具'
        }, {
          value: 25,
          label: '流程工具'
        }, {
          value: 26,
          label: '测试工具'
        }]
      }, {
        value: 7,
        label: '案例分享',
        children: [{
          value: 27,
          label: '管理经验分享'
        }, {
          value: 28,
          label: '技术经验分享'
        }]
      }],
      list: [
        {
          title: 'IT综合管理平台项目发布计划步骤',
          author: '毛佩',
          classify_id: 23,
          update_time: '2021-02-03',
          file_name: 'IT综合管理平台项目计划发布步骤',
          file_url: 'IT综合管理平台项目计划发布步骤.docx'
        }, {
          title: '项目计划模板',
          author: '毛佩',
          classify_id: 24,
          update_time: '2021-02-04',
          file_name: 'CMMI-PM-T-01-项目计划模板',
          file_url: 'CMMI-PM-T-01-项目计划模板.xls'
        }, {
          title: '测试总结报告模板',
          classify_id: 26,
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

    getClassifyName(classifyId) {
      const result = _.find(this.options, (item) => {
        return item.value === classifyId
      })
      return result ? result.label : '未知'
    },
    handleCreate() {
      this.$router.push({ path: '/wikiManage/add' })
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
