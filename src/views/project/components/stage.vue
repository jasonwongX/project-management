<template>
  <div class="stage-container">
    <div
      v-for="(item,index) in stage.stage_items"
      :key="index"
      class="activity"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ item.name }}</span>
        </div>
        <div v-for="(checkItem, checkIndex) in item.check_items" :key="checkIndex" class="text item">
          <el-row :gutter="32" class="item-row">
            <el-col :span="8">
              <span class="item-row-title">{{ checkItem.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-select v-model="checkItem.result" size="small" placeholder="请选择">
                <el-option
                  v-for="option in options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-input v-model="checkItem.remark" size="medium" placeholder="备注" />
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div class="stage-total">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>阶段统计</span>
        </div>
        <el-form>
          <el-row :gutter="24">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="达成率">
                <el-input-number v-model="stage.complete_percent" :min="0" :max="100" label="达成率" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="计划开始时间">
                <el-date-picker v-model="stage.plan_start_date" value-format="YYYY-MM" label="计划开始时间" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="实际开始时间">
                <el-date-picker v-model="stage.actual_start_date" value-format="YYYY-MM" label="实际开始时间" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="过程跟踪">
                <el-input v-model="stage.description" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <el-row type="flex" justify="center">
      <el-col :span="3">
        <el-button type="info" style="width:80%" @click="cancel()">取消</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" style="width:80%" @click="submit()">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.box-card {
  margin-bottom: 8px;
  .item-row {
    padding-bottom:5px;
    .item-row-title {
      font-size: 14px;
    }
  }
}
</style>
<script>
import { modifyCommonProcess } from '@/api/project'
export default {
  name: 'Stage',
  props: {
    stage: {
      type: Object,
      default: () => {}
    },
    projectId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      options: [{
        value: 1,
        label: '通过'
      }, {
        value: 2,
        label: '未通过'
      }, {
        value: 0,
        label: '不涉及'
      }]
    }
  },
  methods: {
    cancel() {

    },
    submit() {
      modifyCommonProcess(this.projectId, this.stage).then(response => {
        this.$message.success('成功更新项目过程信息')
      })
    }
  }

}
</script>
