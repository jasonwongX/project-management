<template>
  <div class="edit-container">
    <el-form ref="form" :model="postForm" :rules="rules" label-width="120px">
      <el-row :gutter="24">
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
          <el-form-item label="质量控制人员" prop="qa">
            <el-input v-model="postForm.qa" placeholder="质量控制人员" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="业务成员" prop="business_members">
            <el-input v-model="postForm.business_members" placeholder="业务成员" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="主办（总行）" prop="host_head">
            <el-input v-model="postForm.host_head" placeholder="主办（总行）" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="主办（分行）" prop="host_branch">
            <el-input v-model="postForm.host_branch" placeholder="主办（分行）" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="协办（总行）" prop="co_head">
            <el-input v-model="postForm.co_head" placeholder="协办（总行）" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="协办（分行）" prop="co_branch">
            <el-input v-model="postForm.co_branch" placeholder="协办（分行）" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="主办（SA)" prop="host_sa">
            <el-input v-model="postForm.host_sa" placeholder="主办（SA)" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="研发成员" prop="dev_members">
            <el-input v-model="postForm.dev_members" placeholder="研发成员" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="领衔架构师" prop="lead_architect">
            <el-input v-model="postForm.lead_architect" placeholder="领衔架构师" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="数据架构师" prop="data_architect">
            <el-input v-model="postForm.data_architect" placeholder="数据架构师" />
          </el-form-item>
        </el-col><el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="应用架构师" prop="app_architect">
            <el-input v-model="postForm.app_architect" placeholder="应用架构师" />
          </el-form-item>
        </el-col><el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="技术架构师" prop="tech_architect">
            <el-input v-model="postForm.tech_architect" placeholder="技术架构师" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="安全架构师" prop="security_architect">
            <el-input v-model="postForm.security_architect" placeholder="安全架构师" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="总体架构联系人" prop="overall_structure_contact">
            <el-input v-model="postForm.overall_structure_contact" placeholder="总体架构联系人" />
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="数据平台联系人" prop="data_platform_contact">
            <el-input v-model="postForm.data_platform_contact" placeholder="数据平台联系人" />
          </el-form-item>
        </el-col><el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="应用平台联系人" prop="product_app_maintenance_contact">
            <el-input v-model="postForm.product_app_maintenance_contact" placeholder="应用平台联系人" />
          </el-form-item>
        </el-col><el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="生产环境保障联系人" prop="product_env_protection_contact">
            <el-input v-model="postForm.product_env_protection_contact" placeholder="生产环境保障联系人" />
          </el-form-item>
        </el-col><el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="生产网络保障联系人" prop="product_net_protection_contact">
            <el-input v-model="postForm.product_net_protection_contact" placeholder="生产网络保障联系人" />
          </el-form-item>
        </el-col><el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="项目技术负责人" prop="project_tech_leader">
            <el-input v-model="postForm.project_tech_leader" placeholder="项目技术负责人" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="配置管理员" prop="config_admin">
            <el-input v-model="postForm.config_admin" placeholder="配置管理员" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="技术标准联系人" prop="tech_standard_contact">
            <el-input v-model="postForm.tech_standard_contact" placeholder="技术标准联系人" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="数据标准联系人" prop="data_standard_contact">
            <el-input v-model="postForm.data_standard_contact" placeholder="数据标准联系人" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="风险管理联系人" prop="risk_related_contact">
            <el-input v-model="postForm.risk_related_contact" placeholder="风险管理联系人" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="环境保障联系人" prop="env_protection_contact">
            <el-input v-model="postForm.env_protection_contact" placeholder="环境保障联系人" />
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
    contact: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      postForm: this.contact,
      loadingProject: false, // 项目查询加载
      rules: {
        pm: [
          { required: true, message: '项目经理不能为空' }
        ],
        qa: [
          { required: true, message: '质量控制人员不能为空' }
        ],
        ptm: [
          { required: true, message: '测试经理不能为空' }
        ],
        business_contact: [
          { required: true, message: '业务联系人不能为空' }
        ]
      }
    }
  },
  watch: {
    postForm: {
      handler(val) {
        this.$emit('updateContact', val)
      }
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
