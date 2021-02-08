<template>
  <el-dialog title="项目投产" :visible.sync="dialogCompleteVisible">
    <el-form ref="form" :model="postForm" label-width="120px">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="投产方式" prop="is_all_complete">
            <el-switch
              v-model="isAllComplete"
              active-text="完全投产"
              inactive-text="分阶段"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!isAllComplete" :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="投产阶段" prop="stage">
            <el-input
              v-model="postForm.stage"
              placeholder="请输入投产阶段"
              type="text"
              size="medium"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="投产时间" prop="change_date">
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
          <el-form-item label="投产意义">
            <el-input
              v-model="postForm.remark"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入投产意义）"
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
  name: 'ProjectCompleteDialog',
  props: {
    dialogCompleteVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isAllComplete: false,
      postForm: {
        complete_date: null,
        remark: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('closeCompleteDialog')
    },
    submitForm() {

    }
  }
}
</script>

