<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="作者:" class="postInfo-container-item">
                    <el-select
                      v-model="postForm.user_id"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="请输入作者名称"
                      :remote-method="searchQaList"
                      :loading="loadingQa"
                      clearable
                      style="width: 130px"
                      class="filter-item"
                    >
                      <el-option
                        v-for="item in qaList"
                        :key="item.id"
                        :label="item.real_name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="10">
                  <el-cascader
                    v-model="postForm.classify_id"
                    :options="options"
                    placeholder="分类"
                  />
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
          <el-input v-model="postForm.content_short" :rows="1" type="textarea" class="article-textarea" autosize placeholder="请输入内容" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>

        <div class="editor-container">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </div>

        <div style="margin-bottom: 20px;">
          <Upload v-model="postForm.image_uri" />
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { getQaList } from '@/api/user'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'DetailInfo',
  components: { Tinymce, MDinput, Upload, Sticky },
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
      options: [{
        value: 1,
        label: '流程制度',
        children: [{
          value: 2,
          label: '制度通知',
          children: [{
            value: 8,
            label: '纲要类'
          }, {
            value: 9,
            label: '调研阶段'
          }, {
            value: 10,
            label: '启动阶段'
          }, {
            value: 11,
            label: '需求阶段'
          }, {
            value: 12,
            label: '设计阶段'
          }, {
            value: 13,
            label: '编码阶段'
          }, {
            value: 14,
            label: '测试阶段'
          }, {
            value: 15,
            label: '上线阶段'
          }, {
            value: 16,
            label: '投产与验收'
          }, {
            value: 17,
            label: '下线'
          }, {
            value: 18,
            label: '项目管理'
          }]
        }, {
          value: 3,
          label: '流程表单'
        }, {
          value: 4,
          label: '模板',
          children: [{
            value: 19,
            label: '项目计划'
          }, {
            value: 20,
            label: '需求'
          }, {
            value: 21,
            label: '概设'
          }, {
            value: 22,
            label: '测试'
          }, {
            value: 23,
            label: '项目过程实施'
          }]
        }, {
          value: 5,
          label: '其他'
        }]
      }, {
        value: 6,
        label: '工具',
        children: [{
          value: 24,
          label: '研发工具'
        }, {
          value: 25,
          label: '流程工具'
        }, {
          value: 26,
          label: '测试工具'
        }]
      }, {
        value: 7,
        label: '案例分享',
        children: [{
          value: 27,
          label: '管理经验分享'
        }, {
          value: 28,
          label: '技术经验分享'
        }]
      }]
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
    },
    // 查询用户列表
    searchQaList(label) {
      this.loadingQa = true
      getQaList(label).then(response => {
        this.qaList = response.data
        this.loadingQa = false
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('updateVisitedView', route)
    },
    submitForm() {
      this.postForm.display_time = parseInt(this.display_time / 1000)
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
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
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
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
