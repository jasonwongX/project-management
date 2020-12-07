<template>
  <div class="edit-container">
    <el-collapse v-model="activeNames" style="padding-left:20px;padding-right:20px">
      <el-collapse-item title="项目基础信息" name="1">
        <basic-form :is-edit="true" :basic="basic" @updateBasic="updateBasic" />
      </el-collapse-item>
      <el-collapse-item title="联系人" name="2">
        <contact-form :is-edit="true" :contact="contact" @updateContact="updateContact" />
      </el-collapse-item>
      <el-collapse-item title="关键时间点" name="3">
        <time-line-form :is-edit="true" :time-line="timeline" @updateTimeline="updateTimeline" />
      </el-collapse-item>
    </el-collapse>
    <el-row type="flex" justify="center">
      <el-col :span="6">
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
import BasicForm from './BasicForm'
import ContactForm from './ContactForm'
import TimeLineForm from './TimeLineForm'
import { fetchProject } from '@/api/project'
const _ = require('lodash')

export default {
  name: 'EditProject',
  components: { BasicForm, ContactForm, TimeLineForm },
  data() {
    return {
      projectId: 0,
      activeNames: ['1'],
      basic: {},
      contact: {},
      timeline: {}
    }
  },
  created() {
    this.projectId = this.$route.query && this.$route.query.id
    this.getInfo(this.projectId)
  },
  methods: {
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
      debugger
      const postData = this.basic
      postData.contact = this.contact
      postData.timeline = this.timeline
      // editProject(this.projectId, postData).then(response => {
      //   this.$router.push('/project/index')
      // })
    },
    // 项目详情
    getInfo(id) {
      const that = this
      fetchProject(id).then(response => {
        that.contact = _.cloneDeep(response.data.contact)
        that.timeline = _.cloneDeep(response.data.timeLine)
        that.basic = _.cloneDeep(response.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

