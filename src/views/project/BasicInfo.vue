<template>
  <div class="detail-container">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          项目编号
        </span>
        <span class="item-content">
          {{ projectInfo.sequence }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          掌控方式
        </span>
        <span class="item-content">
          {{ controlModeFilter(projectInfo.control_mode) }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          是否分阶段
        </span>
        <span class="item-content">
          {{ projectInfo.is_phased === 1 ? '是' : '否' }}
        </span>
      </el-col>
      <el-col v-if="projectInfo.is_phased === 1" :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          当前阶段
        </span>
        <span class="item-content">
          {{ projectInfo.phased_num }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          研发单位
        </span>
        <span class="item-content">
          {{ projectInfo.dev_unit }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          研发团队
        </span>
        <span class="item-content">
          {{ projectInfo.dev_team }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          项目经理
        </span>
        <span class="item-content">
          {{ projectInfo.pm }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          业务联系人
        </span>
        <span class="item-content">
          {{ projectInfo.business_contact }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          产品经理
        </span>
        <span class="item-content">
          {{ projectInfo.po }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          测试经理
        </span>
        <span class="item-content">
          {{ projectInfo.ptm }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          质量控制人员
        </span>
        <span class="item-content">
          {{ projectInfo.qa }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          申请日期
        </span>
        <span class="item-content">
          {{ projectInfo.application_date }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          章程发布日期
        </span>
        <span class="item-content">
          {{ projectInfo.charter_release_date }}
        </span>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
        <span class="item-title">
          系统类型
        </span>
        <span class="item-content">
          {{ sysTypeFilter(projectInfo.sys_type) }}
        </span>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="item-col">
        <span class="item-title">
          项目目标
        </span>
        <span class="item-content">
          {{ projectInfo.target }}
        </span>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24" class="item-col">
        <span class="item-title">
          需求概述
        </span>
        <span class="item-content">
          {{ projectInfo.description }}
        </span>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.detail-container {
  padding: 10px 20px;
  background: #fff;
  .item-col {
      padding: 5px 0;
      font-size: 14px;
      .item-title {
          margin-right:10px;
          color:#606266;
      }
      .item-content {
          font-weight: 500;
          color:#606266;
      }
  }
}
</style>
<script>
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
      statusList: {
        1: '在建',
        2: '暂停',
        3: '投产'
      },
      sysTypeList: {
        1: '项目',
        2: '迭代开发'
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
    scaleFilter(val) {
      const valMap = this.scaleList
      return valMap[val] ? valMap[val] : '未知'
    },
    stageFilter(val) {
      const valMap = this.stageList
      return valMap[val] ? valMap[val] : '未知'
    },
    controlModeFilter(val) {
      const valMap = this.controlModeList
      return valMap[val] ? valMap[val] : '未知'
    },
    sysTypeFilter(val) {
      const valMap = this.sysTypeList
      return valMap[val] ? valMap[val] : '未知'
    }
  }
}
</script>
