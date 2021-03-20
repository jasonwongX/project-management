<template>
  <div class="stage-container">
    <div class="stage-total">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="阶段统计" name="阶段统计">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
              <span class="item-title">
                达成率
              </span>
              <span class="item-content">
                {{ stage.complete_percent }}
              </span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
              <span class="item-title">
                计划开始时间
              </span>
              <span class="item-content">
                {{ stage.plan_start_date }}
              </span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="item-col">
              <span class="item-title">
                实际开始时间
              </span>
              <span class="item-content">
                {{ stage.actual_start_date }}
              </span>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="24">
              <span class="item-title">
                过程跟踪
              </span>
              <span class="item-content">
                {{ stage.description }}
              </span>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item
          v-for="(item,index) in stage.stage_items"
          :key="index"
          class="activity"
          :title="item.name"
          :name="item.name"
        >
          <div v-for="(checkItem, checkIndex) in item.check_items" :key="checkIndex" class="text item">
            <el-row :gutter="32" class="item-row">
              <el-col :span="8">
                <span class="item-content">{{ checkItem.name }}</span>
              </el-col>
              <el-col :span="4">
                <span class="item-content">{{ getOptionsName(checkItem.result) }}</span>
              </el-col>
              <el-col :span="12">
                <span class="item-content">{{ checkItem.remark }}</span>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<style lang="less" scoped>
.box-card {
  margin-bottom: 8px;
  .item-row {
    padding-bottom:5px;
    .item-row-title {
      font-size: 14px;
    }
  }
}
.item-col {
    padding: 5px 0;
    font-size: 14px;
    line-height: 20px;
    .item-title {
        margin-right:10px;
    }
    .item-content {
        font-weight: 500;
    }
}
</style>
<script>
export default {
  name: 'StageDetail',
  props: {
    stage: {
      type: Object,
      default: () => {}
    },
    projectId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeNames: ['阶段统计'],
      optionsList: {
        '0': '不涉及',
        '1': '通过',
        '2': '未通过'
      }
    }
  },
  methods: {
    getOptionsName(val) {
      return this.optionsList[val] ? this.optionsList[val] : '未知'
    }
  }

}
</script>
