<template>
  <el-dialog :title="isEdit ? '编辑风险项' : '新增风险项'" :visible.sync="dialogRiskVisible">
    <el-form ref="form" :model="postForm" :rules="rules">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="所属项目" prop="name">
            <el-select
              v-model="postForm.project_id"
              filterable
              remote
              reserve-keyword
              placeholder="请输入项目名称"
              :remote-method="searchProjectList"
              :loading="loadingProject"
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
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="风险类型" prop="type">
            <el-select v-model="postForm.type" placeholder="请选择类型">
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="风险等级" prop="level">
            <el-select v-model="postForm.level" placeholder="请选择等级">
              <el-option
                v-for="(item, index) in levelList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="风险状态" prop="status">
            <el-select v-model="postForm.status" placeholder="请选择状态">
              <el-option
                v-for="(item, index) in statusList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="续存期" prop="exist_time">
            <el-input v-model="postForm.exist_time" style="width:80%" placeholder="请输入续存期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="风险评分" prop="score">
            <el-input-number v-model="postForm.score" :min="1" :max="100" label="风险评分（1-100）" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="原因分析">
            <el-input
              v-model="postForm.reason"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入原因"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="措施">
            <el-input
              v-model="postForm.measure"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入措施"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="风险描述">
            <el-input
              v-model="postForm.description"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入描述"
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
<style lang="less" scoped>
.edit-container {
  padding: 10px 20px;
}
</style>
<script>
const defaultForm = {
  description: '', // 风险描述
  project_id: null, // 所属项目ID
  status: null, // 风险状态
  type: null, // 风险类型
  level: null, // 等级
  reason: '', // 原因
  measure: '', // 措施
  exist_time: '', // 续存期
  score: 0 // 评分

}
const _ = require('lodash')
import { fetchInfo, addRisk, editRisk } from '@/api/risk'
import { fetchList, fetchProject } from '@/api/project'
export default {
  name: 'RiskModifyDialog',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    dialogRiskVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: _.cloneDeep(defaultForm),
      statusList: this.$store.state.risk.statusList,
      levelList: this.$store.state.risk.levelList,
      typeList: this.$store.state.risk.typeList,
      loadingProject: false, // 项目查询加载
      projectList: [], // 项目列表
      rules: {
        description: [
          { required: true, message: '描述不能为空' }
        ],
        project_id: [
          { required: true, message: '请选择项目' }
        ],
        level: [
          { required: true, message: '请选择风险等级' }
        ],
        type: [
          { required: true, message: '请选择风险分类' }
        ],
        status: [
          { required: true, message: '请选择风险状态' }
        ]
      }
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.query && this.$route.query.id
      this.getInfo(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    // 风险详情
    getInfo(id) {
      fetchInfo(id).then(response => {
        this.postForm = _.cloneDeep(response.data)
        this.postForm.level = this.postForm.level.toString()
        this.postForm.status = this.postForm.status.toString()
        this.postForm.type = this.postForm.type.toString()
        delete this.postForm['project']
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
      this.$emit('closeRiskDialog')
    },
    submitForm() {
      const valid = this.$refs['form'].validate()
      if (!valid) {
        return false
      }
      if (this.isEdit) {
        editRisk(this.postForm).then(response => {
          this.$emit('closeRiskDialog')
        })
      } else {
        addRisk(this.postForm).then(response => {
          this.$emit('closeRiskDialog')
        })
      }
    }
  }
}
</script>
