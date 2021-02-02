<template>
  <div class="edit-container">
    <div class="title-row">
      <div class="title-name">{{ project.name }}</div>
      <div class="title-col">{{ project.dev_mode | devModeFilter }}</div>
      <div class="title-col">{{ scaleFilter(project.scale) }}</div>
      <div class="title-col">{{ stageFilter(project.stage) }}</div>
    </div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="16" :lg="16">
        <line-chart :chart-data="lineChartData" />
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8">
        <raddar-chart />
      </el-col>
    </el-row>
    <el-row>
      <el-tabs type="border-card">
        <el-tab-pane v-if="project.dev_mode == 1" label="基础信息"><add-project /></el-tab-pane>
        <el-tab-pane v-else label="基础信息"><add-agile-project /></el-tab-pane>
        <el-tab-pane v-if="project.dev_mode == 1" label="过程管理">
          <process-common />
        </el-tab-pane>
        <el-tab-pane v-else label="过程管理">
          <process-agile />
        </el-tab-pane>
        <el-tab-pane label="风险管理"><create-risk /></el-tab-pane>
        <el-tab-pane label="风险评分"><create-risk-score /></el-tab-pane>
        <el-tab-pane label="项目变更"><create-project-change /></el-tab-pane>
        <el-tab-pane label="其他信息"><edit-project /></el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.edit-container {
  padding: 10px 20px;
}
.title-row {
    height: 48px;
    font-size: 16px;
    padding:0px 10px;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    display: flex;
    align-items: center;
    color: #666;
    .title-name {
      margin-right:40px;
    }
    .title-col {
      font-size: 14px;
      margin-right:20px;
    }
}
.card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
</style>
<script>
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import AddProject from './add'
import AddAgileProject from './AddAgile'

import EditProject from './edit'
import CreateRiskScore from '../RiskScore/create'
import CreateRisk from '../risk/create'
import CreateProjectChange from '../ProjectChange/create'
import { fetchProject } from '@/api/project'
import ProcessCommon from './components/ProcessCommon'
import ProcessAgile from './components/ProcessAgile'

const _ = require('lodash')
const lineChartData = {
  expectedData: [1, 3, 5, 8, 10, 12],
  actualData: [1, 2, 6, 7, 11, 12]
}
export default {
  name: 'ModifyProject',
  components: {
    LineChart,
    RaddarChart,
    AddProject,
    AddAgileProject,
    EditProject,
    CreateRiskScore,
    CreateRisk,
    ProcessCommon,
    ProcessAgile,
    CreateProjectChange
  },
  filters: {
    devModeFilter(val) {
      const map = {
        1: '传统项目',
        2: '敏捷项目'
      }
      return map[val]
    }
  },
  data() {
    return {
      project: {},
      lineChartData: lineChartData
    }
  },
  async created() {
    this.scaleList = this.$store.state.project.scaleList
    this.stageList = this.$store.state.project.stageList
    this.projectId = this.$route.query && this.$route.query.id
    await this.getInfo(this.projectId)
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
    // 项目详情
    getInfo(id) {
      const that = this
      fetchProject(id).then(response => {
        that.project = _.cloneDeep(response.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
