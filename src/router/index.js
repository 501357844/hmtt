import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome/welcome'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import Image from '@/views/image'
import Push from '@/views/push'
import Setting from '@/views/setting'
import Container from '@/views/container'
import NotFound from '@/views/404'

Vue.use(VueRouter)
// 配置路由对象
const router = new VueRouter({
  routes: [
    { name: 'Login', path: '/login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { name: 'Welcome', path: '/', component: Welcome },
        { name: 'Comment', path: '/comment', component: Comment },
        { name: 'Fans', path: '/fans', component: Fans },
        { name: 'Image', path: '/image', component: Image },
        { name: 'Push', path: '/push', component: Push },
        { name: 'Setting', path: '/setting', component: Setting },
        { name: 'Container', path: '/container', component: Container }

      ] },
    { path: '*', name: '404', component: NotFound }

  ]
})

router.beforeEach((to, from, next) => {
  console.log('ok')
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('hmtt')
  if (user) {
    next()
  } else {
    next('/login')
  }
  // if (to.path !== '/login' && !user) return next('/login')
  // next()
})

export default router
