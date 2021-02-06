<template>
  <div class="app-container">
    <div class="box-header">
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-plus" @click="add">新增评分</el-button>
    </div>
    <el-row :gutter="24" type="flex" align="middle">
      <el-col
        v-for="(score,index) in scores"
        :key="index"
        :span="12"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-date-picker v-model="score.time" :readonly="editIndex !== index" size="small" type="month" format="yyyy-MM" placeholder="选择月份" />
            <el-button v-if="editIndex === index" style="float: right; padding: 3px 3px" type="text" @click="save(index)">保存</el-button>

            <el-button v-if="editIndex !== index" style="float: right; padding: 3px 3px" type="text" @click="edit(index)">编辑</el-button>
            <el-button style="float: right; padding: 3px 3px;color:#f56c6c" type="text" @click="remove(index)">移除</el-button>
          </div>
          <el-row :gutter="24">
            <el-col v-for="(item, itemIndex) in typeList" :key="itemIndex" class="item-col" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <span class="item-label">{{ item }}</span>
              <el-input v-if="editIndex === index" v-model="score.items[itemIndex]" class="item-input" size="mini" label="风险评分（1-100）" />
              <span v-else>{{ score.items[itemIndex] }}</span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.app-container {
    padding: 10px 10px;
}
.box-header {
    margin-bottom: 10px;
}
.item-col {
    padding: 5px 0;
    font-size: 14px;
    .item-label {
        margin-right:10px;
        color: #666;
    }
    .item-input {
        font-weight: 500;
        width:100px;
    }
}

</style>
<script>
const _ = require('lodash')
export default {
  name: 'RiskScoreBoard',
  components: {
  },
  data() {
    return {
      typeList: [],
      editIndex: -1,
      scores: []
    }
  },
  async created() {
    await this.$store.dispatch('risk/initTypeList')
    this.typeList = this.$store.state.risk.typeList
  },
  methods: {
    closeRiskDialog() {
      this.dialogRiskVisible = false
    },
    add() {
      this.scores.unshift({
        time: '',
        items: [
        ]
      })
      this.editIndex = 0
    },
    remove(val) {
      _.remove(this.scores, (item, key) => {
        return key === val
      })
      this.scores = _.cloneDeep(this.scores)
    },
    edit(index) {
      this.editIndex = index
    },
    save(index) {
      this.editIndex = -1
    }
  }
}
</script>
