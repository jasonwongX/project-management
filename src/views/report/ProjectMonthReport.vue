<template>
  <div class="app-container">
    <el-row class="header" align="middle" :gutter="24" type="flex" justify="space-between">
      <el-col :span="5"><div class="title">项目月度数据汇总</div></el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="value1"
          type="month"
          placeholder="选择月份"
        />
      </el-col>
    </el-row>
    <el-row class="content-title" align="middle" :gutter="24" type="flex" justify="space-between">
      <el-col :span="12"><div class="title">项目数据概览</div></el-col>
    </el-row>
    <el-row class="data-content" :gutter="24">
      <el-col :xs="24" :sm="16" :lg="16">
        <bar-chart />
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8" height="360px">
        <el-row :gutter="24" class="data-row">
          <el-col :span="12">
            <div class="data-group">
              <div class="title">新增项目数：</div>
              <div class="count">3</div>
              <div class="last">上个月：2</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="data-group">
              <div class="title">变更项目数：</div>
              <div class="count">1</div>
              <div class="last">上个月：2</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="data-row">
          <el-col :span="12">
            <div class="data-group">
              <div class="title">投产项目数：</div>
              <div class="count">4</div>
              <div class="last">上个月：1</div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="data-group">
              <div class="title">风险项目数：</div>
              <div class="count">6</div>
              <div class="last">上个月：8</div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="content-title" align="middle" :gutter="24" type="flex" justify="space-between">
      <el-col :span="12"><div class="title">项目健康状态</div></el-col>
    </el-row>
    <el-row class="data-content" :gutter="24">
      <el-col :span="10">
        <span>Top5 风险类型</span>
        <risk-table />
      </el-col>
      <el-col :span="14">
        <span>Top5 风险项目</span>
        <project-risk-count-table />
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
}
.data-group {
    min-height: 120px;
    padding: 20px 10px;
    background-color: #f5f5f5;
    .count {
        font-weight: bolder;
        font-size: 18px;
        padding:10px 5px;
    }
    .last {
        margin-top: 20px;
        color: #969799;
    }
}
</style>
<script>
import BarChart from '../dashboard/admin/components/BarChart'
import RiskTable from './RiskTable'
import ProjectRiskCountTable from './ProjectRiskCountTable'

export default {
  name: 'ProjectMonthReport',
  components: {
    BarChart,
    RiskTable,
    ProjectRiskCountTable
  }
}
</script>
