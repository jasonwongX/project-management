<template>
  <div class="process-container">
    <div class="process-header">
      <el-button class="filter-item" type="primary" size="medium" icon="el-icon-plus" @click="dialogFormVisible = true">新增迭代</el-button>
    </div>
    <div class="process-content">
      <el-card v-for="(item,index) in sprints" :key="index" class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ item.name }}</span>
          <el-button style="float: right; padding: 0px 10px" type="text">保存</el-button>
          <el-button style="float: right; padding: 0px 10px" type="text">移除</el-button>
        </div>
        <div>
          <el-form>
            <el-row :gutter="32" class="item-row">
              <el-col :span="8">
                <el-form-item label="用户故事数">
                  <el-input-number v-model="item.story" :min="0" label="用户故事数" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工作点数">
                  <el-input-number v-model="item.task" :min="0" label="工作点数" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="完成率">
                  <el-input-number v-model="item.percent" :min="0" :max="100" label="完成率" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col>
                <el-form-item label="敏捷活动">
                  <el-input
                    v-model="item.activity"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="业务梳理会/计划会/站立会/评审会/回顾会执行情况"
                    type="textarea"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col>
                <el-form-item label="敏捷团队建设">
                  <el-input
                    v-model="item.team"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="团队自组织、角色分配及团队协作方面情况"
                    type="textarea"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col>
                <el-form-item label="敏捷需求管理">
                  <el-input
                    v-model="item.requirement"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="用户故事拆分与估算情况"
                    type="textarea"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col>
                <el-form-item label="敏捷技术实践">
                  <el-input
                    v-model="item.teach"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="代码管理、流水线、自动化测试、CI/CD、代码扫描实践情况"
                    type="textarea"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>
    <el-dialog title="新增迭代" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="迭代名称">
          <el-input v-model="newSprintName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.process-header {
    margin-bottom: 10px;
}
</style>
<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      newSprintName: '',
      sprints: []
    }
  },
  methods: {
    addItem() {
      this.sprints.push({
        name: this.newSprintName,
        story: null,
        task: null,
        percent: null,
        activity: '',
        team: '',
        requirement: '',
        tech: ''
      })
      this.newSprintName = ''
      this.dialogFormVisible = false
    }
  }
}
</script>
