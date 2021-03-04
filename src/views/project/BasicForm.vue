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
          <el-form-item label="应用范围" prop="scope">
            <el-select v-model="postForm.scope" placeholder="应用范围">
              <el-option
                v-for="(item, index) in scopeList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="测试模式" prop="test_mode">
            <el-select v-model="postForm.test_mode" placeholder="测试模式">
              <el-option
                v-for="(item, index) in testModeList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="创新年度" prop="innovation_year">
            <el-input v-model="postForm.innovation_year" placeholder="请输入创新年度" />
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
          <el-form-item label="系统用户" prop="sys_user">
            <el-input v-model="postForm.description" placeholder="系统用户" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="主系统" prop="main_sys">
            <el-input v-model="postForm.main_sys" placeholder="主系统" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="配套系统" prop="related_sys">
            <el-input v-model="postForm.related_sys" placeholder="配套系统" />
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
    basic: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      statusList: {
        1: '在建',
        2: '暂停',
        3: '投产'
      },
      scopeList: {
        1: '总行&分行',
        2: '总行',
        3: '分行'
      },
      typeList: {
        1: '管理信息',
        2: '金融产品',
        3: '基础平台'
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
  computed: {
    postForm() {
      return this.basic
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

  }
}
</script>
