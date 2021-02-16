<template>
  <el-dialog :title="titleName" :visible.sync="dialogAgileProcessVisible">
    <el-form ref="form" :model="postForm">
      <el-row :gutter="32" class="item-row">
        <el-col v-show="!isEdit" :span="8">
          <el-form-item label="迭代数">
            <el-input-number v-model="postForm.sequence" :min="0" label="迭代数" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始日期">
            <el-date-picker
              v-model="postForm.sprint_start_date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束日期">
            <el-date-picker
              v-model="postForm.sprint_end_date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="用户故事数">
            <el-input-number v-model="postForm.story_num" :min="0" label="用户故事数" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作点数">
            <el-input-number v-model="postForm.task_num" :min="0" label="工作点数" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="完成率">
            <el-input-number v-model="postForm.complete_percent" :min="0" :max="100" label="完成率" />
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="内容描述">
            <el-input
              v-model="postForm.description"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="当前迭代工作任务描述"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="敏捷活动">
            <el-input
              v-model="postForm.activity_summary"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="业务梳理会/计划会/站立会/评审会/回顾会执行情况"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="敏捷团队建设">
            <el-input
              v-model="postForm.team_summary"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="团队自组织、角色分配及团队协作方面情况"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="敏捷需求管理">
            <el-input
              v-model="postForm.requirement_summary"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="用户故事拆分与估算情况"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="敏捷技术实践">
            <el-input
              v-model="postForm.tech_summary"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="代码管理、流水线、自动化测试、CI/CD、代码扫描实践情况"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addAgileProcess, editAgileProcess } from '@/api/agileProcess'
export default {
  name: 'ProcessAgileDialog',
  props: {
    dialogAgileProcessVisible: {
      type: Boolean,
      default: false
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
  computed: {
    titleName() {
      return `迭代${this.postForm.sequence}`
    }

  },
  methods: {
    cancel() {
      this.$emit('closeAgileProcessDialog')
    },

    save() {
      if (!this.isEdit) {
        addAgileProcess(this.postForm).then(response => {
          this.$message.success('成功添加迭代')
          this.$emit('closeAgileProcessDialog')
        })
      } else {
        editAgileProcess(this.postForm).then(response => {
          this.$message.success('成功更新迭代信息')
          this.$emit('closeAgileProcessDialog')
        })
      }
    }
  }
}
</script>

