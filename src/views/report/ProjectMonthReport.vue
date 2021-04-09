<template>
  <div class="app-container">
    <el-row class="header" align="middle" :gutter="24" type="flex" justify="space-between">
      <el-col :span="5"><div class="title">项目月度数据汇总</div></el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="month"
          value-format="yyyy-MM"
          type="month"
          placeholder="选择月份"
          @change="updateMonth"
        />
      </el-col>
    </el-row>
    <el-row class="content-title" align="middle" :gutter="24" type="flex" justify="space-between">
      <el-col :span="12"><div class="title">项目数据概览</div></el-col>
    </el-row>
    <el-row :gutter="24" class="data-row" type="flex" justify="space-between">
      <el-col :span="3">
        <div class="data-group">
          <div class="title">在建传统项目：</div>
          <div class="count">{{ totalCount.projectCount }}</div>
          <div class="last">上个月：{{ totalCount.projectLastMonthCount }}</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="data-group">
          <div class="title">在建敏捷项目:</div>
          <div class="count">{{ totalCount.agileProjectCount }}</div>
          <div class="last">上个月：{{ totalCount.agileProjectLastMonthCount }}</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="data-group">
          <div class="title">新增项目数:</div>
          <div class="count">{{ totalCount.addProjectTotalCount }}</div>
          <div class="last">上个月：{{ totalCount.addProjectTotalCountLastMonth }}</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="data-group">
          <div class="title">变更项目数:</div>
          <div class="count">{{ totalCount.projectChangeCount }}</div>
          <div class="last">上个月：{{ totalCount.projectChangeCountLastMonth }}</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="data-group">
          <div class="title">完全投产项目数:</div>
          <div class="count">{{ totalCount.projectCompleteCount }}</div>
          <div class="last">上个月：{{ totalCount.projectCompleteCountLastMonth }}</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="data-group">
          <div class="title">取消项目数:</div>
          <div class="count">{{ totalCount.projectCancelCount }}</div>
          <div class="last">上个月：{{ totalCount.projectCancelCountLastMonth }}</div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="data-group">
          <div class="title">风险项目数：</div>
          <div class="count">{{ totalCount.riskCount }}</div>
          <div class="last">上个月：{{ totalCount.riskCountLastMonth }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="data-content" :gutter="24">
      <el-col :xs="24" :sm="18" :lg="18">
        <project-stage-bar-chart :month="month" />
      </el-col>
      <el-col :xs="24" :sm="6" :lg="6">
        <risk-report-raddar-chart :month="month" />
      </el-col>
    </el-row>
    <el-row :gutter="24" class="data-content">
      <el-col :span="8">
        <classify-report-pie-chart :month="month" />
      </el-col>
      <el-col :span="8">
        <controlemode-report-pie-chart :month="month" />
      </el-col>
      <el-col :span="8">
        <scale-report-pie-chart :month="month" />
      </el-col>
    </el-row>
    <el-row class="content-title" align="middle" :gutter="24" type="flex" justify="space-between">
      <el-col :span="12"><div class="title">项目健康状态</div></el-col>
    </el-row>
    <el-row class="data-content" :gutter="24">
      <el-col :span="10">
        <span>Top5 风险类型</span>
        <risk-table :month="month" />
      </el-col>
      <el-col :span="14">
        <span>Top5 风险项目</span>
        <project-risk-count-table :month="month" />
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.app-container {
    background: #f5f5f5!important;
}
.header {
    height:60px;
    background: #ffffff;
}
.content-title {
    height:48px;
    margin-top:5px;
    background: #ffffff;
    size:20px;
}
.data-content {
    background: #ffffff;
}
.data-row {
    padding: 20px 0px;
    background-color: #fff;

}
.data-group {
    min-height: 80px;
    padding: 10px 10px;
    background-color: #f5f5f5;
    .count {
        font-weight: bolder;
        font-size: 18px;
        padding:10px 5px;
    }
    .last {
        color: #969799;
    }
}
</style>
<script>
import ProjectStageBarChart from './components/ProjectStageBarChart'
import RiskTable from './RiskTable'
import ProjectRiskCountTable from './ProjectRiskCountTable'
import ClassifyReportPieChart from './components/ClassifyReportPieChart'
import ControlemodeReportPieChart from './components/ControlemodeReportPieChart'
import RiskReportRaddarChart from './components/RiskReportRaddarChart'
import ScaleReportPieChart from './components/ScaleReportPieChart'
import { projectMonthTotalCount } from '@/api/monthOverview'
const moment = require('moment')

export default {
  name: 'ProjectMonthReport',
  components: {
    ProjectStageBarChart,
    RiskTable,
    ProjectRiskCountTable,
    ClassifyReportPieChart,
    ControlemodeReportPieChart,
    RiskReportRaddarChart,
    ScaleReportPieChart
  },
  data() {
    return {
      month: moment().format('YYYY-MM'),
      totalCount: {
        'projectCount': 0,
        'projectLastMonthCount': 0,
        'agileProjectCount': 0,
        'agileProjectLastMonthCount': 0,
        'addProjectTotalCount': 0,
        'addProjectTotalCountLastMonth': 0,
        'projectChangeCount': 0,
        'projectChangeCountLastMonth': 0,
        'projectCompleteCount': 0,
        'projectCompleteCountLastMonth': 0,
        'riskCount': 0,
        'riskCountLastMonth': 0
      }
    }
  },
  created() {
    this.getTotalCount()
  },
  methods: {
    fetchData() {
      this.getTotalCount()
    },
    getTotalCount() {
      projectMonthTotalCount(this.month).then(reponse => {
        this.totalCount = reponse.data
      })
    },
    updateMonth() {
      this.getTotalCount(0)
    }
  }
}
</script>
