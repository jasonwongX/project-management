<template>
  <div class="dashboard-editor-container">
    <!-- 总数分析 -->
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <!-- 项目趋势图 -->
    <el-row v-show="false" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <!-- 饼图 -->
    <el-row :gutter="32">
      <!-- 项目规模 -->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <scale-pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <classify-pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <controlmode-pie-chart />
        </div>
      </el-col>
    </el-row>
    <!-- 项目阶段柱状图 -->
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>

    </el-row>
    <!-- 风险分析雷达图 和 风险因素分布图 -->
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <risk-bar-chart />
        </div>
      </el-col>
      <el-col v-show="false" :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
    </el-row>
    <!-- 测试缺陷数柱状图（暂时隐藏） -->
    <el-row v-show="false" :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <test-bar-chart />
        </div>
      </el-col>
    </el-row>
    <!-- 关键风险列表 和 人员负责项目分布 -->
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 16}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <risk-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>

  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import ClassifyPieChart from './components/ClassifyPieChart'
import ScalePieChart from './components/ScalePieChart'
import ControlmodePieChart from './components/ControlmodePieChart'
import TestBarChart from './components/TestBarChart'

import BarChart from './components/BarChart'
import RiskBarChart from './components/RiskBarChart'

import RaddarChart from './components/RaddarChart'

import RiskTable from './components/RiskTable'
import BoxCard from './components/BoxCard'

const lineChartData = {
  expectedData: [12, 9, 22, 23, 18, 32, 21],
  actualData: [100, 82, 120, 154, 142, 160, 145]
}

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup,
    LineChart,
    ClassifyPieChart,
    ScalePieChart,
    ControlmodePieChart,
    PieChart,
    BarChart,
    TestBarChart,
    RaddarChart,
    RiskBarChart,
    RiskTable,
    BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
