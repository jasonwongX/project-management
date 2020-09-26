<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <span class="label">项目名称:</span>
        <span class="content">{{ item.name }}</span>
      </el-col>
      <el-col :span="8">
        <span class="label">阶段:</span>
        <span class="content">{{ item.stage }}</span>

      </el-col>
      <el-col :span="8">
        <span class="label">掌控方式:</span>
        <span class="content">{{ item.control_mode | controlModeFilter }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="label">项目风险:</span>
        <span class="content">{{ item.risk | riskFilter }}</span>
      </el-col>
      <el-col :span="8">
        <span class="label">项目经理:</span>
        <span class="content">{{ item.pm }}</span>
      </el-col>
      <el-col :span="8">
        <span class="label">质量经理:</span>
        <span class="content">{{ item.qa }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <span class="label">启动日期:</span>
        <span class="content">{{ item.start_time }}</span>
      </el-col>
      <el-col :span="8">
        <span class="label">上线日期:</span>
        <span class="content">{{ item.end_time }}</span>
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
    <el-tabs type="border-card">
      <el-tab-pane label="项目干系人">
        <el-row>
          <el-col :span="6">
            <span class="label">项目经理:</span>
            <span class="content">{{ item.pm }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">项目QA:</span>
            <span class="content">{{ item.pm }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">数据联系人:</span>
            <span class="content">{{ item.db_c }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">风险管理联系人:</span>
            <span class="content">{{ item.risk_c }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="label">环境保障人员:</span>
            <span class="content">{{ item.env_c }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">业务人员:</span>
            <span class="content">{{ item.ba_c }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">产品经理:</span>
            <span class="content">{{ item.po_c }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">测试经理:</span>
            <span class="content">{{ item.test_pm_c }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="label">领衔架构师:</span>
            <span class="content">{{ item.arch_c }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">应用架构师:</span>
            <span class="content">{{ item.arch_app_c }}</span>
          </el-col>
          <el-col :span="6">
            <span class="label">安全架构师:</span>
            <span class="content">{{ item.arch_safe_c }}</span>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="项目生命周期">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(cycle, index) in item.cycle"
            :key="index"
            :timestamp="cycle.time"
          >
            {{ cycle.stage }}
          </el-timeline-item>
        </el-timeline></el-tab-pane>
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
    },
    scaleFilter(val) {
      const valMap = {
        1: 'AA1',
        2: 'AA2',
        3: 'B1',
        4: 'B2',
        5: 'C1'
      }
      return valMap[val]
    },
    controlModeFilter(val) {
      const valMap = {
        1: '自主研发',
        2: '掌控研发',
        3: '代理研发'
      }
      return valMap[val]
    }
  },
  data() {
    return {
      id: this.$route.query.id,
      item: {} // 项目信息
    }
  },
  async created() {
    await this.getInfo(this.id)
  },
  methods: {
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
