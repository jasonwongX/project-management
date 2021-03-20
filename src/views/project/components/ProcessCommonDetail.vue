<template>
  <el-tabs>
    <el-tab-pane v-for="(item,index) in stageLabel" :key="index" :label="item">
      <stage-detail :stage="stageItem(item)" />
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

import StageDetail from './StageDetail'
import { getCommonProcess } from '@/api/commonProcess'
const _ = require('lodash')

export default {
  name: 'ProcessCommonDetail',
  components: {
    StageDetail
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
    }
  }

}
</script>
