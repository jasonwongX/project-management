<template>
  <div class="edit-container">
    <el-row class="title-row" :gutter="24" type="flex" justify="space-between">
      <el-col class="left-title-row" :span="16">
        <div class="title-col"><el-button type="primary" plain size="small" @click="goBack()"> 返回 </el-button></div>

        <div class="title-name">{{ project.name }}</div>
        <div class="title-col"><el-tag type="info">{{ project.dev_mode | devModeFilter }}</el-tag></div>
        <div class="title-col"><el-tag type="info">{{ project.sys_type | sysTypeFilter }}</el-tag></div>
        <div class="title-col"><el-tag type="info">{{ scaleFilter(project.scale) }}</el-tag></div>
        <div class="title-col"><el-tag type="info">{{ stageFilter(project) }}</el-tag></div>
      </el-col>
      <el-col :span="8" class="right-title-row">
        <el-radio-group v-model="project.status" size="medium" @change="statusChange($event)">
          <el-radio-button label="1">在建</el-radio-button>
          <el-radio-button label="2">暂停</el-radio-button>
          <el-radio-button label="3">投产</el-radio-button>
          <el-radio-button label="4">取消</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="project-menu-item">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="info-outline" /> 基础信息</span>
          <add-project v-if="project.dev_mode == 1" :is-edit="true" :project-info="project" />
          <add-agile-project v-else :is-edit="true" :project-info="project" />
        </el-tab-pane>
        <el-tab-pane v-if="project.dev_mode == 1">
          <span slot="label"><svg-icon icon-class="process-outline" /> 过程跟踪</span>
          <process-common :project-id="projectId" />
        </el-tab-pane>
        <el-tab-pane v-else>
          <span slot="label"><svg-icon icon-class="sprint" /> 迭代管理</span>
          <process-agile :project-id="projectId" />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="risk-outline" /> 项目风险</span>
          <risk-board :project-id="projectId" />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="score-outline" /> 风险评分</span>
          <risk-score-board :project-id="projectId" />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="change-outline" /> 项目变更</span>
          <project-change-board :project-id="projectId" />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="complete-outline" /> 投产信息</span>
          <project-complete-board :project-id="projectId" />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><svg-icon icon-class="other-outline" /> 其他信息</span>
          <div class="editor-container">
            <Tinymce ref="editor" v-model="projectContent" :height="400" />
            <el-row type="flex" justify="center" style="margin-top:10px">
              <el-col :span="3">
                <el-button type="info" style="width:80%" @click="cancel()">取消</el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" style="width:80%" @click="submit()">保存</el-button>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <project-complete-dialog :project-id="projectId" :post-form="completeInfo" :dialog-complete-visible="ProjectCompleteDialogVisible" @closeCompleteDialog="closeCompleteDialog" />
    <project-stop-dialog :project-id="projectId" :dialog-stop-visible="ProjectStopDialogVisible" @closeStopDialog="closeStopDialog" />

  </div>
</template>
<style lang="less">
.project-menu-item {
  .el-tabs__item {
    height:40px!important;
    line-height: 40px!important;
    font-size: 14px!important;
  }
}
</style>
<style lang="less" scoped>

.edit-container {
  padding: 10px 20px;
}
.title-row {
    height: 60px;
    font-size: 16px;
    padding:0px 20px;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
}
.left-title-row {
    display: flex;
    align-items: center;
    color: #666;
    .title-name {
      margin-right:40px;
      font-size:18px;
    }
    .title-col {
      font-size: 14px;
      margin-right:20px;
    }
}
.right-title-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.data-row {
    margin-bottom: 10px;
}
.group-red {
    color: rgba(242, 83, 110, .85);

}
.group-blue {
    color: rgba(61, 190, 99, .85);
}
.data-group {
    min-height: 60px;
    padding: 5px 20px;
    background-color: #f7f8fa;
    color: #666666;
    size:14px;
    .count {
        font-weight: 500;
        font-size: 20px;
        padding-top:10px;
    }
}
</style>
<script>
import AddProject from './add'
import AddAgileProject from './AddAgile'

import RiskScoreBoard from '../RiskScore/RiskScoreBoard'
import ProjectChangeBoard from '../ProjectChange/ProjectChangeBoard'
import { fetchProject, updateProjectStatus, saveProjectContent } from '@/api/project'
import ProcessCommon from './components/ProcessCommon'
import ProcessAgile from './components/ProcessAgile'
import RiskBoard from '../risk/RiskBoard'
import ProjectStopDialog from './components/ProjectStopDialog'
import ProjectCompleteDialog from './components/ProjectCompleteDialog'
import ProjectCompleteBoard from './components/ProjectCompleteBoard'

import Tinymce from '@/components/Tinymce'

const _ = require('lodash')
export default {
  name: 'ModifyProject',
  components: {
    AddProject,
    AddAgileProject,
    RiskScoreBoard,
    ProcessCommon,
    ProcessAgile,
    ProjectChangeBoard,
    RiskBoard,
    ProjectStopDialog,
    ProjectCompleteDialog,
    Tinymce,
    ProjectCompleteBoard
  },
  filters: {
    devModeFilter(val) {
      const map = {
        1: '传统项目',
        2: '敏捷项目'
      }
      return map[val]
    },
    sysTypeFilter(val) {
      const map = {
        1: '项目',
        2: '迭代开发'
      }
      return map[val]
    }
  },
  data() {
    return {
      project: {},
      projectContent: '',
      scaleList: [],
      stageList: [],
      projectId: 0,
      ProjectCompleteDialogVisible: false,
      ProjectStopDialogVisible: false,
      completeInfo: {
        project_id: this.projectId,
        is_phased: 0,
        sequence: null,
        complete_date: null,
        complete_record_date: null,
        remark: ''
      }
    }
  },
  async created() {
    this.scaleList = this.$store.state.project.scaleList
    this.stageList = this.$store.state.project.stageList
    this.projectId = this.$route.query && this.$route.query.id ? parseInt(this.$route.query.id) : 0
    await this.getInfo(this.projectId)
  },
  methods: {
    scaleFilter(val) {
      const valMap = this.scaleList
      return valMap[val] ? valMap[val] : '未知'
    },
    stageFilter(project) {
      const stage = project.stage
      if (project.dev_mode === '1') {
        const valMap = this.stageList
        return valMap[stage] ? valMap[stage] : '未知'
      } else {
        return project.agile ? `S${project.agile.sprint_stage}` : '-'
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    // 项目详情
    getInfo(id) {
      const that = this
      fetchProject(id).then(response => {
        that.project = _.cloneDeep(response.data)
        that.project.scale = that.project.scale.toString()
        that.project.dev_mode = that.project.dev_mode.toString()
        that.project.stage = that.project.stage.toString()
        that.project.control_mode = that.project.control_mode.toString()
        that.project.sys_type = that.project.sys_type.toString()
        if (that.project.metrics && that.project.metrics.build_frequency) {
          that.project.metrics.build_frequency = that.project.metrics.build_frequency.toString()
        }
        that.projectContent = that.project.content ? that.project.content.content : ''
      }).catch(err => {
        console.log(err)
      })
    },
    closeCompleteDialog() {
      this.ProjectCompleteDialogVisible = false
      this.getInfo(this.projectId)
    },
    closeStopDialog() {
      this.ProjectStopDialogVisible = false
      this.getInfo(this.projectId)
    },
    cancel() {
      this.projectContent = this.project.content ? this.project.content.content : ''
    },
    submit() {
      saveProjectContent({ project_id: this.projectId, content: this.projectContent }).then(response => {
        this.$message.success('更新成功')
      }).catch(err => {
        this.$message.success(`更新失败：${err}`)
      })
    },
    statusChange(status) {
      let statusName = '在建'
      const that = this
      if (status === '2') {
        statusName = '暂停'
      } else if (status === '3') {
        statusName = '投产'
      } else if (status === '4') {
        statusName = '取消'
      }
      this.$confirm(`是否确认修改项目状态为${statusName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (status === '3') {
          that.ProjectCompleteDialogVisible = true
        } else if (status === '2') {
          that.ProjectStopDialogVisible = true
        } else {
          updateProjectStatus({ project_id: that.projectId, status }).then(response => {
            this.$message({
              type: 'success',
              message: '更新成功!'
            })
          })
        }
      }).catch(() => {
        this.getInfo(this.projectId)
      })
    }
  }
}
</script>
