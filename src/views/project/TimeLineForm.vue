<template>
  <div class="edit-container">
    <el-form ref="form" :model="postForm" :rules="rules" label-width="120px">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="申请日期" prop="application_date">
            <el-input v-model="postForm.application_date" type="date" placeholder="申请日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="章程发布日期" prop="charter_release_date">
            <el-input v-model="postForm.charter_release_date" type="date" placeholder="章程发布日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="项目启动日期" prop="project_start_date">
            <el-input v-model="postForm.project_start_date" type="date" placeholder="项目启动日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="期望上线日期" prop="expected_launch_date">
            <el-input v-model="postForm.expected_launch_date" type="date" placeholder="期望上线日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="受理日期" prop="acceptance_date">
            <el-input v-model="postForm.acceptance_date" type="date" placeholder="受理日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="计划开始日期" prop="plan_start_date">
            <el-input v-model="postForm.plan_start_date" type="date" placeholder="计划开始日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="计划结束日期" prop="plan_end_date">
            <el-input v-model="postForm.plan_end_date" type="date" placeholder="计划结束日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="实际开始日期" prop="actual_start_date">
            <el-input v-model="postForm.actual_start_date" type="date" placeholder="实际开始日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="实际结束日期" prop="actual_end_date">
            <el-input v-model="postForm.actual_end_date" type="date" placeholder="实际结束日期" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="需求评审日期" prop="requirement_review_date">
            <el-input v-model="postForm.requirement_review_date" type="date" placeholder="需求评审日期" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="需求发布日期" prop="requirement_release_date">
            <el-input v-model="postForm.requirement_release_date" type="date" placeholder="需求发布日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="概要设计评审日期" prop="summary_design_review_date">
            <el-input v-model="postForm.summary_design_review_date" type="date" placeholder="概要设计评审日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="概要设计发布日期" prop="summary_design_release_date">
            <el-input v-model="postForm.summary_design_release_date" type="date" placeholder="概要设计发布日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="编码开始日期" prop="code_start_date">
            <el-input v-model="postForm.code_start_date" type="date" placeholder="编码开始日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="编码结束日期" prop="code_end_date">
            <el-input v-model="postForm.code_end_date" type="date" placeholder="编码结束日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="测试开始日期" prop="test_start_date">
            <el-input v-model="postForm.test_start_date" type="date" placeholder="测试开始日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="测试结束日期" prop="test_end_date">
            <el-input v-model="postForm.test_end_date" type="date" placeholder="测试结束日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="上线评审通过日期" prop="online_review_pass_date">
            <el-input v-model="postForm.online_review_pass_date" type="date" placeholder="上线评审通过日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="上线日期" prop="online_date">
            <el-input v-model="postForm.online_date" type="date" placeholder="上线日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="部署完成日期" prop="deployment_complete_date">
            <el-input v-model="postForm.deployment_complete_date" type="date" placeholder="部署完成日期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="验收通过日期" prop="acceptance_passed_date">
            <el-input v-model="postForm.acceptance_passed_date" type="date" placeholder="验收通过日期" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
  </div>
</template>
<style lang="less" scoped>
.edit-container {
  padding: 10px 20px;
}
</style>
<script>

export default {
  name: 'BasicForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    timeLine: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      postForm: this.timeLine,
      loadingProject: false, // 项目查询加载
      rules: {
        application_date: [
          { required: true, message: '申请日期不能为空' }
        ]
      }
    }
  },
  watch: {
    postForm: {
      handler(val) {
        this.$emit('updateTimeline', val)
      }
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
