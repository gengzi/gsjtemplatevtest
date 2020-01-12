// 整个项目的入口文件
// 导入 vue
import Vue from 'vue'
// 导入 App 根组件
import App from './App.vue'
// 导入所有的 router 路由
import router from './router'
// 导入 element-ui
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入图标库
import './assets/fonts/iconfont.css'
// 导入 axios
import axios from 'axios'

// 全局配置 axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 创建Vue实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app') // 挂载跟组件
