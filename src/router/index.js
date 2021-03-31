import Vue from 'vue'
import VueRouter from 'vue-router'
import ListAsset from '../views/ListAsset.vue'
import Asset from '../views/Asset.vue'
import Register from '../views/Register.vue'
import User from '../views/User'
import Index from '../views/Index'
import Login from '../views/Login'
import App from '../App'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login",
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/page',
    name: '资产管理',
    component: Index,
    show: true,
    children:[
      {
        path: '/asset',
        name: '资产查询',
        component: Asset
      },
      {
        path: '/listAsset',
        name: '资产录入',
        component: ListAsset
      }
    ]
  },
  {
    path: '/page1',
    name: '设置',
    component: Index,
    show:true,
    children:[
      {
        path: '/listUser',
        name: '用户列表',
        component: User
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('eleToken');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

