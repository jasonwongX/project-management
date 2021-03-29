<template>
  <div class="detail-container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          项目编号
        </span>
        <span class="item-content">
          {{ projectInfo.sequence }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          掌控方式
        </span>
        <span class="item-content">
          {{ controlModeFilter(projectInfo.control_mode) }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          迭代周期(周)
        </span>
        <span class="item-content">
          {{ projectInfo.agile.sprint_time }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          试点启动
        </span>
        <span class="item-content">
          {{ projectInfo.agile.sprint_start_date }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          产品经理
        </span>
        <span class="item-content">
          {{ projectInfo.agile.po }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          SM
        </span>
        <span class="item-content">
          {{ projectInfo.agile.sm }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          研发单位
        </span>
        <span class="item-content">
          {{ projectInfo.dev_unit }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          研发团队
        </span>
        <span class="item-content">
          {{ projectInfo.dev_team }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          项目经理
        </span>
        <span class="item-content">
          {{ projectInfo.pm }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          业务联系人
        </span>
        <span class="item-content">
          {{ projectInfo.business_contact }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          测试经理
        </span>
        <span class="item-content">
          {{ projectInfo.ptm }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          质量控制人员
        </span>
        <span class="item-content">
          {{ projectInfo.qa }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          申请日期
        </span>
        <span class="item-content">
          {{ projectInfo.application_date }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          章程发布日期
        </span>
        <span class="item-content">
          {{ projectInfo.charter_release_date }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          首次上线日期
        </span>
        <span class="item-content">
          {{ projectInfo.agile.first_publish_date }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          最终投产日期
        </span>
        <span class="item-content">
          {{ projectInfo.agile.last_publish_date }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          系统类型
        </span>
        <span class="item-content">
          {{ sysTypeFilter(projectInfo.sys_type) }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          系统类型
        </span>
        <span class="item-content">
          {{ sysTypeFilter(projectInfo.sys_type) }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          进度偏差情况
        </span>
        <span class="item-content">
          {{ sysTypeFilter(projectInfo.schedule_deviation) }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          预算申请时间
        </span>
        <span class="item-content">
          {{ sysTypeFilter(projectInfo.budget_application_date) }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          中标通知时间
        </span>
        <span class="item-content">
          {{ sysTypeFilter(projectInfo.bid_notice_date) }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          厂家入场日期
        </span>
        <span class="item-content">
          {{ sysTypeFilter(projectInfo.vendor_admission_date) }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          预算采购时长
        </span>
        <span class="item-content">
          {{ sysTypeFilter(projectInfo.budget_produce_time) }}
        </span>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="item-col">
        <span class="item-title">
          进展简述
        </span>
        <span class="item-content">
          {{ projectInfo.description }}
        </span>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="item-col">
        <span class="item-title">
          实践情况
        </span>
        <span class="item-content">
          {{ projectInfo.agile.practice }}
        </span>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.detail-container {
  padding: 10px 20px;
  background: #fff;
  .item-col {
      padding: 5px 0;
      font-size: 14px;
      .item-title {
          margin-right:10px;
          color:#606266;
      }
      .item-content {
          font-weight: 500;
          color:#606266;
      }
  }
}
</style>
<script>
export default {
  name: 'AddProject',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    projectInfo: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      qaList: [],
      loadingQa: false,
      statusList: {
        1: '在建',
        2: '暂停',
        3: '投产'
      },
      sysTypeList: {
        1: '项目',
        2: '迭代开发'
      }
    }
  },
  created() {
    this.scaleList = this.$store.state.project.scaleList
    this.stageList = this.$store.state.project.stageList
    this.controlModeList = this.$store.state.project.controlModeList
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
    controlModeFilter(val) {
      const valMap = this.controlModeList
      return valMap[val] ? valMap[val] : '未知'
    },
    sysTypeFilter(val) {
      const valMap = this.sysTypeList
      return valMap[val] ? valMap[val] : '未知'
    }
  }
}
</script>
