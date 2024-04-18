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

export default router
