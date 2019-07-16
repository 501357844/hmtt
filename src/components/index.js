import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'

export default {
  install (Vue) {
    // 第一个参数是name 第二个参数是配置对象
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
