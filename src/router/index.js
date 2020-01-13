import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/Users/User.vue'

Vue.use(VueRouter)

// 定义路由规则的数组
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    children: [{ path: '/users', component: User }]
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫, to 表示要访问的路径，from 表示从哪里来，next 是下一个要做的操作
router.beforeEach((to, from, next) => {
  const tokenStr = window.sessionStorage.getItem('token')
  // 如果是登陆，不进行拦截
  if (to.path === '/login' && !tokenStr) return next()
  // 如果是访问带权限的页面，进行拦截判断
  if (tokenStr && to.path === '/login') return next('/home')

  if (!tokenStr) {
    return next('/login')
  }
  next()
})

// 导出默认
export default router
