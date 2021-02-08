<template>
  <div class="app-header">
    <div class="left-header">
      <img
        class="logo-img"
        src="@/assets/images/logo.png"
      >
      <span class="title">QMS</span>
      <span class="title-desc">让质量管理工作如此与众不同</span>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span>您好， {{ real_name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link to="/project/my">
            <el-dropdown-item>
              我的项目
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'real_name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="less" scoped>
  .left-header {
    color: #fff;
    margin-left: 20px;
    display:flex;
    align-items: center;
    .logo-img {
      width:32px;
      height:32px;
      padding: 3px 3px;
      background: #fff;
      border-radius: 50%;
    }
    .title {
      font-weight: 800;
      font-size:24px;
      margin:0 10px;
    }
    .title-desc {
      margin-left:20px;
      font-size:16px;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    color: #fff;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      color:#fff;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>
