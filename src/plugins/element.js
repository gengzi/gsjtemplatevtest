import Vue from 'vue'
// 引入element-ui 的组件
import { Button, Form, FormItem, Input, Col, Message } from 'element-ui'

// 使用这些组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Col)
// 不需要设置这个
// Vue.use(Message)
// 设置属性
Vue.prototype.$message = Message
