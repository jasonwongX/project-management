<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
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
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <excute-cycle-bar-chart />
        </div>
      </el-col>
    </el-row>
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
    <el-row v-show="false" :gutter="32">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="chart-wrapper">
          <test-bar-chart />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 16}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 8}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <staff-table />
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

import ExcuteCycleBarChart from './components/ExcuteCycleBarChart'
import RaddarChart from './components/RaddarChart'

import TransactionTable from './components/TransactionTable'
import StaffTable from './components/StaffTable'

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
    ExcuteCycleBarChart,
    StaffTable,
    TransactionTable
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
