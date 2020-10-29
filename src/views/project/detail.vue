<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>项目基础信息</span>
      </div>
      <div>
        <el-row>
          <el-col :span="8">
            <span class="label">项目名称:</span>
            <span class="content">{{ item.name }}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">阶段:</span>
            <span class="content">{{ stageFilter(item.stage) }}</span>

          </el-col>
          <el-col :span="8">
            <span class="label">掌控方式:</span>
            <span class="content">{{ controlModeFilter(item.control_mode) }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">项目风险:</span>
            <span class="content">{{ item.risk | riskFilter }}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">项目经理:</span>
            <span class="content">{{ item.contact.pm }}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">质量经理:</span>
            <span class="content">{{ item.contact.qa }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="label">启动日期:</span>
            <span class="content">{{ item.timeLine.project_start_date }}</span>
          </el-col>
          <el-col :span="8">
            <span class="label">上线日期:</span>
            <span class="content">{{ item.timeLine.online_date }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="label">项目描述:</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="content" style="padding:0 10px">{{ item.description }}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-tabs type="border-card" style="margin-top:10px">
      <el-tab-pane label="项目干系人">
        <el-row>
          <el-col :span="6">
            <span class="label">项目经理:</span>
            <span class="content">{{ item.contact.pm }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">项目QA:</span>
            <span class="content">{{ item.contact.qa }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">数据联系人:</span>
            <span class="content">{{ item.contact.data_platform_contact }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">风险管理联系人:</span>
            <span class="content">{{ item.contact.risk_related_contact }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="label">环境保障人员:</span>
            <span class="content">{{ item.contact.env_protection_contact }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">业务人员:</span>
            <span class="content">{{ item.contact.business_contact }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">产品经理:</span>
            <span class="content">{{ item.contact.po }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">测试经理:</span>
            <span class="content">{{ item.contact.ptm }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="label">领衔架构师:</span>
            <span class="content">{{ item.contact.lead_architect }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">应用架构师:</span>
            <span class="content">{{ item.contact.app_architect }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">安全架构师:</span>
            <span class="content">{{ item.contact.security_architect }}</span>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="项目生命周期">
        <el-timeline :reverse="reverse">
          <el-timeline-item :timestamp="item.timeLine.application_date">申请日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.application_date">申请日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.application_date">期望上线日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.acceptance_date">受理日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.plan_start_date">计划开始日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.plan_end_date">计划结束日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.actual_start_date">实际开始日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.actual_end_date">实际结束日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.charter_release_date">章程发布日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.project_start_date">项目启动日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.requirement_review_date">需求评审日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.requirement_release_date">需求发布日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.summary_design_review_date">概要设计评审日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.summary_design_release_date">概要设计发布日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.code_start_date">编码开始日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.code_end_date">编码结束日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.test_start_date">测试开始日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.test_end_date">测试结束日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.online_review_pass_date">上线评审通过日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.online_date">上线日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.deployment_complete">部署完成日期</el-timeline-item>
          <el-timeline-item :timestamp="item.timeLine.acceptance_passed_date">验收通过日期</el-timeline-item>
        </el-timeline>
      </el-tab-pane>
      <el-tab-pane label="变更历史">
        <el-timeline>
          <el-timeline-item
            v-for="(log, index) in item.changelog"
            :key="index"
            :timestamp="log.time"
            placement="top"
          >
            <el-card>
              <h4>{{ log.content }}</h4>
              <p>{{ log.user }} 提交于 {{ log.time }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="less" scoped>
.el-row {
    margin-bottom: 10px;
}
.label {
    color:#909399;
    padding-right:10px;
}
.content {
    color:#606266;
}
</style>
<script>
import { fetchProject } from '@/api/project'

export default {
  name: 'ProjectInfo',
  filters: {
    riskFilter(risk) {
      const riskMap = {
        0: '正常',
        1: '低风险',
        2: '中等风险',
        3: '高风险'
      }
      return riskMap[risk]
    },
    riskColorFilter(risk) {
      const riskMap = {
        0: 'green',
        1: 'yellow',
        2: 'orange',
        3: 'red'
      }
      return riskMap[risk]
    }

  },
  data() {
    return {
      id: 0,
      item: {} // 项目信息
    }
  },
  async created() {
    this.id = this.$route.query.id ? this.$route.query.id : 0
    this.scaleList = this.$store.state.project.scaleList
    this.stageList = this.$store.state.project.stageList
    this.controlModeList = this.$store.state.project.controlModeList
    await this.getInfo(this.id)
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
    async getInfo(id) {
      return new Promise((resolve, reject) => {
        fetchProject(id).then(response => {
          this.item = response.data
          resolve(true)
        })
      })
    }
  }
}
</script>
