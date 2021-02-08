<template>
  <div class="app-container">
    <div class="box-header">
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-plus" @click="add">新增变更</el-button>
    </div>
    <el-row
      v-for="(change,index) in changes"
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
            <span>{{ change.type }}</span>
            <el-button style="float: right; padding: 3px 3px" type="text" @click="edit()">编辑</el-button>
            <el-button style="float: right; padding: 3px 3px;color:#f56c6c" type="text">移除</el-button>
          </div>
          <el-row :gutter="32">
            <el-col :span="6" class="item-col">
              <span class="item-title">
                变更提出阶段
              </span>
              <span class="item-content">
                {{ change.stage }}
              </span>
            </el-col>
            <el-col :span="6" class="item-col">
              <span class="item-title">
                变更提交时间
              </span>
              <span class="item-content">
                {{ change.change_date }}
              </span>
            </el-col>
            <el-col :span="6" class="item-col">
              <span class="item-title">
                变更类型
              </span>
              <span class="item-content">
                {{ change.type }}
              </span>
            </el-col>
            <el-col :span="6" class="item-col">
              <span class="item-title">
                变更审批等级
              </span>
              <span class="item-content">
                {{ change.level }}
              </span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24" class="item-col">
              <span class="item-title">
                外部强制变更
              </span>
              <span class="item-content">
                {{ change.is_external_forced_change == 1 ? '是' : '否' }}
              </span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24" class="item-col">
              <span class="item-title">
                是否追加预算
              </span>
              <span class="item-content">
                {{ change.is_add_budget == 1 ? '是' : '否' }}
              </span>
            </el-col>
            <el-col :span="24" class="item-col">
              <span class="item-title">
                工作量变化
              </span>
              <span class="item-content">
                {{ change.workload_changes }}
              </span>
            </el-col>
            <el-col :span="24" class="item-col">
              <span class="item-title">
                工作量变化率
              </span>
              <span class="item-content">
                {{ change.workload_change_rate }}
              </span>
            </el-col>
            <el-col :span="24" class="item-col">
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
    <project-change-dialog :dialog-visible="dialogVisible" :is-edit="isEdit" @closeDialog="closeDialog" />
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
import ProjectChangeDialog from './ProjectChangeDialog'

export default {
  name: 'ChangeBoard',
  components: {
    ProjectChangeDialog
  },
  data() {
    return {
      dialogVisible: false,
      isEdit: false,
      changes: [
        {
          stage: '项目进度',
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
    closeDialog() {
      this.dialogVisible = false
    },
    add() {
      this.dialogVisible = true
      this.isEdit = false
    },
    edit() {
      this.dialogVisible = true
      this.isEdit = true
    }
  }
}
</script>
