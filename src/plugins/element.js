import Vue from 'vue'
// 引入element-ui 的组件
import {
  Button,
  Form,
  FormItem,
  Input,
  Col,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Tabs,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Table,
  TableColumn,
  Switch,
  Loading,
  Tooltip,
  Pagination,
  Dialog,
  Popconfirm,
  Popover,
  MessageBox
} from 'element-ui'

// 使用这些组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Col)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Loading.directive)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Popconfirm)
Vue.use(Popover)

// 不需要设置这个
// Vue.use(Message)
// 设置属性
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
