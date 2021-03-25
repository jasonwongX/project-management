<template>
  <el-dialog title="项目投产" :visible.sync="dialogCompleteVisible">
    <el-form ref="form" :model="postForm" label-width="120px">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="投产方式:" prop="is_phased">
            <el-radio v-model="postForm.is_phased" :label="0">完全投产</el-radio>
            <el-radio v-model="postForm.is_phased" :label="1">分阶段</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="postForm.is_phased === 1" :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="投产阶段:" prop="sequence">
            <el-input
              v-model="postForm.sequence"
              placeholder="请输入投产阶段"
              type="text"
              size="small"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="投产时间:" prop="change_date">
            <el-date-picker
              v-model="postForm.complete_date"
              type="date"
              size="small"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="投产意义:">
            <el-input
              v-model="postForm.remark"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入投产意义"
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

import { completeProject } from '@/api/project'

export default {
  name: 'ProjectCompleteDialog',
  props: {
    dialogCompleteVisible: {
      type: Boolean,
      default: false
    },
    projectId: {
      type: Number,
      default: 0
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    postForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    cancel() {
      this.$emit('closeCompleteDialog')
    },
    submitForm() {
      this.postForm.project_id = this.projectId
      completeProject(this.postForm).then(response => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        })
        this.$emit('closeCompleteDialog')
      })
    }
  }
}
</script>

