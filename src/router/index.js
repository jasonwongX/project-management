import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页概览', icon: 'dashboard' }
    }]
  },

  {
    path: '/project',
    component: Layout,
    redirect: '/project/index',
    meta: { title: '项目管理', icon: 'project-manage' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/project/ProjectList'),
        name: 'projectIndex',
        meta: { title: '项目列表', icon: 'common-project' }
      },
      {
        path: 'edit',
        component: () => import('@/views/project/modify'),
        name: 'projectEdit'
      },
      {
        path: 'detail',
        component: () => import('@/views/project/detail'),
        name: 'projectDetail'
      },
      {
        path: 'add',
        component: () => import('@/views/project/add'),
        name: 'projectAdd'
      },
      {
        path: 'addAgile',
        component: () => import('@/views/project/AddAgile'),
        name: 'agileProjectAdd'
      },
      {
        path: 'change/edit',
        component: () => import('@/views/ProjectChange/edit'),
        name: 'projectChangeEdit'
      },
      {
        path: 'change/add',
        component: () => import('@/views/ProjectChange/create'),
        name: 'projectChangeAdd'
      },
      {
        path: 'my',
        component: () => import('@/views/project/MyProject'),
        name: 'myProjectList'
      },
      {
        path: 'riskScore',
        component: () => import('@/views/RiskScore/index'),
        name: 'riskScore'
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report/project/follow',
    meta: { title: '数据报表', icon: 'data-report' },
    children: [
      {
        path: '/report/project/follow',
        component: () => import('@/views/report/ProjectStatusReport'),
        name: 'ProjectFollow',
        meta: { title: '项目监理跟踪报表', icon: 'report-table' }
      },
      {
        path: '/report/project/agile/follow',
        component: () => import('@/views/report/AgileProjectStatusReport'),
        name: 'AgileProjectFollow',
        meta: { title: '敏捷项目报表', icon: 'report-table' }
      },
      {
        path: '/report/project/change',
        component: () => import('@/views/report/ProjectChangeReport'),
        name: 'ProjectChangeReport',
        meta: { title: '项目变更报表', icon: 'report-table' }
      },
      {
        path: '/report/project/complete',
        component: () => import('@/views/report/ProjectCompleteReport'),
        name: 'ProjectCompleteReport',
        meta: { title: '项目投产报表', icon: 'report-table' }
      },
      {
        path: '/report/project/month',
        component: () => import('@/views/report/ProjectMonthReport'),
        name: 'ProjectMonthReport',
        meta: { title: '在建项目月度统计', icon: 'report-month' }
      },
      {
        path: '/risk/index',
        component: () => import('@/views/risk/index'),
        name: 'riskIndex'
      }
    ]
  },
  {
    path: '/wiki',
    component: Layout,
    redirect: '/wiki/system',
    meta: { title: '知识库', icon: 'wiki' },
    children: [
      {
        path: '/wiki/system',
        component: () => import('@/views/wiki/index'),
        redirect: '/wiki/system/workfollow',
        meta: { title: '制度类', icon: 'regulation' },
        children: [
          {
            path: '/wiki/system/workfollow',
            component: () => import('@/views/wiki/index'),
            name: 'workfollow',
            meta: { title: '项目流程', icon: 'list' }
          },
          {
            path: '/wiki/system/security',
            component: () => import('@/views/wiki/index'),
            name: 'security',
            meta: { title: '安全合规', icon: 'list' }
          },
          {
            path: '/wiki/system/notification',
            component: () => import('@/views/wiki/index'),
            name: 'notification',
            meta: { title: '重要通知', icon: 'list' }
          }
        ]
      },
      {
        path: '/wiki/tool',
        component: () => import('@/views/wiki/index'),
        meta: { title: '工具类', icon: 'tool' },
        children: [
          {
            path: '/wiki/tool/devlop',
            component: () => import('@/views/wiki/index'),
            name: 'WikiToolDevlop',
            meta: { title: '研发工具', icon: 'list' }
          },
          {
            path: '/wiki/tool/follow',
            component: () => import('@/views/wiki/index'),
            name: 'WikiToolFollow',
            meta: { title: '流程工具', icon: 'list' }
          },
          {
            path: '/wiki/tool/test',
            component: () => import('@/views/wiki/index'),
            name: 'WikiToolTest',
            meta: { title: '测试工具', icon: 'list' }
          }
        ]
      },
      {
        path: '/wiki/experience',
        component: () => import('@/views/wiki/index'),
        meta: { title: '经验分享类', icon: 'share' },
        children: [
          {
            path: '/wiki/experience/management',
            component: () => import('@/views/wiki/index'),
            name: 'WikiExperienceManagement',
            meta: { title: '管理经验分享', icon: 'list' }
          },
          {
            path: '/wiki/experience/tech',
            component: () => import('@/views/wiki/index'),
            name: 'WikiExperienceTech',
            meta: { title: '技术经验分享', icon: 'list' }
          }
        ]
      }
    ]
  },
  // {
  //   path: '/user',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/user/index'),
  //       name: 'User',
  //       meta: { title: '人员列表', icon: 'people' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
