<template>
  <div>
    <el-steps :active="active" finish-status="success" simple>
      <el-step title="项目基础信息" />
      <el-step title="联系人" />
      <el-step title="关键时间点" />
    </el-steps>
    <basic-form v-if="active == 0" :is-edit="false" :basic="basic" @updateBasic="updateBasic" />
    <contact-form v-if="active == 1" :is-edit="false" :contact="contact" @updateContact="updateContact" />
    <time-line-form v-if="active == 2" :is-edit="false" :time-line="timeline" @updateTimeline="updateTimeline" />
    <el-row type="flex" justify="center">
      <el-col :span="3">
        <el-button type="primary" style="width:80%" @click="pre">上一步</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" style="width:80%" @click="next">下一步</el-button>
      </el-col>
      <el-col :span="3">
        <el-button v-if="active==2" type="primary" style="width:80%" @click="submit">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BasicForm from './BasicForm'
import ContactForm from './ContactForm'
import TimeLineForm from './TimeLineForm'

import { addProject } from '@/api/project'
const defaultBasicForm = {
  name: '',
  sequence: '',
  status: 0,
  innovation_year: '',
  stage: 0,
  type: 0,
  control_mode: 0,
  scale: 0,
  scope: '',
  dev_mode: 0,
  competent_authority: '',
  classify_name: '',
  budget_type: '',
  dev_unit: '',
  dev_team: '',
  sys_user: '',
  demand_dev_mode: '',
  test_mode: 0,
  target: '',
  description: '',
  remark: '',
  main_sys: '',
  related_sys: '',
  is_phased: 0,
  complete_percent: 0
}

const defaultContactForm = {
  business_contact: '',
  tech_contact: '',
  leader_team: '',
  change_control_team: '',
  po: '',
  business_members: '',
  host_head: '',
  host_branch: '',
  co_head: '',
  co_branch: '',
  host_sa: '',
  pm: '',
  dev_members: '',
  lead_architect: '',
  data_architect: '',
  app_architect: '',
  tech_architect: '',
  security_architect: '',
  ptm: '',
  qa: '',
  data_platform_contact: '',
  app_platform_contact: '',
  product_app_maintenance_contact: '',
  product_env_protection_contact: '',
  product_net_protection_contact: '',
  project_tech_leader: '',
  config_admin: '',
  overall_structure_contact: '',
  tech_standard_contact: '',
  data_standard_contact: '',
  risk_related_contact: '',
  env_protection_contact: '',
  leader_group_members: '',
  product_group_members: '',
  tech_group_members: '',
  agile_support_group_members: ''
}

const defaultTimelineForm = {
  application_date: null,
  expected_launch_date: null,
  acceptance_date: null,
  plan_start_date: null,
  plan_end_date: null,
  actual_start_date: null,
  actual_end_date: null,
  charter_release_date: null,
  project_start_date: null,
  requirement_review_date: null,
  requirement_release_date: null,
  summary_design_review_date: null,
  summary_design_release_date: null,
  code_start_date: null,
  code_end_date: null,
  test_start_date: null,
  test_end_date: null,
  online_review_pass_date: null,
  online_date: null,
  deployment_complete_date: null,
  acceptance_passed_date: null
}

const _ = require('lodash')
export default {
  name: 'CreateProject',
  components: { BasicForm, ContactForm, TimeLineForm },
  data() {
    return {
      active: 0,
      basic: _.cloneDeep(defaultBasicForm),
      contact: _.cloneDeep(defaultContactForm),
      timeline: _.cloneDeep(defaultTimelineForm)
    }
  },
  created() {
  },
  methods: {
    pre() {
      if (this.active >= 1) {
        this.active--
      }
    },
    next() {
      if (this.active <= 2) {
        this.active++
      }
    },
    updateBasic(value) {
      this.basic = value
    },
    updateContact(value) {
      this.contact = value
    },
    updateTimeline(value) {
      this.timeline = value
    },
    submit() {
      const postData = this.basic
      postData.contact = this.contact
      postData.timeline = this.timeline
      addProject(postData).then(response => {
        this.$router.push('/project/index')
      })
    }
  }
}
</script>

