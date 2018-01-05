import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/404', component: _import('404'), hidden: true},

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: '首页',
    hidden: true,
    children: [{
      path: 'home',
      component: _import('home/index')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {title: 'Example', icon: 'example'},
    children: [
      {
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: {title: 'Table', icon: 'table'}
      },
      {
        path: 'tree',
        name: 'Tree',
        component: _import('tree/index'),
        meta: {title: 'Tree', icon: 'tree'}
      }
    ]
  },
  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'components',
    meta: {title: '组件', icon: 'component'},
    children: [
      {
        path: 'tinymce',
        name: 'tinymce-demo',
        component: _import('components-demo/tinymce'),
        meta: {title: '富文本编辑器'}
      },
      {
        path: 'backToTop',
        name: 'backToTop-demo',
        component: _import('components-demo/backToTop'),
        meta: {title: '返回顶部'}
      },
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: _import('form/index'),
        meta: {title: 'Form', icon: 'form'}
      }
    ]
  },
  // {
  //   path: '/controlBoard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'control-board',
  //       name: 'control board',
  //       component: _import('controlBoard/control-board'),
  //       meta: {title: '控制台', icon: 'dashboard'}
  //     }
  //   ]
  // },
  // {
  //   path: '/controlBoard1',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'control-board1',
  //       name: 'control board1',
  //       component: _import('controlBoard1/control-board'),
  //       meta: {title: '控制台1', icon: 'dashboard'}
  //     }
  //   ]
  // },

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/platform',
    component: Layout,
    redirect: '/platform/financialInstitution',
    name: '金融机构平台',
    meta: {role: ['editor']},
    children: [{
      path: 'index',
      component: _import('platform/financialInstitution/index'),
      name: 'permission',
      meta: {
        title: '金融机构平台',
        role: ['editor'],
        icon: 'component'
      }
    }]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export const asyncRouterMap1 = [
  {
    path: '/platform',
    component: Layout,
    redirect: '/platform/controlBoard',
    name: '采购商平台',
    meta: {role: ['super']},
    children: [{
      path: 'index',
      component: _import('platform/controlBoard/index'),
      name: 'permission',
      meta: {
        title: '采购商平台',
        role: ['super'],
        icon: 'component'
      }
    }]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export const asyncRouterMap2 = [
  {
    path: '/platform',
    component: Layout,
    redirect: '/platform/controlBoard1',
    name: '贸易商平台',
    meta: {role: ['admin']},
    children: [{
      path: 'index',
      component: _import('platform/controlBoard1/index'),
      name: 'permission',
      meta: {
        title: '贸易商平台',
        role: ['admin'],
        icon: 'component'
      }
    }]
  },
  {path: '*', redirect: '/404', hidden: true}
]
