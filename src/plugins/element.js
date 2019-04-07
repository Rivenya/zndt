import Vue from 'vue'
import {
  Button,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Row,
  Col,
  Input,
  Radio,
  Form,
  FormItem,
  Switch,
  Popover,
  Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Switch)
Vue.use(Popover)
Vue.component(Message.name, Message)
Vue.prototype.$message = Message
