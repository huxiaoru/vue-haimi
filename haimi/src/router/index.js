import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/page/home/home'
import classify from '@/components/page/classify/classify'
import shop from '@/components/page/shop/shop'
import my from '@/components/page/my/my'
import detail from "@/components/page/detail/detail"

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/classify',
      component: classify
    },
    {
      path: '/shop',
      component: shop
    },
    {
      path: '/my',
      component: my
    },
    {
      path:"/detail",
      component:detail
    }
  ]
})
