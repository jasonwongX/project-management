<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <sticky class="sub-navbar">
        <el-button type="info" @click="preview">预览</el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="title" required>
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
                    <el-input v-model="postForm.author" />
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-cascader
                    v-model="postForm.category_id"
                    :options="options"
                    :show-all-levels="false"
                    :props="{ label: 'name', value: 'id' }"
                    placeholder="分类"
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
          <el-input v-model="postForm.short_content" :rows="1" type="textarea" class="article-textarea" autosize placeholder="请输入内容" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>
        <div style="margin-bottom: 20px;">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :on-change="handleChange"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">添加附件</el-button>
          </el-upload>
        </div>
        <div class="editor-container">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </div>
      </div>
    </el-form>
    <preview-dialog :info="postForm" :dialog-visible="previewDialogVisible" @closePreviewDialog="closePreviewDialog" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { getCategoryList, addArticle, getArticleInfo, editArticle } from '@/api/wiki'
import PreviewDialog from './PreviewDialog'

const defaultForm = {
  status: 1,
  title: '', // 文章题目
  content: '', // 文章内容
  short_content: '', // 文章摘要
  author: '',
  file_uri: '' // 文章附件
}

export default {
  name: 'DetailInfo',
  components: { Tinymce, MDinput, Sticky, PreviewDialog },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      loadingQa: false,
      qaList: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      tempRoute: {},
      options: [],
      fileList: [],
      previewDialogVisible: false
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.short_content.length
    },
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.query && this.$route.query.id ? parseInt(this.$route.query.id) : 0
      this.postForm.id = id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
    this.tempRoute = Object.assign({}, this.$route)
    this.initCatogeryList()
  },
  methods: {
    fetchData(id) {
      getArticleInfo(id).then(response => {
        this.postForm = response.data
      })
    },
    closePreviewDialog() {
      this.previewDialogVisible = false
    },
    handleChange() {

    },
    preview() {
      this.previewDialogVisible = true
    },
    initCatogeryList() {
      getCategoryList().then(response => {
        this.options = response.data
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('updateVisitedView', route)
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postForm.status = 2
          if (this.isEdit) {
            editArticle(this.postForm).then(response => {
              this.$notify({
                title: '成功',
                message: '更新发布文章成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false
            })
          } else {
            addArticle(this.postForm).then(response => {
              this.$notify({
                title: '成功',
                message: '发布文章成功',
                type: 'success',
                duration: 2000
              })
              this.loading = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.loading = true
      this.postForm.status = 1
      if (this.isEdit) {
        editArticle(this.postForm).then(response => {
          this.$notify({
            title: '成功',
            message: '更新文章成功',
            type: 'success',
            duration: 2000
          })
          this.loading = false
        })
      } else {
        addArticle(this.postForm).then(response => {
          this.$notify({
            title: '成功',
            message: '保存文章成功',
            type: 'success',
            duration: 2000
          })
          this.loading = false
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.sub-navbar {
  height: 50px;
  line-height: 50px;
  position: relative;
  width: 100%;
  text-align: right;
  padding-right: 20px;
  transition: 600ms ease position;
  background: linear-gradient(90deg, rgba(32, 182, 249, 1) 0%, rgba(32, 182, 249, 1) 0%, rgba(33, 120, 241, 1) 100%, rgba(33, 120, 241, 1) 100%);
  .subtitle {
    font-size: 20px;
    color: #fff;
  }
  &.draft {
    background: #d0d0d0;
  }
  &.deleted {
    background: #d0d0d0;
  }
}
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
