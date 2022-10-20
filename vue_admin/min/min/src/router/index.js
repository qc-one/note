import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 这里原来是路由的代码
import { constantRoutes } from './routes.js'

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
// 重置路由器的函数
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

