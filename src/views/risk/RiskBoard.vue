<template>
  <div class="app-container">
    <div class="box-header">
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-plus" @click="addRisk">新增风险</el-button>
    </div>
    <el-row
      v-for="(riskRow,index) in riskArr"
      :key="index"
      :gutter="24"
      type="flex"
      align="middle"
    >
      <el-col
        v-for="(risk,childIndex) in riskRow"
        :key="childIndex"
        :span="12"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ typeFilter(risk.type) }}</span>
            <el-button style="float: right; padding: 3px 3px" type="text" @click="editRisk(risk)">编辑</el-button>
            <el-button style="float: right; padding: 3px 3px;color:#f56c6c" type="text" @click="remove(risk)">移除</el-button>
          </div>
          <el-row :gutter="24">
            <el-col :span="8" class="item-col">
              <span class="item-title">
                风险等级
              </span>
              <span class="item-content">
                {{ levelFilter(risk.level) }}
              </span>
            </el-col>
            <el-col :span="8" class="item-col">
              <span class="item-title">
                风险状态
              </span>
              <span class="item-content">
                {{ statusFilter(risk.status) }}
              </span>
            </el-col>
            <el-col :span="8" class="item-col">
              <span class="item-title">
                续存期
              </span>
              <span class="item-content">
                {{ risk.exist_time }}
              </span>
            </el-col>
            <el-col :span="8" class="item-col">
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
    <risk-modify-dialog :status-list="statusList" :type-list="typeList" :level-list="levelList" :post-form="riskInfo" :dialog-risk-visible="dialogRiskVisible" :is-edit="isEdit" @closeRiskDialog="closeRiskDialog" />
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
import { fetchList, deleteRisk } from '@/api/risk'
const _ = require('lodash')
export default {
  name: 'RiskBoard',
  components: {
    RiskModifyDialog
  },
  props: {
    projectId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogRiskVisible: false,
      isEdit: false,
      riskInfo: {},
      risks: [],
      statusList: [],
      levelList: [],
      typeList: []
    }
  },
  computed: {
    riskArr() {
      return _.chunk(this.risks, 2)
    }
  },
  async created() {
    await this.$store.dispatch('risk/initStatusList')
    await this.$store.dispatch('risk/initLevelList')
    await this.$store.dispatch('risk/initTypeList')
    this.statusList = this.$store.state.risk.statusList
    this.levelList = this.$store.state.risk.levelList
    this.typeList = this.$store.state.risk.typeList
    this.getList()
  },
  methods: {
    closeRiskDialog() {
      this.dialogRiskVisible = false
      this.getList()
    },
    getList() {
      const listQuery = {
        limit: 20,
        project_id: this.projectId
      }
      fetchList(listQuery).then(response => {
        this.risks = _.cloneDeep(response.data)
      })
    },
    addRisk() {
      this.riskInfo = {
        description: '', // 风险描述
        project_id: this.projectId, // 所属项目ID
        status: null, // 风险状态
        type: null, // 风险类型
        level: null, // 等级
        reason: '', // 原因
        measure: '', // 措施
        exist_time: '', // 续存期
        score: 0 // 评分
      }
      this.dialogRiskVisible = true
      this.isEdit = false
    },
    editRisk(item) {
      this.riskInfo = item
      this.riskInfo.type = this.riskInfo.type.toString()
      this.riskInfo.status = this.riskInfo.status.toString()
      this.riskInfo.level = this.riskInfo.level.toString()

      this.dialogRiskVisible = true
      this.isEdit = true
    },
    remove(item) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRisk(item.id).then(response => {
          this.$message.success('成功删除')
          this.getList()
        })
      })
    },
    levelFilter(item) {
      return this.levelList[item] ? this.levelList[item] : '未知'
    },
    typeFilter(item) {
      return this.typeList[item] ? this.typeList[item] : '未知'
    },
    statusFilter(item) {
      return this.statusList[item] ? this.statusList[item] : '未知'
    }
  }
}
</script>
