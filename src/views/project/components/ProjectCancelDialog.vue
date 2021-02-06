<template>
  <el-dialog title="项目暂停" :visible.sync="dialogCancelVisible">
    <el-form ref="form" :model="postForm" :rules="rules" label-width="120px">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="提交时间" prop="change_date">
            <el-date-picker
              v-model="postForm.change_date"
              type="date"
              size="small"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="原因">
            <el-input
              v-model="postForm.remark"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入原因"
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
export default {
  name: 'ProjectCancelDialog',
  props: {
    dialogCancelVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: {
        change_date: null,
        remark: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('closeCancelDialog')
    },
    submitForm() {

    }
  }
}
</script>

