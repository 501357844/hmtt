import Vue from 'vue'
import App from './App.vue'

// 引入ElementUI;
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router/index'

import axios from '@/Api/axios'
import compotents from '@/components'
import '@/style/index.less'

Vue.use(compotents)
Vue.prototype.axios = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
