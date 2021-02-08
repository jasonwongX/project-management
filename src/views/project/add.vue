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
          <el-form-item label="项目阶段" prop="type">
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
          <el-form-item label="开发模式" prop="dev_mode">
            <el-select v-model="postForm.dev_mode" placeholder="开发模式">
              <el-option
                v-for="(item, index) in devModeList"
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
            <el-input v-model="postForm.contact.pm" placeholder="项目经理" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="业务联系人" prop="business_contact">
            <el-input v-model="postForm.business_contact" placeholder="业务联系人" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="产品经理" prop="po">
            <el-input v-model="postForm.contact.po" placeholder="产品经理" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="测试经理" prop="ptm">
            <el-input v-model="postForm.contact.ptm" placeholder="˜测试经理" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="质量控制人员" prop="qa">
            <el-input v-model="postForm.contact.qa" placeholder="质量控制人员" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="申请日期" prop="application_date">
            <el-date-picker
              v-model="postForm.timeline.application_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="章程发布日期" prop="charter_release_date">
            <el-date-picker
              v-model="postForm.timeline.charter_release_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            />
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
import { addProject } from '@/api/project'

export default {
  name: 'AddProject',
  data() {
    return {
      postForm: {
        name: '',
        sequence: '',
        status: 1, // 在建
        stage: null,
        type: null,
        control_mode: null,
        scale: null,
        dev_mode: null,
        dev_unit: '',
        dev_team: '',
        demand_dev_mode: '',
        target: '',
        description: '',
        is_phased: 0,
        complete_percent: 0,
        contact: {
          business_contact: '',
          po: '',
          ptm: '',
          qa: ''
        },
        timeline: {
          application_date: '',
          charter_release_date: ''
        }
      },
      statusList: {
        1: '在建',
        2: '暂停',
        3: '投产'
      },
      devModeList: {
        1: '传统模式',
        2: '敏捷模式'
      },
      testModeList: {
        1: '自主测试',
        2: '外包测试',
        3: '性能测试',
        4: '专项测试'
      },
      loadingProject: false, // 项目查询加载
      rules: {
        name: [
          { required: true, message: '项目名称不能为空' }
        ],
        devMode: [
          { required: true, message: '请选择开发模式' }
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
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    submit() {
      addProject(this.postForm).then(response => {
        this.$router.push('/project/index')
      })
    }
  }
}
</script>
