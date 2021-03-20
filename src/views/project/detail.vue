<template>
  <div class="edit-container">
    <div class="basic-info">
      <el-row class="title-row" :gutter="24" type="flex" justify="space-between">
        <el-col class="left-title-row" :span="16">
          <div class="title-name">{{ project.name }}</div>
          <div class="title-col"><el-tag type="info">{{ project.dev_mode | devModeFilter }}</el-tag></div>
          <div class="title-col"><el-tag type="info">{{ scaleFilter(project.scale) }}</el-tag></div>
          <div class="title-col"><el-tag type="info">{{ stageFilter(project.stage) }}</el-tag></div>
          <div class="title-col"><el-tag :type="project.status | statusTypeFilter">{{ project.status | statusFilter }}</el-tag></div>
        </el-col>
        <el-col :span="8" class="right-title-row">
          <el-tooltip class="item" effect="dark" content="启动时间" placement="top-start">
            <span>{{ project.charter_release_date }}</span>
          </el-tooltip>
        </el-col>
      </el-row>
      <basic-info v-if="project.dev_mode == 1" :project-info="project" />
      <basic-agile-info v-else :project-info="project" />
    </div>
    <el-row :gutter="32" type="flex" align="middle">
      <el-col :xs="24" :sm="14" :lg="14">
        <line-chart v-if="project.dev_mode==1" :project-id="projectId" />
        <sprint-bar-chart v-else :project-id="projectId" />
      </el-col>
      <el-col :xs="24" :sm="6" :lg="6">
        <raddar-chart :list="projectCollectDetail.scores.actual_value" :max="projectCollectDetail.scores.total" />
      </el-col>
      <el-col :xs="24" :sm="4" :lg="4">
        <el-row :gutter="24" class="data-row">
          <el-col :span="24">
            <div class="data-group group-red" @click="gotoChange(project.name)">
              <div class="title">项目变更</div>
              <div class="count">{{ projectCollectDetail.changeCount }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="data-row">
          <el-col :span="24">
            <div class="data-group group-red" @click="gotoRisk(project.name)">
              <div class="title">项目风险点</div>
              <div class="count">{{ projectCollectDetail.riskCount }}</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <div class="data-group group-blue" @click="gotoRiskScore(project.name)">
              <div class="title">健康评分</div>
              <div class="count">{{ projectCollectDetail.averageScore }}</div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="project-menu-item">
      <process-agile v-if="project.dev_mode == 2" :is-modify="false" :project-id="projectId" />
      <process-common-detail v-if="project.dev_mode == 1" :project-id="projectId" />
    </el-row>
  </div>
</template>
<script>
import LineChart from './components/TimeLineLineChart'
import SprintBarChart from './components/SprintBarChart'
import RaddarChart from './components/RaddarChart'
import BasicInfo from './BasicInfo'
import BasicAgileInfo from './BasicAgileInfo'
import ProcessAgile from './components/ProcessAgile'
import ProcessCommonDetail from './components/ProcessCommonDetail'

import { fetchProject, projectCollectDetail } from '@/api/project'

const _ = require('lodash')
export default {
  name: 'ProjectDetail',
  components: {
    LineChart,
    SprintBarChart,
    RaddarChart,
    BasicInfo,
    BasicAgileInfo,
    ProcessAgile,
    ProcessCommonDetail
  },
  filters: {

    ProcessAgiledevModeFilter(val) {
      const map = {
        1: '传统项目',
        2: '敏捷项目'
      }
      return map[val]
    },
    statusFilter(val) {
      const map = {
        1: '在建',
        2: '暂停',
        3: '投产',
        4: '取消'
      }
      return map[val]
    },
    statusTypeFilter(val) {
      const map = {
        1: '',
        2: 'warning',
        3: 'success',
        4: 'info'
      }
      return map[val]
    }
  },
  data() {
    return {
      projectId: '',
      project: {},
      projectContent: '',
      projectCollectDetail: {} // 项目汇总信息
    }
  },
  async mounted() {
    this.scaleList = this.$store.state.project.scaleList
    this.stageList = this.$store.state.project.stageList
    this.projectId = this.$route.query && this.$route.query.id ? parseInt(this.$route.query.id) : 0
    await this.getInfo(this.projectId)
    await this.getCollectDetail(this.projectId)
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
    gotoRisk(projectName) {
      this.$router.push({ path: '/risk/index', query: { project_name: projectName }})
    },
    gotoChange(projectName) {
      this.$router.push({ path: '/report/project/change', query: { project_name: projectName }})
    },
    gotoRiskScore(projectName) {
      this.$router.push({ path: '/project/riskScore', query: { project_name: projectName }})
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
        that.projectContent = that.project.content ? that.project.content.content : ''
      }).catch(err => {
        console.log(err)
      })
    },
    getCollectDetail(id) {
      const that = this
      projectCollectDetail(id).then(response => {
        that.projectCollectDetail = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    cancel() {
      this.projectContent = this.project.content ? this.project.content.content : ''
    }
  }
}
</script>
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
.basic-info {
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    .title-row {
        height: 60px;
        font-size: 16px;
        padding:0px 20px;
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

