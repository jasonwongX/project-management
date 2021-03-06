<template>
  <div class="edit-container">
    <h3 class="title">{{ isEdit ? '编辑风险项评分' : '新增风险评分' }}</h3>
    <el-form ref="form" :model="postForm" :rules="rules" label-width="120px">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="所属项目" prop="name">
            <el-select
              v-model="postForm.project_id"
              filterable
              remote
              reserve-keyword
              placeholder="请输入项目名称"
              :remote-method="searchProjectList"
              :loading="loadingProject"
              :disabled="isEdit"
            >
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item label="月份">
            <el-date-picker v-model="postForm.update_date" :readonly="isEdit" type="month" format="yyyy-MM" placeholder="选择月份" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col v-for="(item, index) in typeList" :key="index" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
          <el-form-item :label="item" prop="score">
            <el-input-number v-model="postForm.scores[index]" :min="1" :max="100" label="风险评分（1-100）" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row type="flex" justify="center">
      <el-col :span="2">
        <el-button type="info" style="width:80%" @click="cancel">取消</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" style="width:80%" @click="submitForm">保存</el-button>
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
const defaultForm = {
  project_id: null, // 所属项目ID
  update_date: null, // 风险类型
  scores: [] // 评分
}
const _ = require('lodash')
import { addRiskScore, editRiskScore, getProjectScoreByMonth } from '@/api/riskScore'
import { fetchList, fetchProject } from '@/api/project'
export default {
  name: 'RiskScoreForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: _.cloneDeep(defaultForm),
      loadingProject: false, // 项目查询加载
      projectList: [], // 项目列表
      typeList: [],
      rules: {
        project_id: [
          { required: true, message: '请选择项目' }
        ],
        update_date: [
          { required: true, message: '请选择月份' }
        ]
      }
    }
  },
  async created() {
    if (this.isEdit) {
      const projectId = this.$route.query && this.$route.query.project_id
      const month = this.$route.query && this.$route.query.month

      this.getInfo(projectId, month)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    await this.$store.dispatch('risk/initTypeList')
    this.typeList = this.$store.state.risk.typeList
  },
  methods: {
    // 风险详情
    getInfo(projectId, month) {
      getProjectScoreByMonth({ project_id: projectId, month }).then(response => {
        this.postForm = _.cloneDeep(response.data)
        this.postForm.project_id = this.postForm.project_id.toString()
        this.initProjectById(this.postForm.project_id)
      }).catch(err => {
        console.log(err)
      })
    },
    initProjectById(id) {
      fetchProject(id).then(response => {
        this.projectList = []
        const temp = {}
        temp.id = response.data.id
        temp.name = response.data.name
        this.projectList.push(temp)
      })
    },
    // 查询项目列表
    searchProjectList(label) {
      this.loadingProject = true
      fetchList({ name: label }).then(response => {
        this.projectList = response.data
        this.loadingProject = false
      })
    },
    cancel() {
      this.$router.push({ path: '/risk/score' })
    },
    submitForm() {
      const valid = this.$refs['form'].validate()
      if (!valid) {
        return false
      }
      if (this.isEdit) {
        editRiskScore(this.postForm).then(response => {
          this.$router.push({ path: '/risk/score' })
        })
      } else {
        addRiskScore(this.postForm).then(response => {
          this.$router.push({ path: '/risk/score' })
        })
      }
    }
  }
}
</script>
