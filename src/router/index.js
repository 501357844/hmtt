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

Vue.use(VueRouter)
// 配置路由对象
const router = new VueRouter({
  routes: [
    { name: 'Login', path: '/login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { name: 'Welcome', path: '', component: Welcome },
        { name: 'Comment', path: '/comment', component: Comment },
        { name: 'Fans', path: '/fans', component: Fans },
        { name: 'Image', path: '/image', component: Image },
        { name: 'Push', path: '/push', component: Push },
        { name: 'Setting', path: '/setting', component: Setting },
        { name: 'Container', path: '/container', component: Container }

      ] }

  ]
})

export default router
