import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DraggableView01 from '../views/DraggableView01.vue'
import DraggableView02 from '../views/DraggableView02.vue'
import DraggableView03 from '../views/DraggableView03.vue'
import DraggableView04 from '../views/DraggableView04.vue'
import DraggableView05 from '../views/DraggableView05.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/draggableview01',
      name: 'DraggableView01',
      component: DraggableView01
    },
    {
      path: '/draggableview02',
      name: 'DraggableView02',
      component: DraggableView02
    },
    {
      path: '/draggableview03',
      name: 'DraggableView03',
      component: DraggableView03
    },
    {
      path: '/draggableview04',
      name: 'DraggableView04',
      component: DraggableView04
    },
    {
      path: '/draggableview05',
      name: 'DraggableView05',
      component: DraggableView05
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

// 在路由切换之前记录时间
let navigationStart = 0

// 添加路由切换的钩子
router.beforeEach((to, from, next) => {
  // 在进入路由前记录时间
  navigationStart = performance.now()
  next()
})

router.afterEach((to, from) => {
  // 在进入路由后计算时间差并输出
  const navigationEnd = performance.now()
  const timeToLoad = navigationEnd - navigationStart
  console.log(`页面加载时长: ${timeToLoad.toFixed(2)} ${timeToLoad}毫秒`)
  console.log(performance);

})

export default router
