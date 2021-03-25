<template>
  <div class="app-container">
    <el-row
      v-for="(changeRow,index) in changesArr"
      :key="index"
      :gutter="24"
      type="flex"
      align="middle"
    >
      <el-col
        v-for="(change,childIndex) in changeRow"
        :key="childIndex"
        :span="12"
      >
        <el-row
          :gutter="24"
          type="flex"
          align="middle"
        >
          <el-col
            :span="24"
          >
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ change.complete_date }}</span>
                <el-button style="float: right; padding: 3px 3px" type="text" @click="edit(change)">编辑</el-button>
                <el-button style="float: right; padding: 3px 3px;color:#f56c6c" type="text" @click="remove(change)">移除</el-button>
              </div>
              <el-row :gutter="24">
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    投产时间
                  </span>
                  <span class="item-content">
                    {{ change.complete_date }}
                  </span>
                </el-col>
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    是否完全投产
                  </span>
                  <span class="item-content">
                    {{ change.is_all_completed ? '是' : '否' }}
                  </span>
                </el-col>
                <el-col :span="8" class="item-col">
                  <span class="item-title">
                    是否分阶段
                  </span>
                  <span class="item-content">
                    {{ change.is_phased ? '是' : '否' }}
                  </span>
                </el-col>
                <el-col v-if="change.is_phased" :span="8" class="item-col">
                  <span class="item-title">
                    当前阶段
                  </span>
                  <span class="item-content">
                    {{ change.sequence }}
                  </span>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="24" class="item-col">
                  <span class="item-title">
                    投产意义
                  </span>
                  <span class="item-content">
                    {{ change.significance }}
                  </span>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div v-if="!changesArr.length" class="empty-container">
      <img src="@/assets/images/empty-box.png">
      <span>项目暂未投产</span>
    </div>
    <project-complete-dialog :post-form="changeInfo" :project-id="projectId" :dialog-complete-visible="dialogVisible" :is-edit="isEdit" @closeCompleteDialog="closeDialog" />
  </div>
</template>
<style lang="less" scoped>
.app-container {
    padding: 10px 10px;
}
.empty-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width:200px;
    height:200px;
  }
  span {
    color: #606266;
  }
  a{
    color:#4092ef;
  }
}
.box-header {
    margin-bottom: 10px;
}
.box-card {
  margin-bottom: 10px;
}
.item-col {
    padding: 5px 0;
    font-size: 14px;
    .item-title {
        margin-right:10px;
    }
    .item-content {
        font-weight: 500;
    }
}
</style>
<script>
import { fetchCompleteProjectList, deleteCompleteProject } from '@/api/project'

import ProjectCompleteDialog from './ProjectCompleteDialog'
const _ = require('lodash')
export default {
  name: 'CompleteBoard',
  components: {
    ProjectCompleteDialog
  },
  props: {
    projectId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogVisible: false,
      isEdit: false,
      changeInfo: {},
      changes: []
    }
  },
  computed: {
    changesArr() {
      return _.chunk(this.changes, 2)
    }
  },
  async created() {
    this.getList()
  },
  methods: {
    getList() {
      const listQuery = {
        limit: 20,
        project_id: this.projectId
      }
      fetchCompleteProjectList(listQuery).then(response => {
        this.changes = _.cloneDeep(response.data)
      })
    },
    closeDialog() {
      this.dialogVisible = false
      this.getList()
    },
    remove(item) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCompleteProject(item.id).then(response => {
          this.$message.success('成功删除')
          this.getList()
        })
      })
    },
    edit(item) {
      this.changeInfo = item
      this.dialogVisible = true
      this.isEdit = true
    }
  }
}
</script>
