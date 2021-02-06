<template>
  <div class="app-container">
    <div class="box-header">
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-plus" @click="addRisk">新增风险</el-button>
    </div>
    <el-row
      v-for="(risk,index) in risks"
      :key="index"
      :gutter="24"
      type="flex"
      align="middle"
    >
      <el-col
        :span="24"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ risk.type }}</span>
            <el-button style="float: right; padding: 3px 3px" type="text" @click="editRisk()">编辑</el-button>
            <el-button style="float: right; padding: 3px 3px;color:#f56c6c" type="text">移除</el-button>
          </div>
          <el-row :gutter="32">
            <el-col :span="6" class="item-col">
              <span class="item-title">
                风险等级
              </span>
              <span class="item-content">
                {{ risk.level }}
              </span>
            </el-col>
            <el-col :span="6" class="item-col">
              <span class="item-title">
                风险状态
              </span>
              <span class="item-content">
                {{ risk.status }}
              </span>
            </el-col>
            <el-col :span="6" class="item-col">
              <span class="item-title">
                续存期
              </span>
              <span class="item-content">
                {{ risk.exist_time }}
              </span>
            </el-col>
            <el-col :span="6" class="item-col">
              <span class="item-title">
                风险评分
              </span>
              <span class="item-content">
                {{ risk.score }}
              </span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24" class="item-col">
              <span class="item-title">
                风险描述
              </span>
              <span class="item-content">
                {{ risk.description }}
              </span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24" class="item-col">
              <span class="item-title">
                风险原因
              </span>
              <span class="item-content">
                {{ risk.reason }}
              </span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24" class="item-col">
              <span class="item-title">
                风险措施
              </span>
              <span class="item-content">
                {{ risk.measure }}
              </span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <risk-modify-dialog :dialog-risk-visible="dialogRiskVisible" :is-edit="isEdit" @closeRiskDialog="closeRiskDialog" />
  </div>
</template>
<style lang="less" scoped>
.app-container {
    padding: 10px 10px;
}
.box-header {
    margin-bottom: 10px;
}
.box-card {
  margin-bottom: 10px;
}
.item-col {
    padding: 5px 0;
    font-size: 14px;
    .item-title {
        margin-right:10px;
    }
    .item-content {
        font-weight: 500;
    }
}
</style>
<script>
import RiskModifyDialog from './RiskModifyDialog'

export default {
  name: 'RiskBoard',
  components: {
    RiskModifyDialog
  },
  data() {
    return {
      dialogRiskVisible: false,
      isEdit: false,
      risks: [
        {
          type: '项目进度',
          level: '低',
          status: '新增',
          exist_time: '5M',
          score: 65,
          reason: '',
          measure: '',
          description: ''
        }, {
          type: '软硬件采购',
          level: '低',
          status: '新增',
          exist_time: '5M',
          score: 70,
          reason: '',
          measure: '',
          description: ''
        }
      ]
    }
  },
  methods: {
    closeRiskDialog() {
      this.dialogRiskVisible = false
    },
    addRisk() {
      this.dialogRiskVisible = true
      this.isEdit = false
    },
    editRisk() {
      this.dialogRiskVisible = true
      this.isEdit = true
    }
  }
}
</script>
