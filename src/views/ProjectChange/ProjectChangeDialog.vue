<template>
  <el-dialog :title="isEdit ? '编辑项目变更' : '新增项目变更'" :visible.sync="dialogVisible">
    <el-form ref="form" :model="postForm" :rules="rules" label-width="120px">
      <el-row :gutter="24">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="变更提出阶段" prop="change_stage">
            <el-select v-model="postForm.change_stage" placeholder="请选择阶段">
              <el-option
                v-for="(item, index) in stageList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="变更提交时间" prop="change_date">
            <el-date-picker
              v-model="postForm.change_date"
              type="date"
              size="small"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="变更类型" prop="type">
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
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="变更审批层级" prop="level">
            <el-select v-model="postForm.level" placeholder="请选择层级">
              <el-option
                v-for="(item, index) in levelList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="外部强制变更" prop="is_external_forced_change">
            <el-radio v-model="postForm.is_external_forced_change" label="1">是</el-radio>
            <el-radio v-model="postForm.is_external_forced_change" label="2">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="是否追加预算" prop="is_add_budget">
            <el-radio v-model="postForm.is_add_budget" label="1">是</el-radio>
            <el-radio v-model="postForm.is_add_budget" label="2">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="工作量变化" prop="workload_changes">
            <el-input v-model="postForm.workload_changes" placeholder="请输入工作量变化（人月）" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="工作量变化率" prop="workload_change_rate">
            <el-input v-model="postForm.workload_change_rate" :min="0" :max="1" placeholder="请输入工作量变化率" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="工期偏差" prop="score">
            <el-input-number v-model="postForm.schedule_deviation" label="请输入工期偏差(天)" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-form-item label="备注">
            <el-input
              v-model="postForm.remark"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入备注描述（如：变更具体原因）"
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
  project_id: null, // 所属项目ID
  change_stage: null, // 变更提出阶段
  change_date: null, // 变更提交时间
  type: null, // 类型
  level: null, // 等级
  is_external_forced_change: null, // 是否外部强制变更
  is_add_budget: null, // 是否增加预算
  workload_changes: 0, // 工作量变化
  workload_change_rate: null, // 工作量变化率
  schedule_deviation: null, // 工期偏差
  remark: '' // 备注
}
const _ = require('lodash')
import { fetchInfo, addProjectChange, editProjectChange } from '@/api/projectChange'
import { fetchList, fetchProject } from '@/api/project'
export default {
  name: 'ProjectChangeDialog',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: _.cloneDeep(defaultForm),
      stageList: this.$store.state.project.stageList,
      levelList: this.$store.state.projectChange.levelList,
      typeList: this.$store.state.projectChange.typeList,
      loadingProject: false, // 项目查询加载
      projectList: [], // 项目列表
      rules: {
        project_id: [
          { required: true, message: '请选择项目' }
        ],
        level: [
          { required: true, message: '请选择风险等级' }
        ],
        type: [
          { required: true, message: '请选择风险分类' }
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
    // 详情
    getInfo(id) {
      fetchInfo(id).then(response => {
        this.postForm = _.cloneDeep(response.data)
        this.postForm.level = this.postForm.level.toString()
        this.postForm.change_stage = this.postForm.change_stage.toString()
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
      this.$emit('closeDialog')
    },
    submitForm() {
      const valid = this.$refs['form'].validate()
      if (!valid) {
        return false
      }
      if (this.isEdit) {
        editProjectChange(this.postForm).then(response => {
          this.$message({
            type: 'success',
            message: '更新成功!'
          })
          this.$router.push({ path: '/project/change' })
        })
      } else {
        addProjectChange(this.postForm).then(response => {
          this.$message({
            type: 'success',
            message: '增加成功!'
          })
          this.$router.push({ path: '/project/change' })
        })
      }
    }
  }
}
</script>
