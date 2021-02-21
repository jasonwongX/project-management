<template>
  <el-dialog title="项目暂停" :visible.sync="dialogStopVisible">
    <el-form ref="form" :model="postForm" label-width="120px">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="暂停时间" prop="project_stop_date">
            <el-date-picker
              v-model="postForm.project_stop_date"
              type="date"
              size="small"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="预计重启时间" prop="project_plan_recover_date">
            <el-date-picker
              v-model="postForm.project_plan_recover_date"
              type="date"
              size="small"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="暂停原因">
            <el-input
              v-model="postForm.project_stop_reason"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入项目暂停的原因"
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
<script>
import { updateProjectStatus } from '@/api/project'

export default {
  name: 'ProjectStopDialog',
  props: {
    dialogStopVisible: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      postForm: {
        project_id: this.projectId,
        project_stop_reason: '',
        project_stop_date: null,
        project_plan_recover_date: null
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('closeStopDialog')
    },
    submitForm() {
      this.postForm['status'] = 2
      updateProjectStatus(this.postForm).then(response => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.$emit('closeStopDialog')
      })
    }
  }
}
</script>

