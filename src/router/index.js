import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login'

Vue.use(VueRouter)
// 配置路由对象
const router = new VueRouter({
  routes: [
    { name: 'Home', path: '/', directives: '/login' },
    { name: 'Login', path: '/login', component: Login }
  ]
})

export default router
