<template>
  <el-dialog title="预览" :visible="dialogVisible" fullscreen @close="close">
    <el-container>
      <el-header class="article-header" direction="horizontal">
        <div class="title">
          {{ info.title }}
        </div>

      </el-header>
      <el-main>
        <div class="article-main">
          <div class="time">
            {{ formatDate(info.updated_at) }}
          </div>
          <div class="summary">
            {{ info.short_content }}
          </div>
          <div class="content" v-html="info.content" />
        </div>
      </el-main>
    </el-container>
  </el-dialog>
</template>
<script>
const moment = require('moment')

export default {
  name: 'PreviewDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    close() {
      this.$emit('closePreviewDialog')
    },
    formatDate(value) {
      return value === '' ? '' : moment(value).format('YYYY-MM-DD')
    }
  }
}
</script>
<style lang="less">
.article-header{
  display: flex;
  justify-content: center;
  .title {
    font-size:24px;
    font-weight: 500;
    align-self: center;
  }
}
.article-main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  .time {
    align-self: center;
  }
  .summary {
    align-self: center;
    margin-top: 10px;
  }
}
</style>
