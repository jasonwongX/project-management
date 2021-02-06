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
          <el-form-item label="阶段" prop="type">
            <el-input v-model="postForm.agile.stage" placeholder="请输入迭代阶段" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="迭代周期(周)" prop="type">
            <el-input v-model="postForm.agile.sprintTime" placeholder="请输入迭代周期" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="试点启动" prop="agile_start_date">
            <el-date-picker
              v-model="postForm.agile.agile_start_date"
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
          <el-form-item label="项目状态" prop="status">
            <el-select v-model="postForm.status" placeholder="项目状态">
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
            <el-input v-model="postForm.qa" placeholder="质量控制人员" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="研发成员" prop="devMembers">
            <el-input v-model="postForm.agile.devMembers" placeholder="研发成员" />
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
          <el-form-item label="首次上线日期" prop="firstOnlineDate">
            <el-date-picker
              v-model="postForm.agile.firstOnlineDate"
              type="date"
              placeholder="首次上线日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="最终投产日期" prop="lastOnlineDate">
            <el-date-picker
              v-model="postForm.agile.lastOnlineDate"
              type="date"
              placeholder="最终投产日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="系统类型" prop="dev_mode">
            <el-select v-model="postForm.agile.sysType" placeholder="系统类型">
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
              v-model="postForm.agile.calcData"
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
              v-model="postForm.agile.techDesc"
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
              v-model="postForm.agile.recentDesc"
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
              v-model="postForm.agile.publishDesc"
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
              v-model="postForm.agile.planMembers"
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
              v-model="postForm.agile.planMembersDesc"
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
              v-model="postForm.agile.toolDesc"
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
export default {
  name: 'AddAgileProject',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: {
        name: '',
        sequence: '',
        status: 1, // 在建
        stage: 0,
        type: 0,
        control_mode: 0,
        scale: 0,
        dev_mode: 0,
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
        },
        agile: {

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
      sysTypeList: {
        1: '项目',
        2: '迭代开发'
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

  watch: {
    postForm: {
      handler(val) {
        this.$emit('updateBasic', val)
      }
    }
  },
  created() {
    this.scaleList = this.$store.state.project.scaleList
    this.stageList = this.$store.state.project.stageList
    this.controlModeList = this.$store.state.project.controlModeList
    this.postForm.stage = 1
  },
  methods: {
    cancel() {

    },
    submit() {

    }
  }
}
</script>
