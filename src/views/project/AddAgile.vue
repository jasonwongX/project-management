<template>
  <div class="edit-container">
    <el-form ref="form" :model="postForm" :rules="rules" label-width="120px">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="postForm.name" placeholder="请输入项目名称" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="项目编号" prop="sequence">
            <el-input v-model="postForm.sequence" placeholder="请输入项目编号" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="迭代周期(周)" prop="sprint_time">
            <el-input v-model="postForm.agile.sprint_time" placeholder="请输入迭代周期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="试点启动" prop="sprint_start_date">
            <el-date-picker
              v-model="postForm.agile.sprint_start_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="掌控方式" prop="control_mode">
            <el-select v-model="postForm.control_mode" placeholder="掌控方式">
              <el-option
                v-for="(item, index) in controlModeList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="项目规模" prop="scale">
            <el-select v-model="postForm.scale" placeholder="项目规模">
              <el-option
                v-for="(item, index) in scaleList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="完成百分比">
            <el-input-number v-model="percentVal" :min="0" :max="100" label="完成百分比" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="产品经理" prop="po">
            <el-input v-model="postForm.agile.po" placeholder="产品经理" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="SM" prop="sm">
            <el-input v-model="postForm.agile.sm" placeholder="SM" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="质量控制人员" prop="qa">
            <el-select
              v-model="postForm.user_id"
              filterable
              remote
              reserve-keyword
              placeholder="请输入QA名称"
              :remote-method="searchQaList"
              :loading="loadingQa"
              clearable
              style="width: 130px"
              class="filter-item"
            >
              <el-option
                v-for="item in qaList"
                :key="item.id"
                :label="item.real_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="业务主管部门" prop="competent_authority">
            <el-input v-model="postForm.competent_authority" placeholder="业务主管部门" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="研发单位" prop="dev_unit">
            <el-input v-model="postForm.dev_unit" placeholder="研发" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="研发团队" prop="dev_team">
            <el-input v-model="postForm.dev_team" placeholder="研发团队" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="章程发布日期" prop="charter_release_date">
            <el-date-picker
              v-model="postForm.charter_release_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="首次上线日期" prop="first_publish_date">
            <el-date-picker
              v-model="postForm.agile.first_publish_date"
              type="date"
              placeholder="首次上线日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="最终投产日期" prop="last_publish_date">
            <el-date-picker
              v-model="postForm.agile.last_publish_date"
              type="date"
              placeholder="最终投产日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="系统类型" prop="sys_type">
            <el-select v-model="postForm.sys_type" placeholder="系统类型">
              <el-option
                v-for="(item, index) in sysTypeList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="度量数据">
            <el-input
              v-model="postForm.agile.metric_data"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入度量数据"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="实践情况">
            <el-input
              v-model="postForm.agile.practice"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入实践情况"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="近况概述">
            <el-input
              v-model="postForm.agile.overview"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入近况概述"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="发布汇总">
            <el-input
              v-model="postForm.agile.release_summary"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入发布汇总"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="拟培养角色">
            <el-input
              v-model="postForm.agile.intended_role"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入培养角色"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="角色培养情况">
            <el-input
              v-model="postForm.agile.role_development"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入角色培养情况"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="工具应用情况">
            <el-input
              v-model="postForm.agile.tool_application"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入工具应用情况"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
.edit-container {
  padding: 10px 20px;
}
</style>
<script>
import { addProject, editProject } from '@/api/project'
import { getQaList } from '@/api/user'
const _ = require('lodash')
export default {
  name: 'AddAgileProject',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    projectInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      qaList: [],
      percentVal: 0, // 百分比整数
      loadingQa: false,
      postForm: {
        name: '',
        sequence: '',
        status: 1, // 在建
        type: null,
        control_mode: null,
        scale: null,
        dev_mode: 2,
        dev_unit: '',
        dev_team: '',
        demand_dev_mode: '',
        target: '',
        description: '',
        is_phased: 0,
        complete_percent: 0,
        business_contact: '',
        sys_type: null,
        pm: '',
        po: '',
        ptm: '',
        qa: '',
        application_date: '',
        charter_release_date: '',
        agile: {
          sprint_time: '',
          sprint_start_date: '',
          po: '',
          sm: '',
          first_publish_date: '',
          last_publish_date: '',
          metric_data: '',
          practice: '',
          overview: '',
          release_summary: '',
          intended_role: '',
          role_development: '',
          tool_application: ''
        }
      },
      sysTypeList: {
        1: '项目',
        2: '迭代开发'
      },
      loadingProject: false, // 项目查询加载
      rules: {
        name: [
          { required: true, message: '项目名称不能为空' }
        ],
        type: [
          { required: true, message: '请选择项目类型' }
        ],
        status: [
          { required: true, message: '请选择状态' }
        ],
        stage: [
          { required: true, message: '请选择阶段' }
        ],
        scale: [
          { required: true, message: '请选择规模' }
        ]
      }
    }
  },
  watch: {
    projectInfo: {
      deep: true,
      handler(val) {
        if (this.isEdit) {
          this.postForm = _.cloneDeep(val)
        }
        this.percentVal = this.postForm.complete_percent * 100
      }
    }
  },
  created() {
    this.scaleList = this.$store.state.project.scaleList
    this.stageList = this.$store.state.project.stageList
    this.controlModeList = this.$store.state.project.controlModeList
    this.postForm.stage = 1
    this.initQaList()
  },
  mounted() {

  },
  methods: {
    initQaList() {
      getQaList().then(response => {
        this.qaList = response.data
      })
    },
    // 查询QA列表
    searchQaList(label) {
      this.loadingQa = true
      getQaList(label).then(response => {
        this.qaList = response.data
        this.loadingQa = false
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    submit() {
      this.postForm.complete_percent = this.percentVal / 100
      if (this.isEdit) {
        editProject(this.postForm).then(response => {
          this.$message.success('成功更新项目信息')
        })
      } else {
        addProject(this.postForm).then(response => {
          this.$message.success('成功添加项目')
          this.$router.push('/project/index')
        })
      }
    }
  }
}
</script>
