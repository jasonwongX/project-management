<template>
  <div class="app-container">
    <div class="box-header">
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-plus" @click="addItem()">新增迭代</el-button>
    </div>
    <el-row v-for="(sprintRows,index) in sprintArr" :key="index" :gutter="24">
      <el-col v-for="(item,colIndex) in sprintRows" :key="colIndex" :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>迭代{{ item.sequence }}</span>
            <el-button style="float: right; padding: 0px 10px" type="text" @click="modifyItem(item)">编辑</el-button>
            <el-button style="float: right; padding: 0px 10px;color:#f56c6c" type="text" @click="remove(item)">移除</el-button>
          </div>
          <div>
            <el-row :gutter="32" class="item-row">
              <el-col :span="8" class="item-col">
                <span class="item-title">用户故事数:</span>
                <span class="item-content">{{ item.story_num }}</span>
              </el-col>
              <el-col :span="8" class="item-col">
                <span class="item-title">工作点数:</span>
                <span class="item-content">{{ item.task_num }}</span>
              </el-col>
              <el-col :span="8" class="item-col">
                <span class="item-title">完成率:</span>
                <span class="item-content">{{ item.complete_percent }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24" class="item-col">
                <span class="item-title">迭代时间:</span>
                <span class="item-content">{{ item.sprint_start_date }} ~ {{ item.sprint_end_date }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24" class="item-col">
                <span class="item-title">内容描述:</span>
                <span class="item-content">{{ item.description }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24" class="item-col">
                <span class="item-title">敏捷活动:</span>
                <span class="item-content">{{ item.activity_summary }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24" class="item-col">
                <span class="item-title">敏捷团队建设:</span>
                <span class="item-content">{{ item.team_summary }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24" class="item-col">
                <span class="item-title">敏捷需求管理:</span>
                <span class="item-content">{{ item.requirement_summary }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24" class="item-col">
                <span class="item-title">敏捷技术实践:</span>
                <span class="item-content">{{ item.tech_summary }}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <process-agile-dialog
      :id="curProcessId"
      :is-edit="isEdit"
      :project-id="projectId"
      :post-form="processInfo"
      :dialog-agile-process-visible="dialogAgileProcessVisible"
      @closeAgileProcessDialog="closeAgileProcessDialog"
    />
  </div>
</template>
<style lang="less" scoped>
.app-container {
    padding: 10px 10px;
}
.box-header {
    margin-bottom: 10px;
}
.box-card {
  margin-bottom: 10px;
}
.item-col {
    padding: 5px 0;
    font-size: 14px;
    line-height: 20px;
    .item-title {
        margin-right:10px;
    }
    .item-content {
        font-weight: 500;
    }
}
</style>
<script>
import { fetchList, deleteAgileProcess, fetchAgileProcess } from '@/api/agileProcess'
import ProcessAgileDialog from './ProcessAgileDialog'
const _ = require('lodash')
export default {
  components: {
    ProcessAgileDialog
  },
  props: {
    projectId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogAgileProcessVisible: false,
      sequence: null,
      sprints: [],
      isEdit: false,
      curProcessId: 0,
      processInfo: {}
    }
  },
  computed: {
    sprintArr() {
      return _.chunk(this.sprints, 2)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    closeAgileProcessDialog() {
      this.dialogAgileProcessVisible = false
    },
    getList() {
      const listQuery = {
        limit: 20,
        project_id: this.projectId
      }
      fetchList(listQuery).then(response => {
        this.sprints = _.cloneDeep(response.data)
      })
    },
    addItem() {
      this.processInfo = {
        sequence: null,
        project_id: this.projectId,
        story_num: null,
        task_num: null,
        complete_percent: null,
        activity_summary: '',
        team_summary: '',
        requirement_summary: '',
        tech_summary: '',
        sprint_start_date: null,
        sprint_end_date: null,
        description: ''
      }
      this.id = 0
      this.isEdit = false
      this.dialogAgileProcessVisible = true
    },
    modifyItem(sprint) {
      this.id = sprint.id
      fetchAgileProcess(this.id).then(response => {
        this.processInfo = response.data
        this.isEdit = true
        this.dialogAgileProcessVisible = true
      })
    },
    remove(sprint) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAgileProcess(sprint.id).then(response => {
          this.$message.success('成功删除迭代')
          this.getList()
        })
      })
    }
  }
}
</script>
