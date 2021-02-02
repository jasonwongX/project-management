<template>
  <el-tabs tab-position="left" style="min-height: 500px;">
    <el-tab-pane v-for="(item,index) in stageLabel" :key="index" :label="item"><stage :stage="stageItem(item)" /></el-tab-pane>
  </el-tabs>
</template>
<script>
import stage from './stage'

const _ = require('lodash')

const StageList = [{
  stage: '项目前期',
  activities: [
    { name: '业务需求大纲',
      checkItems: [
        { name: '是否已发布研发小组成立的通知？',
          result: 3,
          remark: ''
        },
        { name: '是否完成业务需求大纲？',
          result: 3,
          remark: ''
        },
        { name: '业务需求大纲评审是否发布通过结果？',
          result: 3,
          remark: ''
        }
      ]
    },
    { name: '技术论证',
      checkItems: [
        { name: '是否完成技术可行性分析及实施方案设计？',
          result: 3,
          remark: ''
        },
        { name: '技术可行性分析评审是否发布通过结果？',
          result: 3,
          remark: ''
        }
      ]
    },
    { name: '预算采购',
      checkItems: [
        { name: '预算是否审批通过？',
          result: 3,
          remark: ''
        },
        { name: '是否完成POC测试、选定供应商？',
          result: 3,
          remark: ''
        },
        { name: '是否签订开发合同及工作说明书？',
          result: 3,
          remark: ''
        },
        { name: '供应商是否及时入场？',
          result: 3,
          remark: ''
        },
        { name: '是否涉及生产设备采购？',
          result: 3,
          remark: ''
        },
        { name: '采购的生产设备是否及时到位？',
          result: 3,
          remark: ''
        }
      ]
    },
    { name: '章程发布',
      checkItems: [
        { name: '是否在需求开发前发布项目章程？',
          result: 3,
          remark: ''
        }
      ]
    }
  ],
  percent: 0,
  description: ''
}, {
  stage: '实施阶段',
  activities: [
    { name: '启动会',
      checkItems: [
        { name: '是否召开启动会？（允许与其他会议合并）',
          result: 3,
          remark: ''
        },
        { name: '主要干系人如项目领导小组、项目组成员、合作公司代表是否均参加？',
          result: 3,
          remark: ''
        },
        { name: '会议是否明确项目目标、范围、总体计划等，并获得各方代表对项目的承诺？',
          result: 3,
          remark: ''
        }
      ]
    }, { name: '计划制定与跟踪',
      checkItems: [
        { name: '是否及时制定项目计划？',
          result: 3,
          remark: ''
        },
        { name: '主要干系人如项目领导是否完成项目过程裁适，明确项目主要过程与产出?小组、项目组成员、合作公司代表是否均参加？',
          result: 3,
          remark: ''
        },
        { name: '计划的制定是否基于合理的估算？',
          result: 3,
          remark: ''
        },
        { name: '项目计划是否包含软件工程活动、项目管理活动、进度、里程碑 、资源、关联方配套要求、风险应对、信息度量、培训等方面的规划安排？',
          result: 3,
          remark: ''
        },
        { name: '计划中任务的细化是否到可跟踪的颗粒度（如细化到小于40人天）？',
          result: 3,
          remark: ''
        },
        { name: '计划的制定是否基于合是否自行组织项目计划的讨论、同行评审?',
          result: 3,
          remark: ''
        },
        { name: '是否对计划进行渐进明细、滚动细化？',
          result: 3,
          remark: ''
        },
        { name: '项目经理是否能及时跟进项目进展，发现进度偏差并采取有效措施，确保项目实施可控？',
          result: 3,
          remark: ''
        },
        { name: '项目偏差较大时，是否及时调整项目计划？',
          result: 3,
          remark: ''
        },
        { name: '是否及时发布项目计划并建立基线？',
          result: 3,
          remark: ''
        }
      ]
    }
  ],
  percnet: 0,
  description: ''
}, {
  stage: '需求阶段',
  activities: [],
  percnet: 0,
  description: ''
}, {
  stage: '设计阶段',
  activities: [],
  percnet: 0,
  description: ''
}, {
  stage: '编码阶段',
  activities: [],
  percnet: 0,
  description: ''
}, {
  stage: '测试阶段',
  activities: [],
  percnet: 0,
  description: ''
}, {
  stage: '实施阶段',
  activities: [],
  percnet: 0,
  description: ''
}, {
  stage: '上线阶段',
  activities: [],
  percnet: 0,
  description: ''
}, {
  stage: '验收阶段',
  activities: [],
  percnet: 0,
  description: ''
}, {
  stage: '维护阶段',
  activities: [],
  percnet: 0,
  description: ''
}]
export default {
  name: 'ProcessCommon',
  components: {
    stage
  },
  data() {
    return {
      stageList: StageList
    }
  },
  computed: {
    stageLabel() {
      const stageLabel = _.map(StageList, 'stage')
      return stageLabel
    }
  },
  methods: {
    stageItem(stageName) {
      const stageItem = _.find(this.stageList, ['stage', stageName])
      return stageItem
    }
  }

}
</script>
