import layout from '../layout'
// 常量路由:任何用户都可以访问的地址,并且可以展示当前这个地址对应的界面
export const constantRoutes = [
    // 注册登录的路由
    {
      path: '/login',
      component: () => import('@/views/login/index'),
    },
    // 注册的是首页的路由
    {
      path: '/',
      component: layout,
      redirect: '/dashboard',
      children: [{
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
      }]
    },
    {
        name: 'orderManagement',
        path: '/orderManagement',
        component: () => import('@/views/orderManagement/index'),
      },
      {
        name:'commodityManagement',
        path:'/commodityManagement/index',
        component: () => import('@/views/commodityManagement/index'),
      }
  ]
  
