<template>
  <div class="app-container">
    <div class="box-header">
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-plus" @click="add()">新增评分</el-button>
    </div>
    <el-row
      v-for="(riskScoreRow,index) in scoreArr"
      :key="index"
      :gutter="24"
      type="flex"
      align="middle"
    >
      <el-col
        v-for="(score,childIndex) in riskScoreRow"
        :key="childIndex"
        :span="8"
      >

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="item-title">{{ formatDate(score.time) }}</span>
            <el-button class="edit-btn" type="text" @click="edit(score)">编辑</el-button>
            <el-button class="delete-btn" type="text" @click="remove(score)">移除</el-button>
          </div>
          <el-row :gutter="24">
            <el-col v-for="(item, itemIndex) in typeList" :key="itemIndex" class="item-col" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <span class="item-label">{{ item }}</span>
              <span>{{ score.items[itemIndex] }}</span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <risk-score-modify-dialog :project-id="projectId" :type-list="typeList" :post-form="riskScoreInfo" :dialog-risk-score-visible="dialogRiskScoreVisible" :is-edit="isEdit" @closeRiskScoreDialog="closeRiskScoreDialog" />

  </div>
</template>
<style lang="less" scoped>
.app-container {
    padding: 10px 10px;
}
.box-card {
  margin-bottom:10px;
}
.box-header {
    margin-bottom: 10px;
}
.clearfix {
  height: 32px;
}
.item-title {
  line-height: 32px;
}
.item-col {
    padding: 5px 0;
    font-size: 14px;
    height: 46px;
    .item-label {
        margin-right:10px;
        color: #666;
    }
    .item-input {
        font-weight: 500;
        width:100px;
    }
}
.edit-btn {
  float: right;
  padding: 3px 3px;
}
.delete-btn {
  float: right;
  padding: 3px 3px;
  color:#f56c6c;
}

</style>
<script>
import { getProjectScoreList, deleteRiskScore } from '@/api/riskScore'
import RiskScoreModifyDialog from './RiskScoreModifyDialog'

const _ = require('lodash')
const moment = require('moment')
export default {
  name: 'RiskScoreBoard',
  components: {
    RiskScoreModifyDialog
  },
  props: {
    projectId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogRiskScoreVisible: false,
      isEdit: false,
      typeList: [],
      scores: [],
      riskScoreInfo: {}
    }
  },
  computed: {
    scoreArr() {
      return _.chunk(this.scores, 3)
    }
  },
  async created() {
    await this.$store.dispatch('risk/initTypeList')
    this.typeList = this.$store.state.risk.typeList
    this.initRiskInfo()
    this.getList()
  },
  methods: {
    getList() {
      const listQuery = {
        limit: 20,
        project_id: this.projectId
      }
      getProjectScoreList(listQuery).then(response => {
        this.scores = _.cloneDeep(response.data)
      })
    },
    closeRiskScoreDialog() {
      this.dialogRiskScoreVisible = false
      this.getList()
    },
    initRiskInfo() {
      const items = []
      for (let i = 1; i < 11; i++) {
        items[i] = 0
      }
      this.riskScoreInfo = {
        time: '',
        items
      }
    },
    add() {
      this.initRiskInfo()
      this.isEdit = false
      this.dialogRiskScoreVisible = true
    },
    remove(item) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRiskScore(this.projectId, item.time).then(response => {
          this.$message.success('成功删除')
          this.getList()
        })
      })
    },
    edit(item) {
      this.riskScoreInfo = item
      this.isEdit = true
      this.dialogRiskScoreVisible = true
    },
    formatDate(value) {
      return value === '' ? '' : moment(value).format('YYYY-MM')
    }
  }
}
</script>
