<template>
  <div class="app-container">
    <div class="box-header">
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-plus" @click="add">新增变更</el-button>
    </div>
    <el-row
      v-for="(changeRow,index) in changesArr"
      :key="index"
      :gutter="24"
      type="flex"
      align="middle"
    >
      <el-col
        v-for="(change,childIndex) in changeRow"
        :key="childIndex"
        :span="12"
      >
        <el-row
          :gutter="24"
          type="flex"
          align="middle"
        >
          <el-col
            :span="24"
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ typeFilter(change.type) }}</span>
                <el-button style="float: right; padding: 3px 3px" type="text" @click="edit(change)">编辑</el-button>
                <el-button style="float: right; padding: 3px 3px;color:#f56c6c" type="text" @click="remove(change)">移除</el-button>
              </div>
              <el-row :gutter="24">
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    变更提出阶段
                  </span>
                  <span class="item-content">
                    {{ stageFilter(change.change_stage) }}
                  </span>
                </el-col>
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    变更提交时间
                  </span>
                  <span class="item-content">
                    {{ change.change_date }}
                  </span>
                </el-col>
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    变更类型
                  </span>
                  <span class="item-content">
                    {{ typeFilter(change.type) }}
                  </span>
                </el-col>

              </el-row>
              <el-row :gutter="24">
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    变更审批等级
                  </span>
                  <span class="item-content">
                    {{ levelFilter(change.level) }}
                  </span>
                </el-col>
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    外部强制变更
                  </span>
                  <span class="item-content">
                    {{ change.is_external_forced_change == 1 ? '是' : '否' }}
                  </span>
                </el-col>
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    是否追加预算
                  </span>
                  <span class="item-content">
                    {{ change.is_add_budget == 1 ? '是' : '否' }}
                  </span>
                </el-col>
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    工作量变化
                  </span>
                  <span class="item-content">
                    {{ change.workload_changes }}
                  </span>
                </el-col>
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    工作量变化率
                  </span>
                  <span class="item-content">
                    {{ change.workload_change_rate }}
                  </span>
                </el-col>
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    工期偏差
                  </span>
                  <span class="item-content">
                    {{ change.schedule_deviation }}
                  </span>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="24" class="item-col">
                  <span class="item-title">
                    备注
                  </span>
                  <span class="item-content">
                    {{ change.remark }}
                  </span>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <project-change-dialog :stage-list="stageList" :level-list="levelList" :type-list="typeList" :post-form="changeInfo" :dialog-visible="dialogVisible" :is-edit="isEdit" @closeDialog="closeDialog" />
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
import { fetchList, deleteProjectChange } from '@/api/projectChange'

import ProjectChangeDialog from './ProjectChangeDialog'
const _ = require('lodash')
export default {
  name: 'ChangeBoard',
  components: {
    ProjectChangeDialog
  },
  props: {
    projectId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogVisible: false,
      isEdit: false,
      changeInfo: {},
      changes: []
    }
  },
  computed: {
    changesArr() {
      return _.chunk(this.changes, 2)
    }
  },
  async created() {
    await this.$store.dispatch('projectChange/initLevelList')
    await this.$store.dispatch('projectChange/initTypeList')
    await this.$store.dispatch('project/initStageList')
    this.stageList = this.$store.state.project.stageList
    this.levelList = this.$store.state.projectChange.levelList
    this.typeList = this.$store.state.projectChange.typeList
    this.getList()
  },
  methods: {
    getList() {
      const listQuery = {
        limit: 20,
        project_id: this.projectId
      }
      fetchList(listQuery).then(response => {
        this.changes = _.cloneDeep(response.data)
      })
    },
    closeDialog() {
      this.dialogVisible = false
      this.getList()
    },
    remove(item) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProjectChange(item.id).then(response => {
          this.$message.success('成功删除')
          this.getList()
        })
      })
    },
    add() {
      this.changeInfo = {
        project_id: this.projectId, // 所属项目ID
        change_stage: null, // 变更提出阶段
        change_date: null, // 变更提交时间
        type: null, // 类型
        level: null, // 等级
        is_external_forced_change: null, // 是否外部强制变更
        is_add_budget: null, // 是否增加预算
        workload_changes: 0, // 工作量变化
        workload_change_rate: null, // 工作量变化率
        schedule_deviation: null, // 工期偏差
        remark: '' // 备注
      }
      this.dialogVisible = true
      this.isEdit = false
    },
    edit(item) {
      this.changeInfo = item
      this.changeInfo.type = this.changeInfo.type.toString()
      this.changeInfo.level = this.changeInfo.level.toString()
      this.changeInfo.change_stage = this.changeInfo.change_stage.toString()
      this.changeInfo.is_external_forced_change = this.changeInfo.is_external_forced_change.toString()
      this.changeInfo.is_add_budget = this.changeInfo.is_add_budget.toString()

      this.dialogVisible = true
      this.isEdit = true
    },
    levelFilter(item) {
      return this.levelList[item] ? this.levelList[item] : '未知'
    },
    typeFilter(item) {
      return this.typeList[item] ? this.typeList[item] : '未知'
    },
    stageFilter(val) {
      const valMap = this.stageList
      return valMap[val] ? valMap[val] : '未知'
    }
  }
}
</script>
