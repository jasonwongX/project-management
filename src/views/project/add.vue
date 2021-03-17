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
          <el-form-item label="项目阶段" prop="stage">
            <el-select v-model="postForm.stage" placeholder="项目阶段">
              <el-option
                v-for="(item, index) in stageList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
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
          <el-form-item label="项目经理" prop="pm">
            <el-input v-model="postForm.pm" placeholder="项目经理" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="业务联系人" prop="business_contact">
            <el-input v-model="postForm.business_contact" placeholder="业务联系人" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="产品经理" prop="po">
            <el-input v-model="postForm.po" placeholder="产品经理" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="测试经理" prop="ptm">
            <el-input v-model="postForm.ptm" placeholder="˜测试经理" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="质量控制人员" prop="user_id">
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
          <el-form-item label="申请日期" prop="application_date">
            <el-date-picker
              v-model="postForm.application_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            />
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
          <el-form-item label="系统类型" prop="dev_mode">
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
          <el-form-item label="项目目标">
            <el-input
              v-model="postForm.target"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入项目目标"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="需求概述">
            <el-input
              v-model="postForm.description"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入需求概述"
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
        <el-button type="primary" style="width:80%" @click="submit">保存</el-button>
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
  name: 'AddProject',
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
      loadingQa: false,
      postForm: {
        name: '',
        sequence: '',
        status: 1, // 在建
        stage: null,
        type: null,
        control_mode: null,
        scale: null,
        dev_mode: 1,
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
        user_id: '',
        application_date: '',
        charter_release_date: ''
      },
      statusList: {
        1: '在建',
        2: '暂停',
        3: '投产'
      },
      testModeList: {
        1: '自主测试',
        2: '外包测试',
        3: '性能测试',
        4: '专项测试'
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
  created() {
    this.scaleList = this.$store.state.project.scaleList
    this.stageList = this.$store.state.project.stageList
    this.controlModeList = this.$store.state.project.controlModeList
    this.initQaList()
    if (this.isEdit) {
      this.postForm = _.cloneDeep(this.projectInfo)
    }
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
      if (!this.isEdit) {
        this.$router.go(-1)
      }
    },
    submit() {
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
