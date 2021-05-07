<template>
  <el-dialog :title="isEdit ? '编辑风险项' : '新增风险项'" :visible="dialogRiskVisible" @close="cancel">
    <el-form ref="form" :model="postForm" :rules="rules">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="风险类型" prop="type">
            <el-select v-model="postForm.type" placeholder="请选择类型">
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="风险等级" prop="level">
            <el-select v-model="postForm.level" placeholder="请选择等级">
              <el-option
                v-for="(item, index) in levelList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="风险状态" prop="status">
            <el-select v-model="postForm.status" placeholder="请选择状态">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="续存期" prop="exist_time">
            <el-input v-model="postForm.exist_time" style="width:80%" placeholder="请输入续存期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="风险评分" prop="score">
            <el-input-number v-model="postForm.score" :min="1" :max="100" label="风险评分（1-100）" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="风险描述" prop="description">
            <el-input
              v-model="postForm.description"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入描述"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="原因分析">
            <el-input
              v-model="postForm.reason"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入原因"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="措施">
            <el-input
              v-model="postForm.measure"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入措施"
              type="textarea"
            />
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
import { addRisk, editRisk } from '@/api/risk'
export default {
  name: 'RiskModifyDialog',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    dialogRiskVisible: {
      type: Boolean,
      default: false
    },
    postForm: {
      type: Object,
      default: () => {}
    },
    statusList: {
      type: [Object, Array],
      default: () => {}
    },
    levelList: {
      type: [Object, Array],
      default: () => {}
    },
    typeList: {
      type: [Object, Array],
      default: () => {}
    }
  },
  data() {
    return {
      loadingProject: false, // 项目查询加载
      rules: {
        description: [
          { required: true, message: '描述不能为空' }
        ],
        score: [
          { required: true, message: '评分不能为空' }
        ],
        level: [
          { required: true, message: '请选择风险等级' }
        ],
        type: [
          { required: true, message: '请选择风险分类' }
        ],
        status: [
          { required: true, message: '请选择风险状态' }
        ],
        exist_time: [
          { required: true, message: '续存期不能为空' }
        ]
      }
    }
  },
  methods: {
    // 风险详情
    cancel() {
      this.$emit('closeRiskDialog')
    },
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            editRisk(this.postForm).then(response => {
              this.$message.success('成功更新风险信息')
              this.$emit('closeRiskDialog')
            })
          } else {
            addRisk(this.postForm).then(response => {
              this.$message.success('成功添加风险')
              this.$emit('closeRiskDialog')
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
