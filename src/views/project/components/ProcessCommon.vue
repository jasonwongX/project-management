<template>
  <div v-if="stageList.length === 0" class="app-container">
    <div class="box-header">
      <el-button class="filter-item" type="primary" size="medium" @click="initProcess()">初始化过程配置</el-button>
    </div>
  </div>
  <el-tabs v-else tab-position="left" style="min-height: 500px;">
    <el-tab-pane v-for="(item,index) in stageLabel" :key="index" :label="item">
      <stage :stage="stageItem(item)" :project-id="projectId" />
    </el-tab-pane>
  </el-tabs>
</template>
<style lang="less" scoped>
.app-container {
    padding: 10px 10px;
}
.box-header {
    margin-bottom: 10px;
}
</style>
<script>

import stage from './stage'
import { getCommonProcess, initCommonProcess } from '@/api/commonProcess'
const _ = require('lodash')

export default {
  name: 'ProcessCommon',
  components: {
    stage
  },
  props: {
    projectId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      stageList: []
    }
  },
  computed: {
    stageLabel() {
      const stageLabel = _.map(this.stageList, 'name')
      return stageLabel
    }
  },
  created() {
    this.getCommonProcess()
  },
  methods: {
    stageItem(stageName) {
      const stageItem = _.find(this.stageList, ['name', stageName])
      return stageItem
    },
    getCommonProcess() {
      getCommonProcess(this.projectId).then(response => {
        this.stageList = response.data
      })
    },
    initProcess() {
      initCommonProcess(this.projectId).then(response => {
        this.$message.success('初始化项目过程配置成功')
        this.getCommonProcess()
      })
    }

  }

}
</script>
