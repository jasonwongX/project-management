<template>
  <el-dialog :title="isEdit ? '编辑风险评分' : '新增风险评分'" :visible.sync="dialogRiskScoreVisible">
    <el-form ref="form" :model="postForm" :rules="rules" label-width="120px">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="月份" prop="time">
            <el-date-picker v-model="postForm.time" size="small" type="month" format="yyyy-MM" placeholder="选择月份" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col v-for="(item, itemIndex) in typeList" :key="itemIndex" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item :label="item" prop="">
            <el-input-number v-model="postForm.items[itemIndex]" size="mini" label="风险评分（1-100）" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<style lang="less" scoped>
.edit-container {
  padding: 10px 20px;
}
</style>
<script>
import { addRiskScore, editRiskScore } from '@/api/riskScore'

export default {
  name: 'RiskScoreModifyDialog',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    dialogRiskScoreVisible: {
      type: Boolean,
      default: false
    },
    postForm: {
      type: Object,
      default: () => {}
    },
    projectId: {
      type: Number,
      default: 0
    },
    typeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loadingProject: false, // 项目查询加载
      rules: {
        time: [
          { required: true, message: '日期不能为空' }
        ]
      }
    }
  },
  methods: {
    // 风险详情
    cancel() {
      this.$emit('closeRiskScoreDialog')
    },
    submitForm() {
      const valid = this.$refs['form'].validate()
      if (!valid) {
        return false
      }
      this.postForm.project_id = this.projectId
      if (this.isEdit) {
        editRiskScore(this.postForm).then(response => {
          this.$message.success('成功更新风险评分')
          this.$emit('closeRiskScoreDialog')
        })
      } else {
        addRiskScore(this.postForm).then(response => {
          this.$message.success('成功添加风险评分')
          this.$emit('closeRiskScoreDialog')
        })
      }
    }
  }
}
</script>
